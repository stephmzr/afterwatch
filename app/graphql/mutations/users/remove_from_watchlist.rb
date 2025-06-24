module Mutations
  module Users
    class RemoveFromWatchlist < BaseMutation
      argument :tmdb_id, ID, required: true
      argument :media_type, String, required: true

      field :watchlist, Types::UserWatchlistType, null: true
      field :activity, Types::ActivityType, null: true
      field :errors, [String], null: false

      def authorized?(tmdb_id:, media_type:)
        return true if context[:current_user]

        raise GraphQL::UnauthorizedFieldError, 'You must be logged in to remove from watchlist'
      end

      def resolve(tmdb_id:, media_type:)
        begin
          result = UserActivityService.remove_from_watchlist(
            user: context[:current_user],
            tmdb_id:,
            media_type:
          )

          if result.nil?
            {
              watchlist: nil,
              activity: nil,
              errors: ['Item not found in watchlist']
            }
          else
            {
              watchlist: result,
              activity: Activity.where(user: context[:current_user], tmdb_id:, media_type:).last,
              errors: []
            }
          end
        rescue StandardError => e
          {
            watchlist: nil,
            activity: nil,
            errors: [e.message]
          }
        end
      end
    end
  end
end 