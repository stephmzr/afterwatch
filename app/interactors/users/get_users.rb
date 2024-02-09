# frozen_string_literal: true

module Users
  class GetUsers
    include Interactor

    def call
      scope = context.scope || ::User.all
      search = context.search || {}
      users = scope.order(created_at: :desc).ransack(search).result
      context.records = users
    end
  end
end
