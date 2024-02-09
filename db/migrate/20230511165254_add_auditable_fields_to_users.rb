class AddAuditableFieldsToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :created_by, :integer, after: :active
    add_column :users, :updated_by, :integer, after: :created_by
    
  end
end
