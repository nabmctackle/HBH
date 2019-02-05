var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const saltRounds = 10;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 
var mongoose = require('mongoose');
var path= require('path');
mongoose.connect('mongodb://localhost/IOZ');
app.use(express.static(__dirname+"/angular-app/dist/angular-app"))
var session = require('express-session')
app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 600000 }
  }))
mongoose.Promise = global.Promise;
var bcrypt = require("bcrypt")
var Rx = require('rxjs')
var ObjectId = mongoose.Schema.Types.ObjectId

var MapSchema = new mongoose.Schema({
    img:        {type:String, required:[true,"Img required"], minlength:2},
    location:   {type:String, required:[true," Location title required"]},
})
mongoose.model("Map", MapSchema);
var Map = mongoose.model('Map')

////////////////////////////////////////////////////////////////////////////


var BeastSchema =  new mongoose.Schema({
    title:              {type:String},
    size:               {type:String},
    alignment:          {type:String},
    ac:                 {type:Number},
    hp:                 {type:String},
    speed:              {type:String},
    str:                {type:Number},
    dex:                {type:Number},
    con:                {type:Number},
    int:                {type:Number},
    wis:                {type:Number},
    cha:                {type:Number},
    skills:             {type:[String]},
    damageimmunities:   {type:[String]},
    senses:             {type:[String]},
    languages:          {type:[String]},
    cr:                 {type:Number},
    abilities:          {type:[String]},
    actions:            {type:[String]},
    description:        {type:String},
    links:              {type:Object}
})
mongoose.model("Beast",BeastSchema)
var Beast = mongoose.model("Beast")
////////////////////////////////////////////////////////////////////////////

var BeastiarySchema = new mongoose.Schema({
    beasts:             {type:[BeastSchema]},
    links:              {type:Object}
})
mongoose.model("Beastiary", BeastiarySchema);
var Beastiary = mongoose.model("Beastiary")

////////////////////////////////////////////////////////////////////////////

var ItemSchema = new mongoose.Schema({
    name:               {type:String},
    description:        {type:String},
    links:              {type:Object}
})
mongoose.model("Item", ItemSchema);
var Item = mongoose.model("Item")

////////////////////////////////////////////////////////////////////////////

var CharacterSchema = new mongoose.Schema({
    title:              {type:String},
    size:               {type:String},
    alignment:          {type:String},
    ac:                 {type:Number},
    hp:                 {type:String},
    speed:              {type:String},
    str:                {type:Number},
    dex:                {type:Number},
    con:                {type:Number},
    int:                {type:Number},
    wis:                {type:Number},
    cha:                {type:Number},
    skills:             {type:[String]},
    damageimmunities:   {type:[String]},
    senses:             {type:[String]},
    languages:          {type:[String]},
    cr:                 {type:Number},
    abilities:          {type:[String]},
    actions:            {type:[String]},
    description:        {type:String},
    links:              {type:Object}
})
mongoose.model("Character", CharacterSchema);
var Character = mongoose.model('Character')
////////////////////////////////////////////////////////////////////////////


var LocationSchema = new mongoose.Schema({
    // map:        {type:MapSchema},
    // characters: {type:[CharacterSchema]},
    // plot:       {type:String},
    // items:      [ItemSchema]
    title: String,
    content: String,
    POIarr: [Object],
    map: String,
    links:             {type:Object}




})
mongoose.model("Location", LocationSchema);
var Location = mongoose.model("Location")
var PlotSchema = new mongoose.Schema({
    title:              {type:String},
    content:            {type:String},
    notes:              {type:[String]},
    links:              {type:[String]}
})
mongoose.model("Plot",PlotSchema)
var Plot = mongoose.model("Plot")
////////////////////////////////////////////////////////////////////////////
var CampaignSchema = new mongoose.Schema({
    title:      {type:String},
    plothook:   {type:String},
    plots:      {type:[PlotSchema]},
    locations:  {type:[LocationSchema]},
    maps:       {type:[MapSchema]},
    characters: {type:[CharacterSchema]},
    beastiary:  {type:BeastiarySchema},
    items:      {type:[ItemSchema]},
    rating:     {type:Number},
    public:     {type:Boolean},
    user:       {type:ObjectId} // GET OBJECT ID COMMAND MONGOOSE
})
mongoose.model("Campaign", CampaignSchema)
var Campaign = mongoose.model("Campaign")

////////////////////////////////////////////////////////////////////////////
var UserSchema = new mongoose.Schema({
    nickname:   {type:String, required:[true,"name required"], minlength:2},
    password:   {type:String, required:[true,"password required"], minlength:1},
    campaigns:  {type:[CampaignSchema]}
})
mongoose.model("User",UserSchema)
var User = mongoose.model('User')


////////////////////////////////////////////////////////////////////////////

