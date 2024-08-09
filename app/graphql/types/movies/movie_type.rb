module Types
  module Movies
    class MovieType < Types::BaseObject
      field :backdrop_path, String
      field :genres, [Types::Medias::MediaGenreType]
      field :id, ID
      field :original_language, String
      field :overview, String
      field :poster_path, String
      field :release_date, Types::DateType
      field :runtime, Int
      field :title, String
      field :tagline, String
      field :vote_average, Float
    end
  end
end
