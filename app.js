const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req,res) => {
    res.sendFile(__dirname + "/signup.html");

  });

app.post("/", (req,res) => {

  const firsName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  const data = {
    members: [
      {
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firsName,
        LNAME: lastName
      }
    }
    ]
  };

  const jsonData = JSON.stringify(data)

  const url = "https://us4.api.mailchimp.com/3.0?lists=f96182e3da&apikey=d2adf23f3e9613108679c6ad94d1388c-us4"
  const options = {
    method: "POST",
    auth: "vika:d2adf23f3e9613108679c6ad94d1388c-us4"
  }

  const request = https.request(url, options, (response) =>{

    if (response.statusCode === 200) {
      res.send('jej');
    } else {
      res.send('eror')
    }


    response.on("data", (data) => {
    console.log(JSON.parse(data));
  })
})
request.write(jsonData);
res.end();
});

app.listen(3000, ()=>{
  console.log("port 3000");
})
