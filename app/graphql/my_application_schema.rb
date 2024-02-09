# frozen_string_literal: true

class MyApplicationSchema < GraphQL::Schema
  mutation(Types::MutationType)
  query(Types::QueryType)

  # For batch-loading (see https://graphql-ruby.org/dataloader/overview.html)
  use GraphQL::Dataloader

  disable_introspection_entry_points unless Rails.env.development?
  max_complexity 100
  max_depth 7

  # GraphQL-Ruby calls this when something goes wrong while running a query:

  # Union and Interface Resolution
  def self.resolve_type(abstract_type, obj, ctx)
    # TODO: Implement this method
    # to return the correct GraphQL object type for `obj`
    raise(GraphQL::RequiredImplementationMissingError)
  end

  # rescue ActiveRecord::RecordNotFound exception
  rescue_from(ActiveRecord::RecordNotFound) do |err, _obj, _args, _ctx, _field|
    raise GraphQL::ExecutionError, err
  end
  rescue_from(ActiveRecord::RecordInvalid) do |err, _obj, _args, _ctx, _field|
    raise GraphQL::ExecutionError, err
  end

  # Relay-style Object Identification:

  # Return a string UUID for `object`
  def self.id_from_object(object, type_definition, query_ctx)
    # For example, use Rails' GlobalID library (https://github.com/rails/globalid):
    object_id = object.to_global_id.to_s
    # Remove this redundant prefix to make IDs shorter:
    object_id = object_id.sub("gid://#{GlobalID.app}/", '')
    encoded_id = Base64.urlsafe_encode64(object_id)
    # Remove the "=" padding
    encoded_id = encoded_id.sub(/=+/, '')
    # Add a type hint
    type_hint = type_definition.graphql_name.first
    "#{type_hint}_#{encoded_id}"
  end

  # Given a string UUID, find the object
  def self.object_from_id(encoded_id_with_hint, query_ctx)
    # For example, use Rails' GlobalID library (https://github.com/rails/globalid):
    # Split off the type hint
    _type_hint, encoded_id = encoded_id_with_hint.split('_', 2)
    # Decode the ID
    id = Base64.urlsafe_decode64(encoded_id)
    # Rebuild it for Rails then find the object:
    full_global_id = "gid://#{GlobalID.app}/#{id}"
    GlobalID::Locator.locate(full_global_id)
  end
end
