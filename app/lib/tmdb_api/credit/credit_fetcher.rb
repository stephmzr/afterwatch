require_relative '../http_client'
require_relative '../config'

module TmdbApi
  module Credit
    class CreditFetcher
      def initialize(client = HttpClient.new)
        @client = client
      end

      def get(id, type)
        @client.get("#{BASE_URL}/#{type}/#{id}/credits", { language: BASE_LANGUAGE })
      end
    end
  end
end
