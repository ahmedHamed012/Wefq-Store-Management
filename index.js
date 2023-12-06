var express = require("express");
const app = express();
let mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.set('views', __dirname+'/views');
app.set('view engine','pug');
let url = "mongodb://localhost:27017/wefaq";
const multer = require("multer");
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{cb(null,__dirname+"/public")},
    filename:(req,file,cb)=>{cb(null,'wefaq '+ file.originalname)}
});
const upload = multer({storage:storage});
MongoClient.connect(url,(err,db)=>{
    if(err){console.log("There was an error in connection")}
    else
    {
        console.log("Successful Access to DataBase");
        app.get('/',(req,res)=>{
            res.sendFile(__dirname+"/index.html");
        });
        app.post('/Home',(req,res)=>{
            res.render('user',{username:`${req.body.name}`});
        });
        app.post('/redirect',(req,res)=>{
            if(req.body.redirect === 'add')
            {
                res.render('addProduct',{AdminName:`${req.body.username}`});
            }
            else
            {
            res.render('user',{username:`${req.body.username}`});
            }
        });
        app.post('/Add',(req,res)=>{
            res.render('addProduct',{AdminName:`${req.body.Admin}`})
        });
        app.post('/Add/Success',upload.single("product_Image"),(req,res)=>{
            console.log(req.file);
            var products = db.collection('product');
            products.insert({
            ProductName:`${req.body.productName}`,
            ProductCode:`${req.body.product_Id}`,
            ProductQuantity:`${req.body.product_Quantity}`,
            ProductAddingAdmin:`${req.body.product_Adding_Admin}`,
            ProductAddingTime:`${req.body.product_Adding_Time}`,
            ProductImage: req.file.filename
        }
        ,(err,result)=>{
            if(err)
            {console.log("There was an error in the insertion operation" + ": "+err)}
            else
            {
                console.log("The data inserted successfully");
                res.render('done',{username:`${req.body.product_Adding_Admin}`});
            }
        });
    });
    app.post('/review',async (req,res)=>{
        const data = await db.collection('product').find().toArray();
        let result = JSON.stringify(data);
        res.render('review',{data:result,username:req.body.Admin});
    });
    app.post('/Edit',(req,res)=>{
        res.render('edit');
    });
    app.post('/Edit/result',async(req,res)=>{
        let data = await db.collection('product').find({$or:[{ProductName:`/${req.body.pName}/`},{ProductCode:req.body.pName}]}).toArray();
        let result = JSON.stringify(data);
        res.render('resultsrch',{infos:result});
    });
}});
app.listen(3001);
app.use(express.static(__dirname + '/public'));
app.use(express.static('public'));