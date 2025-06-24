module Types
  class UserMediaStatusType < Types::BaseObject
    field :in_watchlist, Boolean, null: false
    field :has_rated, Boolean, null: false
  end
end 