class AddLogsAndMetadataToJobsDashboardJobLogs < ActiveRecord::Migration[7.0]
  def change
    add_column :jobs_dashboard_job_logs, :logs, :text, limit: 4294967295, after: :backtrace
    add_column :jobs_dashboard_job_logs, :metadata, :text, limit: 4294967295, after: :backtrace
  end
end
