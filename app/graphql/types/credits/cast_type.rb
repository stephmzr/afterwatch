module Types
  module Credits
    class CastType < Types::BaseObject
      field :character, String
      field :gender, String
      field :id, ID
      field :known_for_department, String
      field :name, String
      field :profile_path, String
    end
  end
end
