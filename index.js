const express = require('express')
const cors = require("cors");
const mongoose = require('mongoose');
const dotenv = require("dotenv").config();
const app = express()
const PORT = 3000;
const Recipe = require('./models/recipe')
app.use(cors())
app.use(express.json());

const CONNECTION = process.env.CONNECTION;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// sending all recipes
app.get('/recipes', async (req, res) => {
    try {
        const recipes = await Recipe.find();
                
        res.status(200).json(recipes);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
})

// creata a recipe
app.post('/recipe', async (req, res) => {
    const name = req.body.name;
    const difficulty = req.body.difficulty;
    const time_required = req.body.time_required;
    const ingredients_list = req.body.ingredients_list;
    const steps_list = req.body.steps_list;
    const image = req.body.image;

    const newRecipe = new Recipe({ name: name, difficulty: difficulty, time_required: time_required, ingredients_list: ingredients_list, steps_list: steps_list, image: image  })

    try {
        await newRecipe.save();

        res.status(201).json(newRecipe );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
})

app.delete('/recipe/:id', async (req, res) => {
    const recipe_id = req.params.id
    try {
        const recipes = await Recipe.findByIdAndDelete(recipe_id);
        res.status(200).json(recipes);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
})

mongoose.connect(CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

  