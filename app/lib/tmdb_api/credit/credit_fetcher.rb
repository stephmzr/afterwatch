require_relative '../client'
require_relative '../config'

module TmdbApi
  module Credit
    class CreditFetcher
      def initialize(client = nil)
        @client = client || TmdbApi::Client.new
      end

      def get(id, type, language = nil)
        @client.get("#{BASE_URL}/#{type}/#{id}/credits", { language: language || @client.language || BASE_LANGUAGE })
      end
    end
  end
end
