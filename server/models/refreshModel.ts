import { model, Schema } from 'mongoose';

const refreshSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", reqired: true },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, required: true }
})

refreshSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 })

const RefreshToken = model('RefreshToken', refreshSchema)

export default RefreshToken