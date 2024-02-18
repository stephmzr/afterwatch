module Types
  module Movies
    class MovieType < Types::BaseObject
      field :id, ID
      field :title, String
      field :original_language, String
      field :overview, String
      field :release_date, Types::DateType
      field :poster_path, String
      field :backdrop_path, String
    end
  end
end