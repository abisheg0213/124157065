const express = require("express");
const bodyParser = require("body-parser");
const axios=require('axios')
app = express();
app.listen(3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const postdata={
    "companyName":"Train abi",
    "clientID":"746a71fa-ed2a-4fe5-a6fb-0b5b51e1eb07",
    "ownerName":"Abisheg",
    "ownerEmail":"124157065@sastra.ac.in",
    "rollNo":"124157065",
    "clientSecret":"jlukZATrEMNryGcb"
    }
let yp
function get_token()
{
    axios.post('http://20.244.56.144/train/auth',postdata).then((res)=>
    {
        let token_id=res.data.access_token
    })
}
get_token()
app.get("/trains",function(req,response)
{
    axios.post('http://20.244.56.144/train/auth',postdata).then((res)=>
    {
        let token_id=res.data.access_token
        const config = {
            headers: { Authorization: `Bearer ${token_id}` },
          };
          axios.get("http://20.244.56.144/train/trains", config).then((res)=>
          {
            response.send(res.data)
          });
        });
    })
app.get("/trains/:tno",function(req,response){
    console.log(req.params.tno)
    axios.post('http://20.244.56.144/train/auth',postdata).then((res)=>
    {
        let token_id=res.data.access_token
        const config = {
            headers: { Authorization: `Bearer ${token_id}` },
          };
          axios.get("http://20.244.56.144:80/train/trains/"+req.params.tno, config).then((res)=>
          {
            response.send(res.data)
          });
        });
})