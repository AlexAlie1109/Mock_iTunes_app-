const inquirer = require('inquirer')
const db = require('./iTunes_db.js');

const login = require('./login.js');

const account = () => {
  inquirer.prompt([
    {
      type: "list",
      message: "Would you like to...",
      choices: ['Available Music','View Songs', 'Add Song', 'Sign Out'],
      name: "accountOptions"
    }
  ]).then(function(profile){
    if(profile.accountOptions == 'Available Music'){
      console.log("Available Music")
    }else if(profile.accountOptions == 'View Songs'){
      console.log("View Songs")
    }else if(profile.accountOptons == 'Add Song'){
      console.log("Adding Songs")
    }else if(profile.accountOptions == 'Sign Out'){
      login();
    }
  })
}

module.exports = account;
