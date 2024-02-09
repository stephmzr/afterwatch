# frozen_string_literal: true
# rubocop:disable all

class GetAutocompleteValue
  include Interactor

  MODELS = {
    user: {
      model: 'User',
      allowed_label: [:first_name],
      allowed_value: [:id]
    }
  }.freeze
  ALLOWED_MODELS = MODELS.keys.map(&:to_s)

  def get_autocomplete_path_value(record, model_path)
    r = record
    model_path_split = model_path.split('.')
    model_path_split.each do |path_part|
      r = r.public_send(path_part)
    end
    r
  end

  def get_records(search:, label:)
    return model.camelcase.constantize.all if search.blank?

    model.camelcase.constantize.ransack({
                                          "#{label.gsub('.', '_')}_i_cont": search
                                        }).result
  end

  around do |interactor|
    interactor.call if ALLOWED_MODELS.include?(context.model.to_s)
  end

  def call
    records = []
    context.records = records
    model = context.model.camelcase

    definition = MODELS[context.model.to_sym]
    model = definition[:model] if definition[:model].present?
    label = context.label
    value = context.value
    search = context.search
    limit = context.limit

    return unless definition[:allowed_label].include?(label.to_sym)

    label&.to_sym
    value_accessor = :id
    value_accessor = value.to_sym if definition[:allowed_value].include?(value&.to_sym)

    records = get_records(search:, label:)

    records = records.group(value_accessor) if model.camelcase.constantize.attribute_names.include?(value_accessor.to_s)

    records = records.limit(limit) if limit&.positive?
    records = records.map do |record|
      { value: get_autocomplete_path_value(record, value), label: get_autocomplete_path_value(record, label) }
    end.uniq

    context.records = records
  end
end
