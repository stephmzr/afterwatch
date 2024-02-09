# frozen_string_literal: true

module Mutations
  class BaseMutation < GraphQL::Schema::RelayClassicMutation
    argument_class Types::BaseArgument
    field_class Types::BaseField
    input_object_class Types::BaseInputObject
    object_class Types::BaseObject

    def authorized?(**args)
      Rails.logger.debug "ERROR : authorized? method is missing in mutation #{self.class}".red
      raise 'AuthorizedMethodMissing'
    end
  end
end
