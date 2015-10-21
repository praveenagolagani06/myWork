var employees = [
    {
        "id" : 1,
        "active" : true,
        "firstName" : "Shulammit",
        "lastName" : "Langer",
        "email" : "s.l@work.com",
        "position" : "President"
    },
    {
        "id" : 2,
        "active" : true,
        "firstName" : "Agne",
        "lastName" : "Herman",
        "email" : "a.h@work.com",
        "position" : "Vice President"
    },
    {
        "id" : 3,
        "active" : true,
        "firstName" : "Leonard",
        "lastName" : "Cracchiolo",
        "email" : "l.c@work.com",
        "position" : "Senior Vice President"
    },
    {
        "id" : 4,
        "active" : true,
        "firstName" : "Gallagher",
        "lastName" : "Atkins",
        "email" : "g.a@work.com",
        "position" : "CEO"
    },
    {
        "id" : 5,
        "active" : true,
        "firstName" : "Marwa",
        "lastName" : "MacLean",
        "email" : "m.m@work.com",
        "position" : "Director"
    },
    {
        "id" : 6,
        "active" : true,
        "firstName" : "Dusan",
        "lastName" : "Saito",
        "email" : "d.s@work.com",
        "position" : "Project Manager"
    },
    {
        "id" : 7,
        "active" : true,
        "firstName" : "Desislav",
        "lastName" : "Herceg",
        "email" : "d.h@work.com",
        "position" : "Business Analyst"
    },
    {
        "id" : 8,
        "active" : true,
        "firstName" : "Rotem",
        "lastName" : "Paredes",
        "email" : "r.p@work.com",
        "position" : "Lead Developer"
    },
    {
        "id" : 9,
        "active" : true,
        "firstName" : "Elspet",
        "lastName" : "Error",
        "email" : "e.e@work.com",
        "position" : "Backend Developer"
    },
    {
        "id" : 10,
        "active" : true,
        "firstName" : "Anupama",
        "lastName" : "Developer",
        "email" : "a.d@work.com",
        "position" : "UI Developer"
    }
];

var express = require('express')
  , http = require('http')
  , path = require('path')
  , bodyParser = require('body-parser');

var app = express();

var clientDir = path.join(__dirname, '../client')

app.set('port', process.env.PORT || 3000)
app.use(express.static(clientDir))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', function(req, res) {
    res.sendfile(path.join(clientDir, 'index.html'))
})

app.get('/allEmps', function(req, res) {
    res.json(employees);
})

app.post('/addEmp', function(req, res) {
    var newEmp = req.body;
    newEmp.id = employees.length +1;
    newEmp.active = true;
    employees.push(newEmp);
    console.log("Added New Employee: \n" + newEmp);
    res.json(employees);
})

app.post('/delEmp', function(req, res) {
    
    //Can be done in a better way. I am keeping this simple as the array size is small here
    for(var i=0; i<employees.length; i++){
        if(employees[i].id == req.body.id){
            employees[i].active = false;
            console.log("Deleted Employee: " + employees[i].firstName + " " + employees[i].lastName);
            break;
        }
    }
    res.json(employees);
})

app.post('/editEmp', function(req, res) {
    
    //Can be done in a better way. I am keeping this simple as the array size is small here
    for(var i=0; i<employees.length; i++){
        var oldEmp = req.body;
        if(employees[i].id == oldEmp.id){
            employees[i].firstName = oldEmp.firstName;
            employees[i].lastName = oldEmp.lastName;
            employees[i].email = oldEmp.email;
            employees[i].position = oldEmp.position;
            console.log("Edited Employee: " + oldEmp.firstName + " " + oldEmp.lastName);
            break;
        }
    }
    
    res.json(employees);
})

var server = http.createServer(app);

server.listen(app.get('port'), function(){
    console.log("Web server listening on localhost:" + app.get('port'))
});

//console.log(employees);