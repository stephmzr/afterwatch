module Types
  module Credits
    class CastType < Types::BaseObject
      field :id, ID
      field :name, String
      field :character, String
      field :profile_path, String
      field :known_for_department, String
      field :gender, String
    end
  end
end