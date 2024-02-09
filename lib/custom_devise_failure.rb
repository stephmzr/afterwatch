# frozen_string_literal: true

class CustomDeviseFailure < Devise::FailureApp
  def respond
    if request.format.html?
      redirect
    else
      http_auth
    end
  end
end
