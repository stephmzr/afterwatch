class CreateUserWatchlists < ActiveRecord::Migration[7.0]
  def change
    create_table :user_watchlists do |t|
      t.references :user, null: false, foreign_key: true
      t.integer :tmdb_id, null: false
      t.string :media_type, null: false

      t.timestamps
    end
    
    add_index :user_watchlists, [:user_id, :tmdb_id, :media_type], unique: true, name: 'index_user_watchlists_on_user_and_media'
    add_index :user_watchlists, [:tmdb_id, :media_type]
  end
end
