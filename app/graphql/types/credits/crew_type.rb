module Types
  module Credits
    class CrewType < Types::BaseObject
      field :id, ID
      field :name, String
      field :job, String
      field :department, String
      field :profile_path, String
    end
  end
end