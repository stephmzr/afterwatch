# frozen_string_literal: true
# rubocop:disable all
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

    def profile
      context[:current_user]
    end

    field :medias, [Types::Medias::MediaType], null: false do
      argument :language, String, required: false
      argument :search, InputObject::SearchMediasAttributes, required: true
      argument :per_page, Int, required: false
    end

    def medias(language: TmdbApi::Base::BASE_LANGUAGE, search: {}, per_page: 5)
      response = TmdbApi::Media.new.search_multi(search[:query], language)
      response['results'].first(per_page)
    end

    field :media, Types::Medias::MediaType, null: true do
      argument :id, ID, required: true
      argument :type, String, required: true
    end
    def media(id:, type:)
      response = TmdbApi::Media.new.get(id, type)
      p type
      # Add media_type to the response to be able to determine the type of media
      response['media_type'] = type
      response.parsed_response
    end

    field :movies, [Types::Movies::MovieType], null: false do
      argument :language, String, required: false
      argument :search, InputObject::SearchMoviesAttributes, required: true
      argument :per_page, Int, required: false
    end

    def movies(language: TmdbApi::Base::BASE_LANGUAGE, search: {}, per_page: 5)
      response = TmdbApi::Movie.new.search_movies(search[:query], language)
      response['results'].first(per_page)
    end

    field :movie, Types::Movies::MovieType, null: true do
      argument :id, ID, required: true
    end
    def movie(id:)
      response = TmdbApi::Movie.new.get(id)
      response.parsed_response
    end

    field :trending_movies, [Types::Medias::MediaType], null: false
    def trending_movies
      response = TmdbApi::Media.new.get_trending
      response['results']
    end
  end
end
