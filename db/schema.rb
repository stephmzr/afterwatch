# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2025_06_23_152725) do
  create_table "activities", charset: "utf8mb4", collation: "utf8mb4_unicode_ci", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "activity_type", null: false
    t.integer "tmdb_id", null: false
    t.string "media_type", null: false
    t.text "metadata", size: :long, collation: "utf8mb4_bin"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["activity_type"], name: "index_activities_on_activity_type"
    t.index ["tmdb_id", "media_type"], name: "index_activities_on_tmdb_id_and_media_type"
    t.index ["user_id", "created_at"], name: "index_activities_on_user_id_and_created_at"
    t.index ["user_id"], name: "index_activities_on_user_id"
    t.check_constraint "json_valid(`metadata`)", name: "metadata"
  end

  create_table "jobs_dashboard_job_logs", charset: "utf8mb4", collation: "utf8mb4_unicode_ci", force: :cascade do |t|
    t.string "sidekiq_jid", null: false
    t.string "status"
    t.string "item_type"
    t.text "args", size: :long
    t.boolean "retry", default: false, null: false
    t.string "queue"
    t.text "error_message", size: :long
    t.text "backtrace", size: :long
    t.text "metadata", size: :long
    t.text "logs", size: :long
    t.datetime "finished_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["sidekiq_jid"], name: "index_jobs_dashboard_job_logs_on_sidekiq_jid", unique: true
    t.index ["updated_at"], name: "index_jobs_dashboard_job_logs_on_updated_at"
  end

  create_table "user_ratings", charset: "utf8mb4", collation: "utf8mb4_unicode_ci", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.integer "tmdb_id", null: false
    t.string "media_type", null: false
    t.integer "rating", null: false
    t.text "review"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["rating"], name: "index_user_ratings_on_rating"
    t.index ["tmdb_id", "media_type"], name: "index_user_ratings_on_tmdb_id_and_media_type"
    t.index ["user_id", "tmdb_id", "media_type"], name: "index_user_ratings_on_user_and_media", unique: true
    t.index ["user_id"], name: "index_user_ratings_on_user_id"
  end

  create_table "user_watch_histories", charset: "utf8mb4", collation: "utf8mb4_unicode_ci", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.integer "tmdb_id", null: false
    t.string "media_type", null: false
    t.string "status", null: false
    t.datetime "watched_at", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["status"], name: "index_user_watch_histories_on_status"
    t.index ["tmdb_id", "media_type"], name: "index_user_watch_histories_on_tmdb_id_and_media_type"
    t.index ["user_id", "tmdb_id", "media_type"], name: "index_user_watch_histories_on_user_and_media", unique: true
    t.index ["user_id"], name: "index_user_watch_histories_on_user_id"
  end

  create_table "user_watchlists", charset: "utf8mb4", collation: "utf8mb4_unicode_ci", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.integer "tmdb_id", null: false
    t.string "media_type", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["tmdb_id", "media_type"], name: "index_user_watchlists_on_tmdb_id_and_media_type"
    t.index ["user_id", "tmdb_id", "media_type"], name: "index_user_watchlists_on_user_and_media", unique: true
    t.index ["user_id"], name: "index_user_watchlists_on_user_id"
  end

  create_table "users", charset: "utf8mb4", collation: "utf8mb4_unicode_ci", force: :cascade do |t|
    t.string "first_name", null: false
    t.string "last_name", null: false
    t.string "indexed_full_name", null: false
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.datetime "last_request_at"
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.boolean "active", default: true
    t.integer "created_by"
    t.integer "updated_by"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  create_table "versions", charset: "utf8mb4", force: :cascade do |t|
    t.string "item_type", null: false
    t.bigint "item_id", null: false
    t.string "event", null: false
    t.string "whodunnit"
    t.text "object", size: :long
    t.text "object_changes", size: :long
    t.datetime "created_at"
    t.index ["item_type", "item_id"], name: "index_versions_on_item_type_and_item_id"
  end

  add_foreign_key "activities", "users"
  add_foreign_key "user_ratings", "users"
  add_foreign_key "user_watch_histories", "users"
  add_foreign_key "user_watchlists", "users"
end
