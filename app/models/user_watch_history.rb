# frozen_string_literal: true

# == Schema Information
#
# Table name: user_watch_histories
#
#  id         :bigint           not null, primary key
#  user_id    :bigint           not null
#  tmdb_id    :integer          not null
#  media_type :string           not null
#  status     :string           not null
#  watched_at :datetime         not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class UserWatchHistory < ApplicationRecord
  include AuditableConcern

  belongs_to :user

  validates :tmdb_id, presence: true, numericality: { only_integer: true, greater_than: 0 }
  validates :media_type, presence: true, inclusion: { in: %w[movie tv] }
  validates :status, presence: true, inclusion: { in: %w[watched watching completed] }
  validates :watched_at, presence: true
  validates :tmdb_id, uniqueness: { scope: [:user_id, :media_type] }

  def self.ransackable_attributes(auth_object = nil)
    %w[tmdb_id media_type status watched_at created_at]
  end

  def self.ransackable_associations(auth_object = nil)
    %w[user]
  end
end 