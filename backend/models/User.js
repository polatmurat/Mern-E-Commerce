// ./models/User.js
class User {
    constructor(name, email, password, admin) {
      this.name = name;
      this.email = email;
      this.password = password;
      this.admin = admin;
    }
  }
  
  module.exports = User;
  