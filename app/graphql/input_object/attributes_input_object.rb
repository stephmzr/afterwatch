# frozen_string_literal: true

module InputObject
  class AttributesInputObject < GraphQL::Schema::InputObject
    argument_class Types::BaseArgument

    def prepare
      attrs = {}
      arguments.each_value.each do |argument|
        value = argument.value
        value = argument.definition.default_value if value.nil? && argument.definition.default_value.present? && argument.definition.default_value != :__no_default__
        attrs[argument.definition.name.to_s.underscore.to_sym] = value
      end
      attrs
    end
  end
end
