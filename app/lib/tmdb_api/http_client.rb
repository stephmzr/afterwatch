require 'httparty'
require_relative 'config'

module TmdbApi
  class HttpClient
    include HTTParty

    def get(url, params)
      response = self.class.get(url, query: params.merge(api_key: API_KEY))
      handle_response(response)
    end

    private

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