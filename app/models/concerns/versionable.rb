# frozen_string_literal: true

module Versionable
  extend ActiveSupport::Concern

  def versions_to_array
    versions.where(event: %w[create update destroy]).reverse.map { |version| version_to_hash version }.reject { |h| h[:changes].blank? }
  end

  def get_version_user(version)
    return nil if version.whodunnit.blank?

    User.find_by id: version.whodunnit
  end

  def version_to_hash(version)
    {
      created_at: version.created_at,
      event: version.event,
      user: get_version_user(version),
      changes: formatted_changes_array(version)
    }
  end

  def formatted_changes_array(version)
    rejectable_attributes = %w[
      id
      created_at
      updated_at
      indexed_full_name
      lat
      lng
      administrative_level_one
      administrative_level_two
      confirmation_token
      confirmation_sent_at
      encrypted_password
      sign_in_count
      last_sign_in_ip
      last_sign_in_at
      current_sign_in_ip
      current_sign_in_at
      confirmed_at
      reset_password_token
      reset_password_sent_at
      updated_by
      created_by
    ]
    formatted_changes = []
    version.changeset.reject { |k| k.in? rejectable_attributes }.each do |k, v|
      next if v.first.blank? && v.second.blank?

      formatted_changes << get_translation(attribute: k, before: v.first, after: v.second)
    end
    formatted_changes.compact
  end

  def translated_attribute(model_name, attribute)
    return attribute if model_name.nil? || attribute.nil?

    I18n.t("active_record.attributes.#{model_name}.#{attribute}")
  end

  def get_translation(attribute: nil, before: nil, after: nil, attr_type: :string)
    return if attribute.nil? || (before.blank? && after.blank?)

    case attr_type
    when :boolean
      return I18n.t('versions.changes.boolean_true', attribute: translated_attribute('user', attribute)) if after

      I18n.t('versions.changes.boolean_false', attribute: translated_attribute('user', attribute))
    when :nullable_boolean
      I18n.t('versions.changes.set', attribute: translated_attribute('user', attribute), after:)
    when :string
      return I18n.t('versions.changes.set', attribute: translated_attribute('user', attribute), after:) if before.blank?

      return I18n.t('versions.changes.remove', attribute: translated_attribute('user', attribute), before:) if after.blank?

      I18n.t('versions.changes.before_after', attribute: translated_attribute('user', attribute), before:, after:)
    end
  end
end
