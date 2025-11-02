import { Recipe } from '../db/models/recipe.js'
import { User } from '../db/models/user.js'

export async function createRecipe(userId, { title, contents, image, tags }) {
  const recipe = new Recipe({ title, author: userId, contents, image, tags })
  return await recipe.save()
}

async function listRecipes(
  query = {},
  { sortBy = 'createdAt', sortOrder = 'descending' } = {},
) {
  return await Recipe.find(query)
    .populate('likes', '_id username')
    .sort({ [sortBy]: sortOrder })
}

export async function listAllRecipes(options) {
  return await listRecipes({}, options)
}

export async function listRecipesByAuthor(authorUsername, options) {
  const user = await User.findOne({ username: authorUsername })
  if (!user) return []
  return await listRecipes({ author: user._id }, options)
}

export async function listRecipesByTag(tags, options) {
  return await listRecipes({ tags }, options)
}

export async function getRecipeById(recipeId) {
  return await Recipe.findById(recipeId).populate('likes', '_id username')
}

export async function toggleLikeRecipe(userId, recipeId) {
  const recipe = await Recipe.findById(recipeId)
  if (!recipe) return null

  const userLikeIndex = recipe.likes.indexOf(userId)
  if (userLikeIndex === -1) {
    recipe.likes.push(userId)
    recipe.likeCount += 1
  } else {
    recipe.likes.splice(userLikeIndex, 1)
    recipe.likeCount -= 1
  }
  
  return await recipe.save()
}

export async function updateRecipe(
  userId,
  recipeId,
  { title, contents, images, tags },
) {
  return await Recipe.findOneAndUpdate(
    { _id: recipeId, author: userId },
    { $set: { title, contents, images, tags } },
    { new: true },
  )
}

export async function deleteRecipe(userId, recipeId) {
  return await Recipe.deleteOne({ _id: recipeId, author: userId })
}
