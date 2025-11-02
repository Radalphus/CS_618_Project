import mongoose, { Schema } from 'mongoose'

const recipeSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    contents: String,
    image: String,
    tags: [String],
    likes: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    likeCount: { type: Number, default: 0 }
  },
  { timestamps: true },
)

export const Recipe = mongoose.model('recipe', recipeSchema)
