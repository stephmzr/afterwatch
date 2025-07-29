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

      def flatrate
        if object.is_a?(Hash)
          object['flatrate'] || []
        else
          []
        end
      end

      def buy
        if object.is_a?(Hash)
          object['flatrate'] || []
        else
          []
        end
      end

      def rent
        if object.is_a?(Hash)
          object['flatrate'] || []
        else
          []
        end
      end
    end

    class WatchProviderType < Types::BaseObject
      field :id, ID, null: false
      field :providers, Types::WatchProviders::ProviderType, null: true, hash_key: 'results'
      def providers
        object['results'].select { |country, _| country == 'FR' }.values.first
      end
    end
  end
end
