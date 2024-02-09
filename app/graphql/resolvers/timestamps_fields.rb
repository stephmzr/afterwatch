# frozen_string_literal: true

module Resolvers
  module TimestampsFields
    class << self
      def included(child_class)
        child_class.field(:created_at, GraphQL::Types::ISO8601DateTime, null: false)
        child_class.field(:updated_at, GraphQL::Types::ISO8601DateTime, null: false)
      end
    end
  end
end
