# frozen_string_literal: true
# rubocop:disable all

class SortRecords
  include Interactor

  around do |interactor|
    interactor.call if context.records
  end

  def call
    sort = context.sort_params || {}
    # createdAt is the default key to order on all activerecord model
    sort = {
      field: 'created_at',
      order: 'descend'
    }.with_indifferent_access.merge(sort)

    context.field = sort[:field]
    context.order = sort[:order]

    records = context.records
    # Get the model klass of the first record
    record_klass = records.first.class
    column = sort[:field].underscore
    return unless record_klass.respond_to?(:authorized_sort_keys) && record_klass.authorized_sort_keys.include?(column.gsub('//', ''))

    order = %w[descend desc].include?(sort[:order]) ? 'desc' : 'asc'

    # Prefix with tables if no point is found (allow to find join)
    collection_name = records.first.model_name.collection
    column = column.include?('.') || column.include?('//') ? column.gsub('//', '') : "#{collection_name}.#{column}"

    records = records.order("#{column} #{order}")

    # set the ordered records in context
    context.records = records
  end
end
