module TmdbApi
  module Response
    class Media < BaseResponse
      CAST_KEY = 'cast'.freeze
      CREW_KEY = 'crew'.freeze
      ID_KEY = 'id'.freeze

      attr_reader :media_type

      def initialize(data = {}, client: nil)
        super(data)
        @client = client || TmdbApi::Client.new
      end

      def credits
        return @credits if defined?(@credits)

        credits_response = fetch_credits
        return nil if credits_response.body.nil?

        @credits = build_credits(credits_response)
      end

      def cast
        credits&.cast
      end

      def crew
        credits&.crew
      end

      def watch_providers
        return @watch_providers if defined?(@watch_providers)

        @watch_providers = fetch_watch_providers
      end

      private

      def build_credits(credits_response)
        TmdbApi::Response::Credit.new(
          id: credits_response[ID_KEY],
          cast: build_cast(credits_response[CAST_KEY]),
          crew: build_crew(credits_response[CREW_KEY])
        )
      end

      def build_cast(cast_data)
        return [] unless cast_data

        cast_data.map do |actor_json|
          TmdbApi::Response::Actor.new(actor_json)
        end
      end

      def build_crew(crew_data)
        return [] unless crew_data

        crew_data.map do |crew_json|
          TmdbApi::Response::CrewMember.new(crew_json)
        end
      end

      def fetch_credits
        TmdbApi::CreditUtils::CreditFetcher.new(@client).get(id, media_type)
      rescue StandardError => e
        Rails.logger.error("Failed to fetch credits for #{media_type} ID #{id}: #{e.message}")
        nil
      end

      def fetch_watch_providers
        TmdbApi::WatchProviderUtils::WatchProviderFetcher.new(@client).get(id, media_type)
      rescue StandardError => e
        Rails.logger.error("Failed to fetch watch providers for #{media_type} ID #{id}: #{e.message}")
        nil
      end

      # Méthode qui retourne le type de média
      def media_type
        @media_type || raise(NotImplementedError, 'media_type not set')
      end
    end
  end
end 