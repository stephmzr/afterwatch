require 'httparty'

module TmdbApi
  class Media < Base
    def get(id, type)
      request("#{BASE_URL}/#{type}/#{id}", { language: BASE_LANGUAGE })
    end

    def search(query, language, type)
      request("#{BASE_URL}/search/#{type}", { query:, language: })
    end

    def search_multi(query, language)
      request("#{BASE_URL}/search/multi", { query:, language: })
    end

    def get_trending(media_type = 'all', time_window = 'week')
      request("#{BASE_URL}/trending/#{media_type}/#{time_window}", { language: BASE_LANGUAGE })
    end

    private

    def request(url, params)
      response = self.class.get(url, query: params.merge(api_key: API_KEY))
      handle_response(response)
    end

    def handle_response(response)
      case response.code
      when 200
        response
      else
        raise "HTTP Error: #{response.code} - #{response.message}"
      end
    end
  end
end
