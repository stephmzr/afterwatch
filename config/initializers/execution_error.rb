# frozen_string_literal: true

# :nocov:
# config/initializer/execution_error.rb
module GraphQL
  class ExecutionError < GraphQL::Error
    attr_accessor :error, :record

    def initialize(error)
      @error = error
      @record = error.try(:record)
    end

    def to_h
      if record.present? && record.errors.present?
        {
          message: 'Invalid record',
          errors: record.errors.messages
        }
      else
        error
      end
    end
  end
end
# :nocov: