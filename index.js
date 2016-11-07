import express from 'express';
import fetch from 'isomorphic-fetch';
import _ from 'lodash'

const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(req, res) {
  // Handle the get for this route

  /*let string = '';
  const hasDigits = req.query.fullname.search( /[\d-_/]/i );
  
  const [firstName, middleName, lastName, ...rest] = req.query.fullname.split(" ");
  if ( rest.length > 0  || !firstName || hasDigits != -1 )
  {
    string = 'Invalid fullname';
  }
  else if ( firstName  && middleName &&  lastName )
  {
    const stringFirstName = firstName.charAt(0);
    const stringMiddleName = middleName.charAt(0);
    string = `${lastName} ${stringFirstName}. ${stringMiddleName}.`;
  }
  else if ( firstName  &&  middleName  &&  !lastName )
  {
    const stringFirstName = firstName.charAt(0);
    string = `${middleName} ${stringFirstName}.`;
  }
  else
  {
    string = `${firstName}`;
  }
  res.send(string);*/

  const str = req.query.fullname;
  const reg = /(\s+)?([^\s]+)?(\s+)?([^\s]+)?(\s+)?([^\s]+)?(\s+)?/i;
  const fullName = str.match(reg);
  const hasDigits = req.query.fullname.search( /[\d-_/]/i );
  let string = '';

  if ( fullName[2] == null  || fullName[7] != null || hasDigits != -1 )
  {
    string = 'Invalid fullname';
  }
  else if ( fullName[2] != null  && fullName[4] != null &&  fullName[6] != null )
  {
    let lastName = fullName[6].toLowerCase();
    lastName = lastName.replace(lastName.charAt(0), lastName.charAt(0).toUpperCase());
    let firstName = fullName[2].charAt(0).toLowerCase();
    firstName = firstName.replace(firstName, firstName.toUpperCase());
    let middleName = fullName[4].charAt(0).toLowerCase();
    middleName = middleName.replace(middleName, middleName.toUpperCase());
    string = `${lastName} ${firstName}. ${middleName}.`;
  }
  else if ( fullName[2] != null  && fullName[4] != null &&  fullName[6] == null )
  {
    let firstName = fullName[2].charAt(0).toLowerCase();
    firstName = firstName.replace(firstName, firstName.toUpperCase());
    let lastName = fullName[4].toLowerCase();
    lastName = lastName.replace(lastName.charAt(0), lastName.charAt(0).toUpperCase());
    string = `${lastName} ${firstName}.`;
  }
  else
  {
    let lastName = fullName[2].toLowerCase();
    lastName = lastName.replace(lastName.charAt(0), lastName.charAt(0).toUpperCase());
    string = `${lastName}`;
  }

  res.send(string);


});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});