const inquirer = require('inquirer')
const db = require('./iTunes_db.js');

const account = require('./account.js');

const login = function(runApp, accountUser){
  inquirer.prompt([
    {
      type: "input",
      message: "Please Enter Username",
      name: "username"
    },
    {
      type: "input",
      message: "Please Enter Password",
      name: "password"
    }
  ]).then(function(loginInfo){
    // console.log(loginInfo);
    // console.log("success");

    let query = "SELECT * FROM users WHERE user_name= ";
    query += "'"+loginInfo.username+"'";

    db.query(query, function(err, data){
      // try{
      //   if(err){
      //     throw new Error(err);
      //   }
        if(data.length > 0){
          const user = data[0];
          if(user.password == loginInfo.password){
            console.log("Success");
            account(user);
          }else{
            console.log("Please Enter Correct Password");
            login();
          }
        }else{
          console.log("User Not Found");
          login();
        }
      // }catch(e){
      //   console.log("Error");
      //   console.log(e);
      // }finally{
      //   db.end();
      // }
    })
  })
}

module.exports = login;
