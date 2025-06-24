class CreateUserRatings < ActiveRecord::Migration[7.0]
  def change
    create_table :user_ratings do |t|
      t.references :user, null: false, foreign_key: true
      t.integer :tmdb_id, null: false
      t.string :media_type, null: false
      t.integer :rating, null: false
      t.text :review

      t.timestamps
    end
    
    add_index :user_ratings, [:user_id, :tmdb_id, :media_type], unique: true, name: 'index_user_ratings_on_user_and_media'
    add_index :user_ratings, [:tmdb_id, :media_type]
    add_index :user_ratings, :rating
  end
end
