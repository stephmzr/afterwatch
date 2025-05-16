module TmdbApi
  class BaseMedia
    def initialize(client = nil)
      @client = client || TmdbApi::Client.new
    end

    def popular(page = 1)
      Rails.logger.info "Fetching popular #{media_type}, page: #{page}"
      response = @client.get("#{BASE_URL}#{popular_endpoint}", { language: BASE_LANGUAGE, region: BASE_REGION, page: })
      return nil unless response && response['results']

      items = prepare_items(response['results'])
      meta = prepare_meta(response, page, -> { popular(page - 1) }, -> { popular(page + 1) })

      TmdbApi::Response::Response.prepare({ items:, meta: })
    rescue StandardError => e
      Rails.logger.error("Failed to fetch popular #{media_type}: #{e.message}")
      nil
    end

    def trending(time_window = DEFAULT_TIME_WINDOW)
      Rails.logger.info "Fetching trending #{media_type} for time window: #{time_window}"
      response = @client.get("#{BASE_URL}#{trending_endpoint}#{time_window}", { language: BASE_LANGUAGE })
      return nil unless response && response['results']

      items = prepare_items(response['results'])
      TmdbApi::Response::Response.prepare({ items:, meta: nil })
    rescue StandardError => e
      Rails.logger.error("Failed to fetch trending #{media_type}: #{e.message}")
      nil
    end

    def get(id, language = BASE_LANGUAGE)
      item = response_class.prepare(media_fetcher.get(id, media_type, language))
      item.client = @client
      item
    end

    private

    def media_fetcher
      TmdbApi::MediaUtils::MediaFetcher.new(@client)
    end

    def prepare_items(results)
      results.map { |result| response_class.prepare(result) }
    end

    def prepare_meta(response, page, prev_lambda, next_lambda)
      TmdbApi::Response::Meta.prepare({
        page: response['page'],
        total_pages: response['total_pages'],
        total: response['total_results'],
        prev: page > 1 ? prev_lambda : nil,
        next: page < response['total_pages'] ? next_lambda : nil
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