const inquirer = require('inquirer')
const db = require('./iTunes_db.js');


const signUp = (runApp) => {
  inquirer.prompt([
    {
      type: "input",
      message: "Please create username",
      name: "username"
    },
    {
      type: "input",
      message: "Please create password",
      name: "password"
    }
  ]).then(function(newUser){
    console.log(newUser);

    let addUser = "INSERT INTO users (user_name, password) VALUES ";
    addUser += "('"+newUser.username+"',";
    addUser += "'"+newUser.password+"')";

    // const usernameCheck = "SELECT user_name FROM users WHERE user_name= ";
    // usernameCheck += "'"+newUser.username+"'";

    if(newUser.username != '' && newUser.password != ''){
      if(newUser.username != '' || newUser.password != ''){
        db.query(addUser, function(err, data){
          try{
            if(err){
              throw new Error(err)
            }
            console.log("Successfully Created an Account");
          }catch(e){
            console.log("Error");
            console.log(e);
          }finally{
            db.end();
          }
        })
      }
    }else{
      console.log("Please Enter Valid Username or Password")
      signUp();
    }
  })
}



module.exports = signUp;
