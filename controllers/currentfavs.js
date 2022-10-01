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

export {
  index,
}