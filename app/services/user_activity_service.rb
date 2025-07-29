# frozen_string_literal: true

class UserActivityService
  class << self
    # Add a media to user's watchlist
    def add_to_watchlist(user:, tmdb_id:, media_type:)
      ActiveRecord::Base.transaction do
        # Create the main record
        watchlist = UserWatchlist.create!(
          user:,
          tmdb_id:,
          media_type:
        )

        # Create the activity
        Activity.create!(
          user:,
          activity_type: 'watchlist',
          tmdb_id:,
          media_type:,
          metadata: { action: 'added' }
        )

        watchlist
      end
    rescue ActiveRecord::RecordNotUnique
      # Already in watchlist
      UserWatchlist.find_by!(user:, tmdb_id:, media_type:)
    end

    # Remove a media from user's watchlist
    def remove_from_watchlist(user:, tmdb_id:, media_type:)
      ActiveRecord::Base.transaction do
        watchlist = UserWatchlist.find_by(user:, tmdb_id:, media_type:)

        # Only proceed if the item exists in watchlist
        next nil unless watchlist

        watchlist.destroy!
      end
    end

    # Rate a media (automatically removes from watchlist if present)
    def rate_media(user:, tmdb_id:, media_type:, rating:, review: nil)
      ActiveRecord::Base.transaction do
        # Remove from watchlist if present (since rating implies watching)
        watchlist = UserWatchlist.find_by(user:, tmdb_id:, media_type:)
        watchlist&.destroy!

        # Create or update the rating
        user_rating = UserRating.find_or_initialize_by(
          user:,
          tmdb_id:,
          media_type:
        )

        is_new_rating = user_rating.new_record?
        user_rating.update!(rating:, review:)

        next unless is_new_rating

        # Create the rating activity
        Activity.create!(
          user:,
          activity_type: 'rating',
          tmdb_id:,
          media_type:,
          metadata: {
            rating:,
            review:,
            action: 'rated'
          }
        )

        user_rating
      end
    end

    # Get user's watchlist
    def get_watchlist(user:, media_type: nil)
      scope = user.user_watchlists
      scope = scope.where(media_type:) if media_type
      scope.order(created_at: :desc)
    end

    # Get user's ratings
    def get_ratings(user:, media_type: nil)
      scope = user.user_ratings
      scope = scope.where(media_type:) if media_type
      scope.order(created_at: :desc)
    end

    # Get recent activities for a user or all users
    def get_recent_activities(user: nil, limit: 20)
      scope = Activity.includes(:user).recent
      scope = scope.where(user:) if user
      scope.limit(limit)
    end

    # Check if user has rated a media
    def has_rated?(user:, tmdb_id:, media_type:)
      user.user_ratings.exists?(tmdb_id:, media_type:)
    end

    # Check if media is in user's watchlist
    def in_watchlist?(user:, tmdb_id:, media_type:)
      user.user_watchlists.exists?(tmdb_id:, media_type:)
    end
  end
end
