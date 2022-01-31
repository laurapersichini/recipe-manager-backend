const mongoose= require("mongoose")
const recipeSchema = mongoose.Schema({
    name: String,
    difficulty: String,
    time_required: String,
    steps_list: [String],
    description: String,
    ingredients_list: String,
    image: String
})
const Recipe = mongoose.model('Recipe', recipeSchema)
module.exports= Recipe;