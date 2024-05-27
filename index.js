import express from 'express';
import bodyParser from 'body-parser';
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended:true}));

let content = [];
app.get('/',(req,res)=>{
    res.render("index.ejs",{content});
});

app.get('/create',(req,res)=>{
    res.render("create.ejs");
});

app.post('/create',(req,res)=>{  
  req.body.id = content.length;
  content.push(req.body);
  console.log(req.body);
  res.redirect('/');
});

app.get('/content/:id',(req,res)=>{
    let id = req.params.id
    let blogContent = content[id];
    res.render('content.ejs',{content:blogContent});
       
})

app.get('/edit/:id',(req,res)=>{
    let id = req.params.id;
    let blogContent = content[id];
    res.render('edit.ejs',{content:blogContent})
})

app.post('/edit/:id',(req,res)=>{
    content[req.params.id].title = req.body.title;
    content[req.params.id]["text-content"] = req.body["text-content"];
    res.redirect('/');
    
});

app.get('/delete/:id',(req,res)=>{
    let id = parseInt(req.params.id);
    content = content.filter((elem)=>{
    console.log("Id:",id,"Element Id:",elem.id)
    return elem.id!==id;
   })
   console.log(content);
   res.redirect('/');
})

app.listen(port,()=>{
    console.log(`Server running on ${port}`);
});