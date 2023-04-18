//jshint esversion:6

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const https = require('https');
const request = require("requests")


app.use(bodyParser.urlencoded({extended: true}));  // to parse data from the forms.
app.use(express.static("public"))                  // to set up folder to serve static files


app.get('/', (req, res) => {

    res.sendFile(__dirname + "/index.html");
    
})

app.post('/', (req, res) => {
    
    var firstName = req.body.fname;
    var lastName = req.body.lname;
    var email = req.body.email;
    
    const data = {
        members:[
            {
                email_address:email,
                status: "subscribed",
                merge_fields:{
                    FNAME: firstName,
                    LNAME: lastName
                } 
            }
        ]
    }

    const jsonData = JSON.stringify(data);

    const url = 'https://us14.api.mailchimp.com/3.0/lists/021a135d8d'

    const options = {
        method: "POST",
        auth: 'NewsletterSignUp:8b92a8d6d3e26bbaebf965e091fa1acf-us14'
    }

    const request = https.request(url, options, (response) => {

        if (response.statusCode === 200){
            res.send("<h1>Successfully Subscribed.</h1>")
        }

        // response.on("data", (data) => {
        //     console.log(JSON.parse(data));
        // })
    } )

    request.write(jsonData);
    request.end();
});
    

app.get('/msd', (req, res) => {
    res.sendFile(__dirname + "/html/msd.html")
});

app.get('/mrb', (req, res) => {
    res.sendFile(__dirname + "/html/mrb.html")
});





app.listen(3000, () => {
    console.log(`Server Started on port 3000 `)
});