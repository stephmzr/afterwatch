module Types
  module TvShows
    class TvType < Types::BaseObject
      field :backdrop_path, String
      field :episode_run_time, [Int]
      field :first_air_date, Types::DateType
      field :genres, [Types::Medias::MediaGenreType]
      field :id, ID
      field :name, String
      field :original_language, String
      field :overview, String
      field :poster_path, String
      field :tagline, String
      field :vote_average, Float
    end
  end
end
