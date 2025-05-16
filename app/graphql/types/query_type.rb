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
      argument :search, InputObject::SearchMediasAttributes, required: true
      argument :per_page, Int, required: false
    end

    def medias(search: {}, per_page: 8)
      response = TmdbApi::Media.new.search_multi(search[:query])
      return [] unless response 

      response.first(per_page)
    end

    field :media, Types::Medias::MediaType, null: true do
      argument :id, ID, required: true
      argument :type, String, required: true
    end
    def media(id:, type:)
      case type
      when 'movie'
        response = TmdbApi::Movie.new.get(id)
        response.media_type = 'movie'
        response
      when 'tv'
        response = TmdbApi::TvShow.new.get(id)
        response.media_type = 'tv'
        response
      else
        raise GraphQL::ExecutionError, "Invalid media type: #{type}"
      end
    end

    field :movies, [Types::Movies::MovieType], null: false do
      argument :search, InputObject::SearchMoviesAttributes, required: true
      argument :per_page, Int, required: false
    end

    def movies(search: {}, per_page: 5)
      response = TmdbApi::Movie.new.search(search[:query])
      response.items.first(per_page)
    end

    field :movie, Types::Movies::MovieType, null: true do
      argument :id, ID, required: true
    end
    def movie(id:)
      TmdbApi::Movie.new.get(id)
    end

    field :trending_movies, [Types::Movies::MovieType], null: false
    def trending_movies
      TmdbApi::Movie.new.trending.items
    end
    
    field :popular_movies, [Types::Movies::MovieType], null: false
    def popular_movies
      TmdbApi::Movie.new.popular.items
    end

    field :cast, [Types::Credits::CastType], null: false do
      argument :id, ID, required: true
      argument :type, String, required: true
    end
    def cast(id:, type:)
      media = TmdbApi::MediaUtils::MediaFetcher.new.get(id, type)
      media.credits.cast
    end
  end
end