import mongoose from 'mongoose'

const Schema = mongoose.Schema

const currentfavSchema = new Schema({
  band: String,
  song: String,
  owner: {type: Schema.Types.ObjectId, ref: "Profile"}
}, {
  timestamps: true
})

const CurrentFav = mongoose.model('CurrentFav', currentfavSchema)

export {
  CurrentFav
}