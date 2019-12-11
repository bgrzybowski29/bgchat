BGChat
rails new . --api --database=postgresql
npx create-react-app client

rails g scaffold User username email password_digest firstname lastname location password_reset_token password_reset_sent_at:datetime
rails db:create
rails g controller Authentication
rails g controller password_resets
rails g mailer user_mailer

rails db:migrate
rails db:seed
bundle install
cd client
npm install axios react-router-dom react-bootstrap bootstrap react-burger-menu --save

 

    