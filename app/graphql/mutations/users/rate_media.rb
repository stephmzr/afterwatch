module Mutations
  module Users
    class RateMedia < BaseMutation
      argument :media_type, String, required: true
      argument :rating, Int, required: true
      argument :review, String, required: false
      argument :tmdb_id, ID, required: true

      field :activity, Types::ActivityType, null: true
      field :errors, [String], null: false
      field :user_rating, Types::UserRatingType, null: true

      def authorized?(tmdb_id:, media_type:, rating:, review: nil)
        false unless context[:current_user]

        true
      end

      def resolve(tmdb_id:, media_type:, rating:, review: nil)
        return { errors: ['User not authenticated'] } unless context[:current_user]

        unless rating.between?(1, 10)
          return {
            user_rating: nil,
            activity: nil,
            errors: ['Rating must be between 1 and 10']
          }
        end

        begin
          result = UserActivityService.rate_media(
            user: context[:current_user],
            tmdb_id:,
            media_type:,
            rating:,
            review:
          )

          {
            user_rating: result,
            activity: Activity.where(user: context[:current_user], tmdb_id:, media_type:).last,
            errors: []
          }
        rescue StandardError => e
          {
            user_rating: nil,
            activity: nil,
            errors: [e.message]
          }
        end
      end
    end
  end
end
