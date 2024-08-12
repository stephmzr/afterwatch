module Types
  module WatchProviders
    class ProviderType < Types::BaseObject
      field :display_priority, Int, null: true
      field :logo_path, String, null: true
      field :provider_id, Int, null: true
      field :provider_name, String, null: true
    end

    class WatchProviderType < Types::BaseObject
      field :buy, [Types::WatchProviders::ProviderType], null: true
      field :flatrate, [Types::WatchProviders::ProviderType], null: true
      field :rent, [Types::WatchProviders::ProviderType], null: true
    end
  end
end
