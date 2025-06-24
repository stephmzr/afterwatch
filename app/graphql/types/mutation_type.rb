# frozen_string_literal: true
# rubocop:disable all

module Types
  class MutationType < Types::BaseObject
    field :create_user, mutation: Mutations::Users::CreateUser
    field :update_password, mutation: Mutations::UpdatePassword
    field :update_user, mutation: Mutations::Users::UpdateUser
    
    # User Activity Mutations
    field :add_to_watchlist, mutation: Mutations::Users::AddToWatchlist
    field :remove_from_watchlist, mutation: Mutations::Users::RemoveFromWatchlist
    field :rate_media, mutation: Mutations::Users::RateMedia
  end
end
