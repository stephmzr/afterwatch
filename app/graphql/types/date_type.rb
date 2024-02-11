# frozen_string_literal: true

module Types
  class DateType < BaseScalar
    description 'Date or Datetime transported as a Date String'

    def self.coerce_input(value, _context)
      value&.to_date
    end

    def self.coerce_result(value, _context)
      value.to_date.to_fs
    end
  end
end