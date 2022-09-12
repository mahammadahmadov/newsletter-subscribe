const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const client = require("mailchimp-marketing");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.listen(3000, ()=>{
  console.log("server started on 3000");
})

app.get("/", (req, res)=>{
  res.sendFile(__dirname + "/signup.html")
});

app.post("/failure", (req, res)=>{
  res.redirect("/");
})

app.post("/", (req, res)=>{
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;

  client.setConfig({
  apiKey: "f1d1103caa180c2083ae4480d86a92c8-us17",
  server: "us17",
});

const run = async () => {
  const response = await client.lists.batchListMembers("62dd47dccb", {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }],
  });
  console.log(response);
};

run();

console.log(res.statusCode);

if (res.statusCode === 200){
  res.sendFile(__dirname + "/success.html");
} else {
  res.sendFile(__dirname + "/failure.html");
}

})


// 62dd47dccb
