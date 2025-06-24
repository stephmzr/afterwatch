class CreateActivities < ActiveRecord::Migration[7.0]
  def change
    create_table :activities do |t|
      t.references :user, null: false, foreign_key: true
      t.string :activity_type, null: false
      t.integer :tmdb_id, null: false
      t.string :media_type, null: false
      t.json :metadata

      t.timestamps
    end
    
    add_index :activities, [:user_id, :created_at], order: { created_at: :desc }
    add_index :activities, [:tmdb_id, :media_type]
    add_index :activities, :activity_type
  end
end
