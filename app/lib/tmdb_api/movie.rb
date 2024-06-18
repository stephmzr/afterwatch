# frozen_string_literal: true

require 'httparty'
module TmdbApi
  class Movie < Base
    def get_movie(id)
      self.class.get("/movie/#{id}", query: { api_key: API_KEY })
    end

    def search_movies(query, language)
      self.class.get('/search/movie', query: { query:, language:, api_key: API_KEY })
    end
  end
end
