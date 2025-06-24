# frozen_string_literal: true

# == Schema Information
#
# Table name: activities
#
#  id            :bigint           not null, primary key
#  user_id       :bigint           not null
#  activity_type :string           not null
#  tmdb_id       :integer          not null
#  media_type    :string           not null
#  metadata      :json
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
class Activity < ApplicationRecord
  include AuditableConcern

  belongs_to :user
  
  serialize :metadata, JSON

  validates :activity_type, presence: true, inclusion: { in: %w[rating watchlist] }
  validates :tmdb_id, presence: true, numericality: { only_integer: true, greater_than: 0 }
  validates :media_type, presence: true, inclusion: { in: %w[movie tv] }

  scope :recent, -> { order(created_at: :desc) }
  scope :by_type, ->(type) { where(activity_type: type) }
  scope :by_media_type, ->(media_type) { where(media_type: media_type) }

  def self.ransackable_attributes(_auth_object = nil)
    %w[activity_type tmdb_id media_type created_at]
  end

  def self.ransackable_associations(_auth_object = nil)
    %w[user]
  end
end 