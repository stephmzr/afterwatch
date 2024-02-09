# frozen_string_literal: true
# rubocop:disable all

module AuditableConcern
  extend ActiveSupport::Concern
  included do
    attr_accessor :current_user

    belongs_to :creator, foreign_key: 'created_by', class_name: 'User', optional: true
    belongs_to :updator, foreign_key: 'updated_by', class_name: 'User', optional: true
    before_create :set_created_by, if: proc { |record| record.current_user }
    before_update :set_updated_by, if: proc { |record| record.current_user }

    private

    def set_created_by
      self.creator = current_user
      self.updator = current_user
    end

    def set_updated_by
      self.updator = current_user
    end
  end
end
