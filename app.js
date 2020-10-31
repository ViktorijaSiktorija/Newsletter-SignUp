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

  const options = {
    method: "POST",
 
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
