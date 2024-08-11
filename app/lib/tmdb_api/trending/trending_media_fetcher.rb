require_relative '../http_client'
require_relative '../config'

module TmdbApi
  module Trending
    class TrendingMediaFetcher
      def initialize(http_client = HttpClient.new)
        @http_client = http_client
      end

      def get_trending(media_type = 'all', time_window = 'week')
        @http_client.get("#{BASE_URL}/trending/#{media_type}/#{time_window}", { language: BASE_LANGUAGE })
      end
    end
  end
end
