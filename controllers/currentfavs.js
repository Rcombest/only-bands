import { CurrentFav } from "../models/currentfav.js"

function index(req, res) {
  CurrentFav.find({})
  .then(currentfavs => {
    res.render('currentfavs/index', {
      currentfavs,
      title: "🎵Current User Fav's🎵"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

function create(req, res) {
  req.body.owner = req.user.profile._id
  CurrentFav.create(req.body)
  .then(currentfav => {
    res.redirect('/currentfavs')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/currentfavs')
  })
}

function show(req, res) {
  CurrentFav.findById(req.params.id)
  .populate('owner')
  .then(currentfav => {
    res.render('currentfavs/show', {
      currentfav,
      title: "currentfavs show"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/currentfavs')
  })
}

function edit(req, res) {
  CurrentFav.findById(req.params.id)
  .then(currentfav => {
    res.render('currentfavs/edit', {
      currentfav,
      title: 'edit currentfavs'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/currentfavs')
  })
}

function update(req, res){
  CurrentFav.findById(req.params.id)
  .then(currentfav => {
    if (currentfav.owner.equals(req.user.profile._id)) {
      currentfav.updateOne(req.body)
      .then(() => {
        res.redirect(`/currentfavs/${currentfav._id}`)
      })
    } else {
      throw new Error ('🚫 Not authorized 🚫')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/currentfavs')
  })
}

function deleteFav(req, res) {
  CurrentFav.findById(req.params.id)
  .then(currentfav => {
    if (currentfav.owner.equals(req.user.profile._id)) {
      currentfav.delete()
      .then(() => {
        res.redirect('/currentfavs')
      })
    } else {
      throw new Error ('🚫 Not authorized 🚫')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/currentfavs')
  })
}

export {
  index,
  create,
  show,
  edit,
  update,
  deleteFav as delete,
}