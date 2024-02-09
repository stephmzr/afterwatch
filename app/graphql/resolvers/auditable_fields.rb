# frozen_string_literal: true

module Resolvers
  module AuditableFields
    class << self
      def included(child_class)
        child_class.field(:creator, Types::Users::UserType, null: true)
        child_class.field(:created_by, GraphQL::Types::ID, null: true)

        child_class.field(:updator, Types::Users::UserType, null: true)
        child_class.field(:updated_by, GraphQL::Types::ID, null: true)
      end
    end
  end
end
