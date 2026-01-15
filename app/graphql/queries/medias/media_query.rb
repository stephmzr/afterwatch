# frozen_string_literal: true

module Queries
  module Medias
    class MediasQuery < Queries::BaseQuery
      description 'List of crew members'

      type ::Types::Medias::MediaType, null: false

      argument :page, Integer, required: false
      argument :per_page, Integer, required: false
      argument :search, InputObject::SearchMediasAttributes, required: false

      def authorized?(**args)
        context[:current_user].authorize!(:index, Media)
      end

      def resolve(search: {}, page: 1, per_page: 25)
        ctx = ::Medias::SearchMedias.call(search:, pagination_params: { page:, per_page: })
        {
          medias: ctx.records,
          pagination: ctx.pagination
        }
      end
    end
  end
end
