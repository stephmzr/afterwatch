module TmdbApi
  class BaseMedia
    def initialize(client = nil)
      @client = client || TmdbApi::Client.new
    end

    def popular(page = 1)
      fetch_cached_data({
                          cache_key: "tmdb:popular:#{media_type}:#{page}",
                          log_message: "Fetching popular #{media_type}, page: #{page}",
                          endpoint: popular_endpoint,
                          params: { language: BASE_LANGUAGE, region: BASE_REGION, page: },
                          page:,
                          prev_lambda: -> { popular(page - 1) },
                          next_lambda: -> { popular(page + 1) },
                          error_message: "Failed to fetch popular #{media_type}"
                        })
    end

    def trending(time_window = DEFAULT_TIME_WINDOW)
      fetch_cached_data({
                          cache_key: "tmdb:trending:#{media_type}:#{time_window}",
                          log_message: "Fetching trending #{media_type} for time window: #{time_window}",
                          endpoint: "#{trending_endpoint}#{time_window}",
                          params: { language: BASE_LANGUAGE },
                          page: 1,
                          prev_lambda: -> { trending(time_window) },
                          next_lambda: -> { trending(time_window) },
                          error_message: "Failed to fetch trending #{media_type}"
                        })
    end

    def get(id, language = BASE_LANGUAGE)
      data = media_fetcher.get(id, media_type, language)
      response_class.new(data, client: @client)
    end

    private

    def fetch_cached_data(config)
      cached_response = fetch_from_cache_or_api(config[:cache_key], config[:log_message], config[:endpoint], config[:params])
      return nil unless cached_response

      build_response(cached_response, config[:page], config[:prev_lambda], config[:next_lambda])
    rescue StandardError => e
      Rails.logger.error("#{config[:error_message]}: #{e.message}")
      nil
    end

    def fetch_from_cache_or_api(cache_key, log_message, endpoint, params)
      Rails.cache.fetch(cache_key, expires_in: 30.minutes) do
        Rails.logger.info log_message
        response = @client.get("#{BASE_URL}#{endpoint}", params)
        return nil unless response&.dig('results')

        extract_response_data(response)
      end
    end

    def extract_response_data(response)
      {
        results: response['results'],
        page: response['page'],
        total_pages: response['total_pages'],
        total_results: response['total_results']
      }
    end

    def build_response(cached_response, page, prev_lambda, next_lambda)
      items = prepare_items(cached_response[:results])
      meta = prepare_meta(cached_response, page, prev_lambda, next_lambda)
      TmdbApi::Response::Response.new({ items:, meta: })
    end

    def media_fetcher
      TmdbApi::MediaUtils::MediaFetcher.new(@client)
    end

    def prepare_items(results)
      results.map { |result| response_class.new(result) }
    end

    def prepare_meta(response, page, prev_lambda, next_lambda)
      total_pages = response['total_pages'] || 0
      TmdbApi::Response::Meta.prepare({
                                        page: response['page'],
                                        total_pages: response['total_pages'],
                                        total: response['total_results'],
                                        prev: page > 1 ? prev_lambda : nil,
                                        next: page < total_pages ? next_lambda : nil
                                      })
    end

    # These methods must be overridden in subclasses
    def media_type
      raise NotImplementedError, 'Subclasses must define media_type'
    end

    def popular_endpoint
      raise NotImplementedError, 'Subclasses must define popular_endpoint'
    end

    def trending_endpoint
      raise NotImplementedError, 'Subclasses must define trending_endpoint'
    end

    def response_class
      raise NotImplementedError, 'Subclasses must define response_class'
    end
  end
end
