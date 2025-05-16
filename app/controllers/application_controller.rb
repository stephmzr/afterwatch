# frozen_string_literal: true

class ApplicationController < ActionController::Base
  layout :layout_by_resource

  before_action :authenticate_user!
  before_action :set_whodunnit
  before_action :tag_app_signal
  skip_forgery_protection

  private

  def authenticate_user!(opts = {})
    return true if Rails.env.development? && params[:skip_auth].present?

    super(opts)
    # last_request_at = Time.zone.now
    # current_user.update(last_request_at:)
  end

  def set_whodunnit
    PaperTrail.request.whodunnit = current_user.id if current_user
  end

  def current_user
    if Rails.env.development? && params[:skip_auth].present?
      @current_user = User.first
      return @current_user
    end

    @current_user = super
    @current_user
  end

  def tag_app_signal
    Appsignal.tag_request(
      user: current_user&.email
    )
  end

  def layout_by_resource
    if devise_controller?
      'devise'
    else
      'application'
    end
  end
end
