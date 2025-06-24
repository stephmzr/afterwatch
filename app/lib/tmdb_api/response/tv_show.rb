module TmdbApi
  module Response
    class TvShow < Media
      def initialize(data = {}, client: nil)
        super(data, client:)
        @media_type = 'tv'
      end

      # Méthodes spécifiques aux séries TV peuvent être ajoutées ici
      # Par exemple:
      # def number_of_seasons
      #   self['number_of_seasons']
      # end
      
      # def number_of_episodes
      #   self['number_of_episodes']
      # end
      
      # def first_air_year
      #   Date.parse(self['first_air_date']).year if self['first_air_date']
      # end
    end
  end
end