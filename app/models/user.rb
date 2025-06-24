# frozen_string_literal: true

# == Schema Information
#
# Table name: users
#
#  id                     :bigint           not null, primary key
#  first_name             :string(191)      not null
#  last_name              :string(191)      not null
#  indexed_full_name      :string(191)      not null
#  provider               :string(32)
#  string                 :string(32)
#  email                  :string(191)      default(""), not null
#  encrypted_password     :string(191)      default(""), not null
#  last_request_at        :datetime
#  reset_password_token   :string(191)
#  reset_password_sent_at :datetime
#  remember_created_at    :datetime
#  sign_in_count          :integer          default(0), not null
#  current_sign_in_at     :datetime
#  last_sign_in_at        :datetime
#  current_sign_in_ip     :string(191)
#  last_sign_in_ip        :string(191)
#  active                 :boolean          default(TRUE)
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#
class User < ApplicationRecord
  include AuditableConcern

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable

  devise :database_authenticatable, :rememberable, :validatable, :trackable

  # Associations for user activities
  has_many :user_watchlists, dependent: :destroy
  has_many :user_ratings, dependent: :destroy
  has_many :activities, dependent: :destroy

  strip_attributes only: %i[email first_name last_name]

  validates :email, presence: true, uniqueness: true, format: { with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/, message: I18n.t('active_record.attributes.user.errors.valid_email') }
  validates :first_name, :last_name, presence: true, length: { maximum: 191 }
  validates :active, inclusion: { in: [true, false] }

  before_save :set_indexed_full_name

  def self.ransackable_attributes(auth_object = nil)
    return [
      "indexed_full_name"
    ]
  end

  def ability
    @ability ||= Ability.new(self)
  end
  delegate :can?, :cannot?, to: :ability

  def authorize!(action, subject, attribute = nil, *extra_args)
    return true if can?(action, subject, attribute, extra_args)

    raise CanCan::AccessDenied, 'Access denied'
  end

  def full_name
    full_name_arr = []
    full_name_arr.push(first_name || '', last_name)
    full_name_arr.compact.join(' ')
  end

  def active_for_authentication?
    super && active?
  end

  def self.accessible_by_user(_user)
    all
  end

  private

  def set_indexed_full_name
    self.indexed_full_name = [first_name, last_name].sort.join(' ').parameterize(separator: ' ').to_s
  end
end
