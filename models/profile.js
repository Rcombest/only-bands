import mongoose from 'mongoose'

const Schema = mongoose.Schema

const bandSchema = new Schema({
  name: String,
  album: String,
  genre: String,
}, {
  timestamps: true
})

const profileSchema = new Schema({
  name: String,
  avatar: String,
  bands: [bandSchema],
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}
