# frozen_string_literal: true

module TmdbApi
  module MediaUtils
    class MediaSearcher
      def initialize(client = nil)
        @http_client = client || TmdbApi::Client.new
      end

      def search(query, type, page = 1)
        @http_client.get("#{BASE_URL}/search/#{type}", { query:, language: BASE_LANGUAGE, page: })
      end

      def search_multi(query, page = 1)
        @http_client.get("#{BASE_URL}/search/multi", { query:, language: BASE_LANGUAGE, page: })
      end
    end
  end
end