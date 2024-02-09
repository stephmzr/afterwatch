# frozen_string_literal: true

module Types
  class BaseField < GraphQL::Schema::Field
    argument_class Types::BaseArgument

    # Override #initialize to take a new argument:
    def initialize(*args, authorize_attribute: nil, **kwargs, &block)
      # Pass on the default args:
      @check_can_read_attribute = authorize_attribute
      super(*args, **kwargs, &block)
    end

    def authorized?(obj, args, ctx)
      authorized = true
      skip_can_read_attribute = owner_type.try(:check_can_read_attributes).blank? && @check_can_read_attribute.blank?
      authorized = ctx[:current_user].can?(:read, obj, method_sym.to_sym) unless skip_can_read_attribute

      super && authorized
    end
  end
end
