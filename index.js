const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require("cors");
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb+srv://ateebahmed:ateeb1122%40@lbr.puyvnh1.mongodb.net/");
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to DB');
});



// Create a simple schema
const Schema = mongoose.Schema;
const postSchema = new Schema({
  wallet_id: String,
  url: String,
  text: String,
  allow_reaction: {
    type: Boolean,
    default: false
  },
  image: String,
},{timestamps: true});

const Post = mongoose.model('post', postSchema);

// Express route to fetch data from MongoDB
app.get('/api/post', async (req, res) => {
    try {
      const examples = await Post.find();
      res.json(examples);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  app.post('/api/post', async (req, res) => {
    try {
      const { wallet_id, url, allow_reaction, text, image } = req.body;
      const newExample = new Post({
        wallet_id,
        url,
        text,
        image,
        allow_reaction: allow_reaction || false, 
      });
 
      const savedPost = await newExample.save();
  
      res.json(savedPost);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


const port = 8000;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });