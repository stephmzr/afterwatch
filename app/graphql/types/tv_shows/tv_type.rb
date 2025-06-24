module Types
  module TvShows
    class TvType < Types::BaseObject
      field :backdrop_path, String
      field :credits, Types::Credits::CreditType
      field :episode_run_time, [Int]
      field :first_air_date, Types::DateType
      field :genres, [Types::Medias::GenreType]
      field :id, ID
      field :media_type, String, null: false
      field :name, String
      field :original_language, String
      field :original_name, String
      field :overview, String
      field :poster_path, String
      field :tagline, String
      field :vote_average, Float
      field :watch_providers, Types::WatchProviders::WatchProviderType
      def media_type
        'tv'
      end
    end
  end
end
