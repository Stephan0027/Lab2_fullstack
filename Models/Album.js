const mongoose = require('mongoose')

const albumSchema = new mongoose.Schema(
  {
    title: { type: String },
    artist: { type: String },
    year: { type: Number }
  }

)

module.exports = new mongoose.model("Album", albumSchema)