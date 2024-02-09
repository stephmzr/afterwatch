if Rails.env.development?
  Rails.application.config.middleware.insert_before 0, Rack::Cors, debug: false do
    allow do
      origins "*"
      resource '*', headers: :any, methods: [:get, :post, :patch, :put, :delete, :options]
    end
  end
else
  Rails.application.config.middleware.insert_before 0, Rack::Cors, debug: false do
    allow do
      origins { |source, env| true }
      resource '*', headers: :any, methods: [:get, :post, :patch, :put, :delete, :options], credentials: true
    end
  end
end