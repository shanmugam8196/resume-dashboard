const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const mycon = require('mysql');
const fileupload = require('express-fileupload');

const app = express();
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));
app.use(fileupload());
app.use(express.static('public'));

const c = mycon.createConnection({
    host : "localhost",
    port : "3306",
    user : "root",
    password : "rishe99",
    database : "resume"
});

c.connect(function(error){
    if(error){console.log(error);}
    else{console.log('Database Connected');}
})

app.get('/Checkstatus',(request,response)=>{

    let sql = 'select * from regstatus';

    c.query(sql,(error,result)=>{
        if(error){
            let s = {"status":"error"};
            response.send(s);
        }
        else{
            let status = result[0].regstate;
            let s = {"status":status};
            response.send(s);
        }
    })
})

app.post('/Registration',(request,response)=>{
    let {username,password,name,fathername,date_of_birth,email,phone} = request.body;

    let sql = 'insert into signup(username,password,name,fathername,date_of_birth,email,phone,status) values (?,?,?,?,?,?,?,?)';

    let sql1 = 'update regstatus set regstate=?';

    c.query(sql1,[1],(error1,result1)=>{})

    c.query(sql,[username,password,name,fathername,date_of_birth,email,phone,0],(error,result)=>{
        if(error){
            let s = {"status":"error"};
            response.send(s);
        }
        else{
            let s = {"status":"Registered"};
            response.send(s);
        }
    })

})

app.post('/Signin',(request,response)=>{
    let {username,password} = request.body;
    let sql = 'select * from signup where username=?';

    c.query(sql,[username],(error,result)=>{
        if(error){
            let s = {"status":"error"};
            response.send(s);
        }
        else if(result.length > 0){

            let id = result[0].id;
            let username1 = result[0].username;
            let password1 = result[0].password;
            if(username1 == username && password1 == password){
                let s = {"status":"Success","userid":id};
                response.send(s);
            }
            else{
                let s = {"status":"Invalid"};
                response.send(s);
            }
        }
        else{
            let s ={"status":"final_error"};
            response.send(s);
        }
    })

})

app.get('/View_par_user/:id',(request,response)=>{
    let {id} = request.params;
    let sql = 'select * from signup where id=?';

    c.query(sql,[id],(error,result)=>{
        if(error){
            let s = {"status":"error"};
            response.send(s);
        }
        else{
            let name = result[0].name;
            let s = {"status":name};
            response.send(s);
        }
    })

})

app.get('/Get_userdetails/:id',(request,response)=>{
    let {id} = request.params;
    let sql = 'select * from signup where id=?';

    c.query(sql,[id],(error,result)=>{
        if(error){
            let s = {"status":"error"};
            response.send(s);
        }
        else{
            response.send(result);
        }
    })   
})

app.post('/Add_profilephoto',(request,response)=>{
    let userid = request.body.userid;
    let alt_text = request.body.alt_text;
    let imagefile = request.files.image;
    let filename = imagefile.name;
    let path = __dirname+'/upload/'+imagefile.name;

    let url = 'http://localhost:3000/upload';

    let sql = 'insert into profilephoto(userid,url,filename,alt_text,status)values(?,?,?,?,?)';

    c.query(sql,[userid,url,filename,alt_text,0],(error,result)=>{});

    imagefile.mv(path, function(err) {
        if (err){
          let s = {"status":"error"};
          response.send(s);
        }
        else{
            let s = {"status":"uploaded"};
            response.send(s);
        }
      });

})

app.get('/View_profilephoto/:userid',(request,response)=>{
    let {userid} = request.params;
    let sql = 'select * from profilephoto where userid=?';
    c.query(sql,[userid],(error,result)=>{
        if(error){
            response.send(error);
        }
        else{
            response.send(result);
        }
    })
})



app.listen(3000, ()=>{console.log('Port number running in 3000')});