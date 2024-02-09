module Users
  class CreateUser
    include Interactor

    around do |interactor|
      if context.attributes && context.creator
        interactor.call
      else
        context.fail!(message: 'Missing mandatory arguments')
      end
    end

    def call
      attributes = context.attributes
      creator = context.creator

      user = ::User.new(attributes)
      password = SecureRandom.hex(20)
      user.password = password
      user.password_confirmation = password
      user.current_user = creator
      user.save!

      context.user = user
    end
  end
end
