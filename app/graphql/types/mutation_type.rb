# frozen_string_literal: true
# rubocop:disable all

module Types
  class MutationType < Types::BaseObject
    field :create_user, mutation: Mutations::Users::CreateUser
    field :update_password, mutation: Mutations::UpdatePassword
    field :update_user, mutation: Mutations::Users::UpdateUser
  end
end
