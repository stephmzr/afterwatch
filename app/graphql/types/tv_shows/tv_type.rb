module Types
  module TvShows
    class TvType < Types::BaseObject
      field :id, ID
      field :name, String
      field :original_language, String
      field :overview, String
      field :first_air_date, Types::DateType
      field :poster_path, String
      field :backdrop_path, String
    end
  end
end