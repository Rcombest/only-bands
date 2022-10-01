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
      title: "current favs show"
    })
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
}