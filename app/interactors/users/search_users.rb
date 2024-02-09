# frozen_string_literal: true

module Users
  class SearchUsers
    include Interactor::Organizer

    organize GetUsers, PaginateRecords
  end
end
