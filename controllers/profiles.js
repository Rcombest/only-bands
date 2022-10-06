import { Profile } from '../models/profile.js'

function index(req, res) {
  Profile.find({})
  .then(profiles => {
    res.render('profiles/index', {
      profiles,
      title: '🤘Profiles🤘'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function show(req, res) {
  Profile.findById(req.params.id)
  .then(profile => {
    const isSelf = profile._id.equals(req.user.profile._id)
    res.render("profiles/show", {
      title: `${profile.name}'s profile`,
      profile,
      isSelf,
      getBand: () => {
        const bands = ["🎵", "🧑‍🎤", "🎻", "🎼", "🎺", "🪕", "🪗", "🪘", "🎹", "🎸", "🎶", "🎷", "🥁", "🎤", "👩‍🎤", "👨‍🎤"]
        return bands[Math.floor(Math.random() * bands.length)]
      }
    })
  })
  .catch((err) => {
    console.log(err)
    res.redirect("/profiles")
  })
}

function createBand(req, res) {
  Profile.findById(req.user.profile._id)
  .then(profile => {
    profile.bands.push(req.body)
    profile.save()
    .then(() => {
      res.redirect(`/profiles/${req.user.profile._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect(`/profiles/${req.user.profile._id}`)
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/profiles/${req.user.profile._id}`)
  })
}

function deleteBand(req, res) {
  Profile.findById(req.user.profile._id)
  .then(profile => {
    profile.bands.remove({_id: req.params.id})
    profile.save()
    .then(() => {
      res.redirect(`/profiles/${req.user.profile._id}`)
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/profiles/${req.user.profile._id}`)
  })
}

function edit(req, res) {
  Profile.findById(req.params.profileId)
  .then(profile => {
    const band = profile.bands.id(req.params.bandId) 
    res.render(`profiles/edit`, {
      profile,
      band,
      title: "edit album"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/profiles/${req.user.profile._id}`)
  })
}

function update(req, res) {
  console.log(req.body)
  Profile.findById(req.params.profileId)
  .then(profile => {
    const band = profile.bands.id(req.params.bandId)
    band.set(req.body)
    profile.save()
    .then(() => {
      res.redirect(`/profiles/${req.user.profile._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect(`/profiles/${req.user.profile._id}`)
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/profiles/${req.user.profile._id}`)
  })
}

export {
  index,
  show,
  createBand,
  deleteBand,
  edit,
  update,
}