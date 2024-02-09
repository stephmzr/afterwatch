# frozen_string_literal: true

module Types
  class TimeType < BaseScalar
    description 'Date or Datetime transported as a DateTime String'
    def self.coerce_input(value, context)
      value
    end

    def self.coerce_result(value, _context)
      value.strftime('%Y-%m-%dT%H:%M:%S.%L%z')
    end
  end
end
