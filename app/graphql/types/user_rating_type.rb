module Types
  class UserRatingType < Types::BaseObject
    field :id, ID, null: false
    field :user, Types::Users::UserType, null: false
    field :tmdb_id, ID, null: false
    field :media_type, String, null: false
    field :rating, Int, null: false
    field :review, String, null: true
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false

    # Media information (fetched from TMDB)
    field :media, Types::Medias::MediaType, null: true do
      description "The media information fetched from TMDB"
    end

    def media
      case object.media_type
      when 'movie'
        response = TmdbApi::Movie.new.get(object.tmdb_id)
        response.media_type = 'movie'
        response
      when 'tv'
        response = TmdbApi::TvShow.new.get(object.tmdb_id)
        response.media_type = 'tv'
        response
      end
    rescue => e
      Rails.logger.error "Error fetching media for rating: #{e.message}"
      nil
    end
  end
end 