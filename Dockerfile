FROM ruby:3.1.1

RUN apt-get update -qq && apt-get install -y build-essential libpq-dev

# updating nodejs
# RUN set -uex \
#   && apt-get update \
#   && apt-get install -y ca-certificates curl gnupg \
#   && mkdir -p /etc/apt/keyrings \
#   && curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key \
#   | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg \
#   && NODE_MAJOR=18 \
#   && echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" \
#   | tee /etc/apt/sources.list.d/nodesource.list \
#   && apt-get update \
#   && apt-get install nodejs -y;

# RUN npm install -g yarn

WORKDIR /app

COPY Gemfile /app/Gemfile
COPY . /app

ENV COBERTURA_REPORT=true
ENV VITE_RUBY_SKIP_COMPATIBILITY_CHECK=true

RUN gem install bundler -v 2.5.3
RUN gem uninstall libv8-node
RUN bundle lock --add-platform x86_64-linux
RUN gem update --system
RUN bundle install

# RUN yarn install

EXPOSE 3002
