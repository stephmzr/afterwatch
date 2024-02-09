# frozen_string_literal: true
# rubocop:disable all

module Types
  module Users
    class UserType < Types::BaseObject
      include Resolvers::AuditableFields
      include Resolvers::AuthorizationFields

      # authorize_resource
      # authorize_attributes

      field :active, Boolean, null: true
      field :created_at, Types::DateType, null: true
      field :current_sign_in_at, TimeType, null: true
      field :email, String, null: true # , authorize_attribute: true
      field :first_name, String, null: true
      field :full_name, String, null: true
      field :id, ID, null: true, description: 'ID'
      field :last_name, String, null: true
      field :last_request_at, TimeType, null: true
      field :versions_to_array, [Types::VersionType], null: true
    end
  end
end
