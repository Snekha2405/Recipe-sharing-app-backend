const express=require("express")
const app=express()
const port=3000
const mongoose=require("mongoose")

app.listen(port,(err)=>{
    if(err){
        console.log(err);
    }
    console.log("Server running on port"+port);
})
mongoose.connect("mongodb+srv://snekha:snekha@snekha.dtlfd.mongodb.net/db001?retryWrites=true&w=majority&appName=snekha").then(
    ()=>console.log("connected")
).catch((err)=>
    console.log(err)
)
const User=require('./models/User')
const bcrypt=require('bcryptjs')


app.use(express.json());

//Home page api
app.get('/',(req, res)=>{
    res.send("<h1 align=center>Welcome to the MERN stack week 2 session</h1>")
})

//Registration page api

app.post('/register',async(req, res)=>{
    const {username,email,password}=req.body
    try{
        const hashedPassword= await bcrypt.hash(password,10)
        const user=new User({username,email,password:hashedPassword})
        await user.save()
        res.json({message: "User Registred.."})
        console.log("User Registration completed...")
    }
    catch(err)
    {
        console.log(err)
    }
})

//Login page api

app.post('/login',async(req,res)=>{
    const {email,password}=req.body
    try{
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) 
            {
             return res.status(400).json({ message: "Invalid Credentials" });
            }
          res.json({ message: "Login Successful", username: user.username });
    }
    catch(err)
    {
        console.log(err)
    }
})

// Import the Recipe model

// Add Recipe API
const Recipe = require('./models/Recipe'); // Import the Recipe model

// Add Recipe API
app.post('/add-recipe', async (req, res) => {
    const { title, ingredients, instructions } = req.body;
    try {
        const recipe = new Recipe({ title, ingredients, instructions });
        await recipe.save();
        res.json({ message: "Recipe added successfully!", recipe });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error adding recipe" });
    }
});

// View Single Recipe API
// app.get('/recipe/:title', async (req, res) => {
//     try {
//         const recipe = await Recipe.findById(req.params.title);
//         if (!recipe) {
//             return res.status(404).json({ message: "Recipe not found" });
//         }
//         res.json(recipe);
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ message: "Error fetching recipe" });
//     }
// });

// View All Recipes API
app.get('/recipes', async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.json(recipes);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error fetching recipes" });
    }
});



