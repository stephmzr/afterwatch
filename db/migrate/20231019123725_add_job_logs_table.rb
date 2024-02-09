class AddJobLogsTable < ActiveRecord::Migration[7.0]
  def change
    create_table :jobs_dashboard_job_logs do |t|
      t.string :sidekiq_jid, :null => false
      t.string :status
      t.string :item_type
      t.text :args, limit: 4294967295
      t.boolean :retry, null: false, default: false
      t.string :queue
      t.text :error_message, limit: 4294967295
      t.text :backtrace, limit: 4294967295
      t.datetime :finished_at
      t.timestamps
    end

    add_index :jobs_dashboard_job_logs, :sidekiq_jid, :unique => true
    add_index :jobs_dashboard_job_logs, :updated_at
  end
end
