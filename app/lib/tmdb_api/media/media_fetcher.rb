require_relative '../http_client'
require_relative '../config'

module TmdbApi
  module Media
    class MediaFetcher
      def initialize(http_client = HttpClient.new)
        @http_client = http_client
      end

      def get(id, type, options = {}, language = BASE_LANGUAGE)
        params = { language: }
        media_data = @http_client.get("#{BASE_URL}/#{type}/#{id}", params)

        options.each do |key, value|
          media_data[key.to_s] = send("get_#{key}", id, type, language) if value && respond_to?("get_#{key}")
        end

        media_data
      end

      def get_credits(id, type, language = BASE_LANGUAGE)
        params = { language: }
        @http_client.get("#{BASE_URL}/#{type}/#{id}/credits", params)
      end

      def get_watch_providers(id, type, language = BASE_LANGUAGE)
        params = { language: }
        @http_client.get("#{BASE_URL}/#{type}/#{id}/watch/providers", params)
      end
    end
  end
end
