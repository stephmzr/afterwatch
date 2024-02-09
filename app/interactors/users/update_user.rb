# frozen_string_literal: true

module Users
  class UpdateUser
    include Interactor

    def call
      attributes = context.attributes
      user = context.user
      user.attributes = attributes
      user.save!
      context.user = user
    end
  end
end
