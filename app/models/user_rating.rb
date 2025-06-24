# frozen_string_literal: true

# == Schema Information
#
# Table name: user_ratings
#
#  id         :bigint           not null, primary key
#  user_id    :bigint           not null
#  tmdb_id    :integer          not null
#  media_type :string           not null
#  rating     :integer          not null
#  review     :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class UserRating < ApplicationRecord
  include AuditableConcern

  belongs_to :user

  validates :tmdb_id, presence: true, numericality: { only_integer: true, greater_than: 0 }
  validates :media_type, presence: true, inclusion: { in: %w[movie tv] }
  validates :rating, presence: true, numericality: { only_integer: true, greater_than: 0, less_than_or_equal_to: 10 }
  validates :tmdb_id, uniqueness: { scope: [:user_id, :media_type] }

  def self.ransackable_attributes(auth_object = nil)
    %w[tmdb_id media_type rating created_at]
  end

  def self.ransackable_associations(auth_object = nil)
    %w[user]
  end
end 