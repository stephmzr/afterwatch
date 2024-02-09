# frozen_string_literal: true

module InputObject
  class SearchUsersAttributes < AttributesInputObject
    description 'User search attributes'

    argument :indexed_full_name_i_cont, String, required: false
  end
end
