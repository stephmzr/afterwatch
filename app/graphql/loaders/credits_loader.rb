module Loaders
  class CreditsLoader < GraphQL::Batch::Loader
    def initialize(media_type)
      @media_type = media_type
      @client = TmdbApi::Client.new
    end

    def perform(media_ids)
      Rails.logger.info "Batch loading credits for #{media_ids.count} #{@media_type}s: #{media_ids}"

      # Utiliser Thread pool pour paralléliser les requêtes
      credits_data = Concurrent::Hash.new
      threads = []

      media_ids.each do |media_id|
        threads << Thread.new do
          credit_fetcher = TmdbApi::CreditUtils::CreditFetcher.new(@client)
          response = credit_fetcher.get(media_id, @media_type)

          if response && response['cast'] && response['crew']
            credit = TmdbApi::Response::Credit.new(
              id: response['id'],
              cast: build_cast(response['cast']),
              crew: build_crew(response['crew'])
            )
            credits_data[media_id] = credit
          else
            credits_data[media_id] = nil
          end
        rescue StandardError => e
          Rails.logger.error "Failed to fetch credits for #{@media_type} #{media_id}: #{e.message}"
          credits_data[media_id] = nil
        end
      end

      # Attendre que tous les threads se terminent
      threads.each(&:join)

      # Fulfiller les promesses dans l'ordre original
      media_ids.each do |media_id|
        fulfill(media_id, credits_data[media_id])
      end
    end

    private

    def build_cast(cast_data)
      return [] unless cast_data

      cast_data.map { |actor_json| TmdbApi::Response::Actor.new(actor_json) }
    end

    def build_crew(crew_data)
      return [] unless crew_data

      crew_data.map { |crew_json| TmdbApi::Response::CrewMember.new(crew_json) }
    end
  end
end
