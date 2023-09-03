FROM node:lts-alpine
WORKDIR /app
RUN apk update

RUN apk add autoconf 

RUN apk add build-base 
RUN apk add curl-dev 
RUN apk add icu-dev 

RUN apk add ruby
RUN apk add ruby-dev


RUN npm install -g grunt-cli
RUN gem install sass scss_lint



