module Types
  module TvShows
    class TvShowType < Types::BaseObject
      field :id, ID
      field :name, String
      field :original_language, String
      field :overview, String
      field :release_date, Types::DateType
      field :poster_path, String
      field :backdrop_path, String
    end
  end
end