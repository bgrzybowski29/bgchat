puts 'running seed'
users=User.create(
  {
    username: "ben",
    email:"bgrzybowski@gmail.com",
    password:"benny6",
    firstname: "Ben",
    lastname: "Grzybowski",
    location:"Clarks Summit, PA"
  })
