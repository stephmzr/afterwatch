# frozen_string_literal: true

require 'httparty'
module TmdbApi
  class Movie < Media
    def get_movie(id)
      get(id, 'movie')
    end

    def search_movies(query, language)
      search(query, language, 'movie')
    end
  end
end
