module Types
  module Movies
    class MovieType < Types::BaseObject
      field :backdrop_path, String
      field :credits, Types::Credits::CreditType
      field :genres, [Types::Medias::GenreType]
      field :id, ID
      field :original_language, String
      field :original_title, String
      field :overview, String
      field :poster_path, String
      field :release_date, Types::DateType
      field :runtime, Int
      field :tagline, String
      field :title, String
      field :vote_average, Float
      field :watch_providers, Types::WatchProviders::WatchProviderType
    end
  end
end
