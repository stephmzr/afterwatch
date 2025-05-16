module TmdbApi
  module MediaUtils
    class MediaFetcher
      def initialize(client = nil)
        @http_client = client || TmdbApi::Client.new
      end

      def get(id, type, language = BASE_LANGUAGE)
        params = { language: }
        @http_client.get("#{BASE_URL}/#{type}/#{id}", params)
      end
    end
  end
end
