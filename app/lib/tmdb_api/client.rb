require 'httparty'
require_relative 'config'

module TmdbApi
  class Client
    include HTTParty

    attr_accessor :language

    def get(url, params)
      response = self.class.get(url, query: params.merge(api_key: API_KEY))
      handle_response(response)
    end

    private

    def handle_response(response)
      case response.code
      when 200
        response
      when 404
        raise TmdbApi::Error::NotFoundError, "Resource not found: #{response.message}"
      when 500..599
        raise TmdbApi::Error::ServerError, "Server error: #{response.message}"
      else
        raise TmdbApi::Error::ClientError, "HTTP Error: #{response.code} - #{response.message}"
      end
    end
  end
end