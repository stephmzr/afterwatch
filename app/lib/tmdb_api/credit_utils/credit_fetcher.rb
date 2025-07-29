# frozen_string_literal: true

module TmdbApi
  module CreditUtils
    class CreditFetcher
      def initialize(client = nil)
        @client = client || TmdbApi::Client.new
      end

      def get(id, type, language = nil)
        cache_key = "tmdb_credits_#{type}_#{id}_#{language || @client.language || BASE_LANGUAGE}"
        Rails.cache.fetch(cache_key, expires_in: 24.hours) do
          @client.get("#{BASE_URL}/#{type}/#{id}/credits", { language: language || @client.language || BASE_LANGUAGE })
        end
      end
    end
  end
end
