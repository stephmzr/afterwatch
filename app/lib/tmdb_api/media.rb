module TmdbApi
  class Media
    def initialize(client = nil)
      @client = client || TmdbApi::Client.new
    end

    def search_multi(query, page = 1, per_page = 8)
      Rails.logger.info "Searching for #{query} in all media types (page: #{page})"
      start_time = Time.zone.now
      response = media_searcher.search_multi(query, page)
      Rails.logger.info "TMDb API call took #{Time.zone.now - start_time} seconds"
      validate_response(response, ['results'])

      filtered_results = response['results'].filter do |media|
        %w[movie tv].include?(media['media_type'])
      end

      filtered_results.first(per_page)
    rescue StandardError => e
      Rails.logger.error("Failed to search for #{query}: #{e.message}")
      raise
    end

    private

    def media_searcher
      TmdbApi::MediaUtils::MediaSearcher.new(@client)
    end

    def validate_response(response, required_keys)
      required_keys.each do |key|
        raise TmdbApi::Error::InvalidResponse, "Missing key: #{key}" unless response.key?(key)
      end
    end
  end
end
