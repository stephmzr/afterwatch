# frozen_string_literal: true

module Resolvers
  module AuthorizationFields
    class << self
      def included(child_class)
        child_class.field(:can_destroy, GraphQL::Schema::Member::GraphQLTypeNames::Boolean, null: false)
        child_class.field(:can_edit, GraphQL::Schema::Member::GraphQLTypeNames::Boolean, null: false)
      end
    end

    def can_destroy
      context[:current_user].can?(:destroy, object)
    end

    def can_edit
      context[:current_user].can?(:edit, object)
    end

    def can_manage
      context[:current_user].can?(:manage, object)
    end
  end
end
