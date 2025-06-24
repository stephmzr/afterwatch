# frozen_string_literal: true

# == Schema Information
#
# Table name: user_watchlists
#
#  id         :bigint           not null, primary key
#  user_id    :bigint           not null
#  tmdb_id    :integer          not null
#  media_type :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class UserWatchlist < ApplicationRecord
  include AuditableConcern

  belongs_to :user

  validates :tmdb_id, presence: true, numericality: { only_integer: true, greater_than: 0 }
  validates :media_type, presence: true, inclusion: { in: %w[movie tv] }
  validates :tmdb_id, uniqueness: { scope: [:user_id, :media_type] }

  def self.ransackable_attributes(auth_object = nil)
    %w[tmdb_id media_type created_at]
  end

  def self.ransackable_associations(auth_object = nil)
    %w[user]
  end
end 