# frozen_string_literal: true

module Types
  class QueryType < Types::BaseObject
    # Add `node(id: ID!) and `nodes(ids: [ID!]!)`
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    field :profile, Types::Users::UserType, null: true

    field :users, Types::Users::UserListPayload, null: false, description: 'List of users' do
      argument :page, Integer, required: false
      argument :per_page, Integer, required: false
      argument :search, InputObject::SearchUsersAttributes, required: false
    end
    def users(page: 1, per_page: 25, search: {})
      users = ::User.accessible_by(context[:current_user].ability)
      ctx = ::Users::SearchUsers.call(
        scope: users,
        search: search,
        pagination_params: { page:, per_page: }
      )
      {
        users: ctx.records,
        pagination: ctx.pagination
      }
    end

    field :user, Types::Users::UserType do
      argument :id, ID, required: true
    end

    field :autocomplete, [Types::AutocompleteOption], null: true do
      argument :label, String, required: true
      argument :limit, Integer, required: false
      argument :model, String, required: true
      argument :search, String, required: false
      argument :value, String, required: true
    end

    def profile
      context[:current_user]
    end

    def autocomplete(model:, label:, value:, search: nil, limit: 0)
      GetAutocompleteValue.call(model:, label:, value:, search:, limit:).records
    end

    # Fields
  end
end
