# frozen_string_literal: true

module Resolvers
  module InvitationFields
    class << self
      def included(child_class)
        child_class.field(:invitation_created_at, Types::DateType, null: true)
        child_class.field(:invitation_sent_at, Types::DateType, null: true)
        child_class.field(:invitation_accepted_at, Types::DateType, null: true)
      end
    end
  end
end
