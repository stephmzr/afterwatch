class AlterDatabaseDefaultCharset < ActiveRecord::Migration[7.0]
  def change
    db_name = ActiveRecord::Base.connection.current_database
    execute "ALTER DATABASE #{db_name} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
  end
end