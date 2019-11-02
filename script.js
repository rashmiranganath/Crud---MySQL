var http = require("http");
var express = require('express');
var app = express();
var mysql      = require('mysql');
var bodyParser = require('body-parser');

var connection = mysql.createConnection({
    // properties...
    host : 'localhost',
    user : 'root',
    password : 'navgurukul',
    database : 'sampledb'
});

connection.connect(function(error){
    if (error) throw error
  console.log('You are now connected...')
});

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));


//rest api to get all results
app.get('/get', function (req, res) {
  // console.log(req);
  connection.query('SELECT * from employee', function (error, results) {
   if (error) throw error;
    res.send(JSON.stringify(results,null,2));
 });
});



// rest api to create a new record into mysql database
app.post('/create', function (req, res) {
  var params  = req.body;
  console.log(params);
  connection.query('INSERT INTO employee SET ?', params, function (error, results) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});




//rest api to get a single employee data
app.get('/get/:id', function (req, res) {
  connection.query('select * from employee where id=?', [req.params.id], function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});


// rest api to update record into mysql database
app.put('/update/:id', function (req, res) { 
  connection.query('UPDATE `employee` SET `employee_name`=?,`employee_salary`=?,`employee_salary`=? WHERE `id`=?', [req.body.employee_name,req.body.employee_salary, req.body.employee_age,req.params.id], function (error, results) {
    if (error) throw error;
   res.send(JSON.stringify(results,null,2));
 });
});




// rest api to delete record from mysql database
app.delete('/delete/:id', function (req, res) {
  // console.log(req.body);
  connection.query('DELETE FROM employee WHERE id=?',[req.params.id] ,function (error, results) {
   if (error) throw error;
   res.end('Record has been deleted!');
 });
});




app.listen(3000, () => {
  console.log("Server is listening on port 3000")
});