module TmdbApi
  module Utils
    def prepare_items(results, client, response_class)
      results.map do |result|
        item = response_class.prepare(result)
        item.client = client
        item
      end
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
  end
end