# frozen_string_literal: true

module Types
  class VersionType < Types::BaseObject
    field :changes, [String], null: true
    field :created_at, Types::DateType, null: true
    field :event, String, null: true
    field :user, Types::Users::UserType, null: true
  end
end