app.listen(8000, function() {
    console.log("listening on port 8000");
})
app.post("/user", function(req,res){
    console.log("/user Postroute engaged")
    User.findOne({nickname:req.body.nickname},function(err,user){
        console.log("test1")
        if(user!=null){
            console.log("test2A",user)
            return res.json({status:false, error:{errors:{nickname:"That Nickname is taken"}}})
        }else{
            console.log("test2b")

            if(req.body.password!=req.body.pwc){
                console.log("test3A")

               return res.json({status:false, error:{errors:{password:"Passwords Do Not Match"}}})
            }else{
                console.log("test3b")

                bcrypt.hash(req.body.password, saltRounds, function(err, hash){
                    if(err){
                        console.log("test4A")

                        console.log("failed to bcrypt", err)
                       return res.json({status:false, error:err})
                    }else{
                        console.log("test4b")

                        var user = new User({nickname:req.body.nickname,password:hash,campaigns:[]})
                        user.save(function(err){
                            if(err){
                                console.log("problem creating new user",err)
                               return res.json({status:false, error:err})
                            }else{
                                User.findOne({nickname:req.body.nickname},function(err,user){
                                    req.session.userId=user.id
                                    req.session.nickname=user.nickname
                                    console.log("successfully created a new user")
                                   return res.json({status:true})
                                }
                            )}
                        })
                    }
                    
                })
                
            }
                
        }
            
    })
        
})
app.post("/login", function(req,res){
    console.log("Post login route is activated")
    User.findOne({nickname:req.body.nickname},function(err,user){
        if(user){
            console.log("found user",user)
            bcrypt.compare(req.body.password, user.password, function(err,response){
                if(response){
                    console.log("the password was correct")
                    req.session.userId= user.id;
                    req.session.nickname=user.nickname
                
                   return res.json({status:true})
                }
                else{
                    console.log(response)
                   return res.json({status:false, error:{errors:{"password":"password incorrect"}}})

                }
            })
        }else{
            console.log("did not find user",user)
           return res.json({status:false, error:{errors:{"nickname":"the nickname you entered is not signed up"}}})
        }
    })
})
app.get("/login", function(req,res){
    console.log("get login route is activated")
    if (req.session.userId!=null){
        User.findOne({_id:req.session.userId},function(err,user){
           return res.json({ user:user._id, nickname:user.nickname, campaigns:user.campaigns}) 
        })
    }else{
        return res.json({user:null})
    }
})
app.post("/campaigns",function(req,res){
    console.log("post campaigns route is activated")
    if(req.session.userId==null){
        return res.json({status:false})
    }else{
        campaign = new Campaign({title:req.body.title, plothook:req.body.plothook, user:req.session.userId})
        campaign.save(function(err){
            if(err){
                return res.json({status:false, error:err})
            }else{
                User.findOne({_id:req.session.userId}, function(err,user){
                    if(err){
                        return res.json({status:false,error:err})
                    }else{
                        user.campaigns.push(campaign)
                        user.save(function(err){
                            if(err){
                                return res.json({status:false})
                            }else{
                                return res.json({status:true, user:user})
                            }
                        })
                    }
                })
            }
        })
    }
})
app.get("/campaigns/:id", function(req,res){
    console.log("get campaigns route activated")
    Campaign.findOne({_id:req.params.id}, function(err,campaign){
        console.log(req.params.id)
        if(campaign){
            console.log("campaign found")
            return res.json({status:true,campaign:campaign})
        }else if(err){
            console.log("campaign error, not found")

            return res.json({status:false,error:err})
        }else{
            console.log("campaign not found")

            return res.json({status:false,error:{errors:{'error':"campaign not found"}}})
        }
    })
})
app.post("/plot",function(req,res){
    console.log("post plot route activated")
    var plot = new Plot({title:req.body.title,content:req.body.content})
    plot.save(function(err){
        if(err){
            console.log("failed to create new plot page error:",err)
            return res.json({status:false})
        }else{
            Campaign.findOne({_id:req.body.campaign},function(err,campaign){
                if(err){
                    console.log("couldnt find campaign")
                    return res.json({status:false})
                }else{
                    campaign.plots.push(plot)
                    campaign.save(function(err){
                        if(err){
                            return res.json({status:false, error:err})
                        }else{
                            console.log("updated campaign successfully")
                            return res.json({status:true})
                        }
                    })

                }
            })
        }
    })
})
app.get("/location/:id",function(req,res){
    console.log("location get route activated with id:",req.params.id)
    Location.findById(req.params.id, function(err,location){
        if(err){
            console.log("error occured ", err)
            return res.json({status:false, err:err})
        }else{
            return res.json({status:true, location:location})
        }
    })
})
app.put("/location",function(req,res){
    Location.findById(req.body.locationId, function(err,location){
        if(err){
            return res.json({status:false, err:err})
        }else{
            if(req.body.update=="POI"){
                //left off here
            }
        }
    })
})
app.post("/location", function(req,res){
    console.log("location post route activated")
    var location = new Location({title:req.body.title})
    location.save(function(err){
        if(err){
            console.log("failed to create new location page, error:", err)
            return res.json({status:false})
        }else{
            Campaign.findOne({_id:req.body.campaign}, function(err,campaign){
                if(err){
                    console.log("couldnt find that campaign")
                    return res.json({status:false})
                }else{
                    campaign.locations.push(location)
                    campaign.save(function(err){
                        if(err){
                            return res.json ({status:false, error:err})
                        }else{
                            return res.json({status:true})
                        }
                    })
                }
            })
        }
    })
})
app.post("/character", function(req,res){
    console.log("character post route activated")
    var character = new Character({title:req.body.title})
    character.save(function(err){
        if(err){
            console.log("failed to create new character page, error:", err)
            return res.json({status:false})
        }else{
            Campaign.findOne({_id:req.body.campaign}, function(err,campaign){
                if(err){
                    console.log("couldnt find that campaign")
                    return res.json({status:false})
                }else{
                    campaign.characters.push(character)
                    campaign.save(function(err){
                        if(err){
                            return res.json ({status:false, error:err})
                        }else{
                            return res.json({status:true})
                        }
                    })
                }
            })
        }
    })
})
app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./angular-app/dist/angular-app/index.html"))
});