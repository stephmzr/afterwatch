class CreateUserWatchHistories < ActiveRecord::Migration[7.0]
  def change
    create_table :user_watch_histories do |t|
      t.references :user, null: false, foreign_key: true
      t.integer :tmdb_id, null: false
      t.string :media_type, null: false
      t.string :status, null: false
      t.datetime :watched_at, null: false

      t.timestamps
    end
    
    add_index :user_watch_histories, [:user_id, :tmdb_id, :media_type], unique: true, name: 'index_user_watch_histories_on_user_and_media'
    add_index :user_watch_histories, [:tmdb_id, :media_type]
    add_index :user_watch_histories, :status
  end
end
