module TmdbApi
  module Response
    class Movie < Media
      def initialize(data = {}, client: nil)
        super(data, client:)
        @media_type = 'movie'
      end

      # Méthodes spécifiques aux films peuvent être ajoutées ici
      # Par exemple:
      # def runtime
      #   self['runtime']
      # end
      
      # def release_year
      #   Date.parse(self['release_date']).year if self['release_date']
      # end
    end
  end
end