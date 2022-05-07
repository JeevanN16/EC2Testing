const express = require("express");
const app = express();
const connection = require('./Database')
app.use(express.json());

app.post("/user", async (req, res) => {
    try{
        const {email, password, confirmPassword}= req.body;
        const value = [email, password, confirmPassword];
        if (!email && !password && !confirmPassword) {
            return res.status(400).send({success:false, message:'All feilds are required'});
        }
        else if(email.indexOf('@')== -1)
        {
            return res.status(400).send({success:false, message:'Invalid email'});
        }
        else if( password != confirmPassword)
        {
            return res.status(400).send({success:false, message:'Password Mismatch'});
        }

        let query = `INSERT INTO user_info(email, password, confirmPassword)  VALUES(?,?,?)`
        const user = connection.query(query ,value,(err, result)=>{
            if(err)
            return res.status(400).send(err.message)
        return res.status(200).send({success:true, message:'successfully Inserted'})
        })
    }
    catch(err)
    {
        return res.status(400).send(err.message)
    }
});

 
app.get("/user", async (req, res) => {
    try{
        let query = `SELECT email ,password FROM user_info`
        const user = connection.query(query ,(err, result)=>{
            if(err)
              return res.status(400).send(err.message)
        return res.status(200).send({success:true, message:result})
        })
    }
    catch(err)
    {
        return res.status(400).send(err.message)
    }
  
});
connection.connect((err) => {
    var server = app.listen(3000, 'localhost', function() {
        var host = server.address().address
        var port = server.address().port
        console.log("Example app listening at http://%s:%s", host, port)
    })
})


