const mysql = require('mysql');
const inquirer = require('inquirer');
const db = require('./iTunes_db.js');
const signUp = require('./create_account.js');
const login = require('./login.js');
db.connect();

const runApp = () => {
  inquirer.prompt([
    {
      type: "list",
      message: "Would you like to sign up or log in?",
      choices: ["Login", "Create Account"],
      name: "start"
    }
  ]).then(function(signin){
    console.log(signin);
    if(signin.start == "Create Account"){
      signUp();
    }else if(signin.start == "Login"){
      login();
    }
  })
};

runApp();
