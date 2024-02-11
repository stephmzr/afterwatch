module Types
  module Movies
    class MovieType < Types::BaseObject
      field :id, ID
      field :title, String
      field :original_language, String
      field :overview, String
      field :release_date, Types::DateType
    end
  end
end