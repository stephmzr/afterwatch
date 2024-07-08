require 'httparty'

module TmdbApi
  class Media < Base
    def get(id, type)
      self.class.get("/#{type}/#{id}", query: { language: BASE_LANGUAGE, api_key: API_KEY })
    end

    def search(query, language, type)
      self.class.get("/search/#{type}", query: { query:, language:, api_key: API_KEY })
    end

    def search_multi(query, language)
      self.class.get('/search/multi', query: { query:, language:, api_key: API_KEY })
    end
  end
end
