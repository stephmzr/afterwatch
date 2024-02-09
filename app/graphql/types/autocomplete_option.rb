# frozen_string_literal: true

module Types
  class AutocompleteOption < BaseObject
    field :label, String
    field :value, ID
  end
end
