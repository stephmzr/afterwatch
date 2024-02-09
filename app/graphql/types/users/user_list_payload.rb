# frozen_string_literal: true

module Types
  module Users
    class UserListPayload < BaseObject
      field :pagination, PaginationType, null: true
      field :users, [Types::Users::UserType], null: true
    end
  end
end
