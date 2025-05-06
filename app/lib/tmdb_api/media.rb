module TmdbApi
  class Media < BaseMedia
    def search_multi(query, page = 1, per_page = 20)
      Rails.logger.info "Searching for #{query} in all media types (page: #{page})"
      response = media_searcher.search_multi(query, page)
      return nil unless response && response['results']

      # Filter results to include only movies and TV shows
      filtered_results = response['results'].filter do |media|
        media['media_type'] == 'movie' || media['media_type'] == 'tv'
      end

      # Paginate results
      paginated_results = filtered_results.first(per_page)

      # Prepare response
      items = prepare_items(paginated_results)
      meta = prepare_meta(response, page, -> { search_multi(query, page - 1, per_page) }, -> { search_multi(query, page + 1, per_page) })
      TmdbApi::Response::Response.prepare({ items:, meta: })
    rescue StandardError => e
      Rails.logger.error("Failed to search for #{query}: #{e.message}")
      nil
    end

    private

    def media_searcher
      TmdbApi::Media::MediaSearcher.new(@client)
    end
  end
end
