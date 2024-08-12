require_relative '../http_client'
require_relative '../config'

module TmdbApi
  module Media
    class MediaFetcher
      def initialize(http_client = HttpClient.new)
        @http_client = http_client
      end

      def get(id, type, language = BASE_LANGUAGE, with_credits: false)
        params = { language: }
        media_data = @http_client.get("#{BASE_URL}/#{type}/#{id}", params)

        if with_credits
          credits_data = get_credits(id, type, language)
          media_data['credits'] = credits_data
        end

        media_data
      end

      def get_credits(id, type, language = BASE_LANGUAGE)
        params = { language: }
        @http_client.get("#{BASE_URL}/#{type}/#{id}/credits", params)
      end
    end
  end
end