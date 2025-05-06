require_relative '../client'
require_relative '../config'

module TmdbApi
  module Media
    class MediaSearcher
      def initialize(client = nil)
        @http_client = client || TmdbApi::Client.new
      end

      def search(query, type)
        @http_client.get("#{BASE_URL}/search/#{type}", { query:, language: BASE_LANGUAGE })
      end

      def search_multi(query)
        @http_client.get("#{BASE_URL}/search/multi", { query:, language: BASE_LANGUAGE })
      end
    end
  end
end