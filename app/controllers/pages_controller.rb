# frozen_string_literal: true

class PagesController < ApplicationController
  before_action :authenticate_user!, except: [:status]

  def status
    render json: { status: "OK" }, status: :ok
  end

  def react; end
end
