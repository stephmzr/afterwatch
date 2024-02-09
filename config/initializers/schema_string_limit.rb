require 'active_record/connection_adapters/abstract_mysql_adapter.rb'

ActiveRecord::ConnectionAdapters::AbstractMysqlAdapter::NATIVE_DATABASE_TYPES[:string] = {
  name: 'varchar',
  limit: 191
}