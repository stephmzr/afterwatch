# frozen_string_literal: true

class GraphqlController < ApplicationController
  before_action :authenticate_user!
  # If accessing from outside this domain, nullify the session
  # This allows for outside API access while preventing CSRF attacks,
  # but you'll have to authenticate your user separately
  # protect_from_forgery with: :null_session
  skip_forgery_protection

  def execute
    variables = prepare_variables(params[:variables])
    query = params[:query]
    operation_name = params[:operationName]
    context = {
      current_user:
    }
    result = MyApplicationSchema.execute(query, variables:, context:, operation_name:)
    render json: result
  rescue CanCan::AccessDenied => e # context[:current_user].authorize! raises a CanCan::AccessDenied error when current_user cannot access the requested ressource
    render json: { error: e.message }, status: :forbidden
  rescue StandardError => e
    Appsignal.set_error(e)
    raise e unless Rails.env.development?

    handle_error_in_development(e)
  ensure
    Appsignal::Transaction.current.set_namespace('graphql')
    Appsignal::Transaction.current.set_action(params['operationName'] || 'Unknown')
  end

  private

  # Handle variables in form data, JSON body, or a blank value
  def prepare_variables(variables_param)
    case variables_param
    when String
      if variables_param.present?
        JSON.parse(variables_param) || {}
      else
        {}
      end
    when Hash
      variables_param
    when ActionController::Parameters
      variables_param.to_unsafe_hash # GraphQL-Ruby will validate name and type of incoming variables.
    when nil
      {}
    else
      raise ArgumentError, "Unexpected parameter: #{variables_param}"
    end
  end

  def handle_error_in_development(error)
    logger.error error.message
    logger.error error.backtrace.join("\n")

    render json: { errors: [{ message: error.message, backtrace: error.backtrace }], data: {} }, status: :internal_server_error
  end
end
