# frozen_string_literal: true

module Types
  class JsonType < BaseScalar
    description 'Object transported as a Json String'

    def self.coerce_input(value, _context)
      return value if value.is_a?(Hash)
      return JSON.parse(value) if value.is_a?(String)

      nil
    end

    def self.coerce_result(value, _context)
      value.to_json
    end
  end
end
