module Types
  class ActivityType < Types::BaseObject
    field :activity_type, String, null: false
    field :id, ID, null: false

    field :action_text, String, null: true do
      description 'Human readable action text'
    end

    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :media_type, String, null: false
    field :metadata, GraphQL::Types::JSON, null: true
    field :tmdb_id, ID, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
    field :user, Types::Users::UserType, null: false

    # Media information (fetched from TMDB)
    field :media, Types::Medias::MediaType, null: true do
      description 'The media information fetched from TMDB'
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
    rescue StandardError => e
      Rails.logger.error "Error fetching media for activity: #{e.message}"
      nil
    end
  end
end
