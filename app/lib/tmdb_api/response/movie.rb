module TmdbApi
  module Response
    class Movie < BaseResponse
      CAST_KEY = 'cast'.freeze
      CREW_KEY = 'crew'.freeze
      ID_KEY = 'id'.freeze

      def credits
        return @credits if defined?(@credits)

        credits_response = fetch_credits
        return nil if credits_response.nil?

        @credits = TmdbApi::Response::Credit.new
        @credits.id = credits_response[ID_KEY]
        @credits.cast = prepare_cast(credits_response[CAST_KEY])
        @credits.crew = prepare_crew(credits_response[CREW_KEY])
        @credits
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

      def fetch_credits
        TmdbApi::CreditUtils::CreditFetcher.new(@client).get(id, 'movie')
      rescue StandardError => e
        Rails.logger.error("Failed to fetch credits for movie ID #{id}: #{e.message}")
        nil
      end

      def fetch_watch_providers
        TmdbApi::WatchProviderUtils::WatchProviderFetcher.new(@client).get(id, 'movie')
      rescue StandardError => e
        Rails.logger.error("Failed to fetch watch providers for movie ID #{id}: #{e.message}")
        nil
      end

      def prepare_cast(cast_data)
        (cast_data || []).map do |actor_json|
          actor = TmdbApi::Response::Actor.prepare(actor_json)
          actor.client = @client
          actor
        end
      end

      def prepare_crew(crew_data)
        (crew_data || []).map do |crew_json|
          crew_member = TmdbApi::Response::CrewMember.prepare(crew_json)
          crew_member.client = @client
          crew_member
        end
      end
    end
  end
end