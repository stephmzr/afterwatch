require_relative '../http_client'
require_relative '../config'

module TmdbApi
  module Media
    class MediaFetcher
      def initialize(http_client = HttpClient.new)
        @http_client = http_client
      end

      def get(id, type, language = BASE_LANGUAGE)
        params = { language: }
        @http_client.get("#{BASE_URL}/#{type}/#{id}", params)
      end
    end
  end
end
