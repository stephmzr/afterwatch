# frozen_string_literal: true

module Types
  class PaginationType < BaseObject
    field :page, Int, null: false
    field :per_page, Int, null: true
    field :total, Int, null: true
    field :total_page, Int, null: false
  end
end
