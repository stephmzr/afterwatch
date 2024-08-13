module Types
  module WatchProviders
    class WatchType < Types::BaseObject
      field :display_priority, Integer, null: true
      field :logo_path, String, null: true
      field :provider_name, String, null: true
    end

    class ProviderType < Types::BaseObject
      field :buy, [Types::WatchProviders::WatchType], null: true
      field :flatrate, [Types::WatchProviders::WatchType], null: true
      field :link, String, null: false
      field :rent, [Types::WatchProviders::WatchType], null: true
    end

    class ProvidersByCountryType < Types::BaseObject
      field :country_iso, String, null: false, method: :first
      field :providers, Types::WatchProviders::ProviderType, null: true, method: :last
    end

    class WatchProviderType < Types::BaseObject
      field :id, ID, null: false
      field :providers_by_country, [Types::WatchProviders::ProvidersByCountryType], null: true, hash_key: 'results'
      def providers_by_country
        object['results'].select { |country, _| country == 'FR' }
      end
    end
  end
end
