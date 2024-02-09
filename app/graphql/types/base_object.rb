# frozen_string_literal: true

require 'string'
module Types
  class BaseObject < GraphQL::Schema::Object
    edge_type_class(Types::BaseEdge)
    connection_type_class(Types::BaseConnection)
    field_class Types::BaseField

    # this attr_accessor will be evaluated by .authorized? method in BaseField
    # if the value is true, all field of the given Object (ex: User::Type) will be checked for reading authorization
    # with CanCanCan defined abilities
    class << self
      attr_writer :authorize_resource, :authorize_attributes

      def authorize_resource(value: true)
        @authorize_resource = value
      end

      def authorize_attributes(value: true)
        @authorize_attributes = value
      end
    end

    def self.authorized?(object, context)
      (super && @authorize_resource.blank?) || context[:current_user].can?(:read, object)
    end

    # graphql/types/base_object.rb
    def self.scope_items(items, context)
      return [] if items.blank?
      return items unless items.first.class.ancestors.include?(ApplicationRecord)

      unless items.respond_to?(:accessible_by_user)
        Rails.logger.debug "WARNING : accessible_by_user method missing in model #{items.first.class} in order to prevent access to all ressources".brown
        return items
      end
      items.accessible_by_user(context[:current_user])
    end
  end
end
