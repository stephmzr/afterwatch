module Types
  class ActivityType < Types::BaseObject
    field :id, ID, null: false
    field :user, Types::Users::UserType, null: false
    field :activity_type, String, null: false
    field :tmdb_id, ID, null: false
    field :media_type, String, null: false
    field :metadata, GraphQL::Types::JSON, null: true
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
      Rails.logger.error "Error fetching media for activity: #{e.message}"
      nil
    end

    # Helper fields for easier frontend consumption
    field :action_text, String, null: true do
      description "Human readable action text"
    end

    def action_text
      case object.activity_type
      when 'rating'
        rating = object.metadata&.dig('rating')
        action = object.metadata&.dig('action')
        case action
        when 'rated'
          "a noté #{rating}/10"
        when 'updated_rating'
          "a modifié sa note à #{rating}/10"
        else
          "a noté #{rating}/10"
        end
      when 'watchlist'
        action = object.metadata&.dig('action')
        case action
        when 'added'
          "a ajouté à sa watchlist"
        when 'removed'
          reason = object.metadata&.dig('reason')
          if reason == 'rated'
            "a regardé et noté"
          else
            "a retiré de sa watchlist"
          end
        else
          "a modifié sa watchlist"
        end
      end
    end
  end
end 