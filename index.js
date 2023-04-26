const express = require('express')
const path = require('path');
const mongoose = require('mongoose')
const bodyPaser = require('body-parser')
require('dotenv').config()

const Album = require('./Models/Album')
const port = process.env.PORT || 3000
const uri = process.env.URI

//connect to mongodb database
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB and Mongoose connected!'))
  .catch(error => console.error('Error in connection!', error))

app = express()
app.use(express.json())
app.use(bodyPaser.json())
app.use(bodyPaser.urlencoded({ extended: true }));
app.use('/js', express.static(path.join(__dirname, 'js')));

// mainpage
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});


//return all albums
app.get('/albums', async (req, res) => {

  try {
    const albums = await Album.find()
    res.json({
      data: albums
    })
  } catch (error) {
    res.status(500).json({ message: "error in getting albums" })
  }


})

//return album based on title
app.get('/albums/:title', async (req, res) => {
  let title = req.params.title;
  title = title.replace("_", " ");
  console.log(title)
  try {
    const albums = await Album.find({ "title": title })
    res.json({
      data: albums
    })
  } catch (error) {
    res.status(404).json({ message: "Cannot find album" })
  }

})

//add new album
app.post('/albums', async (req, res) => {
  const artist = req.body.artist
  const title = req.body.title
  const year = req.body.year
  const yearnr = Number(year);

  const newAlbum = new Album({
    artist: artist,
    title: title,
    year: yearnr
  })

  try {
    const album = await newAlbum.save()
    res.status(201);

  } catch (error) {
    res.status(500).json({ message: "error in adding new album" })
  }
})

//delete album
app.delete('/albums/:id', async (req, res) => {
  let albumId = req.params.id;

  Album.deleteOne({ "_id": albumId }).then(function () {
    console.log("Data deleted")
  }).catch(function (error) {
    res.status(404).json({ message: "Album could not be deleted" })
  });

})

//update album
app.post('/albums/:id', async (req, res) => {
  let albumId = req.params.id;
  const artist = req.body.artist
  const title = req.body.title
  const year = req.body.year
  const yearnr = Number(year);

  const filter = { "_id": albumId };
  const update = { "artist": artist, "title": title, "year": year };

  Album.updateOne(filter, update).then(function () {
    console.log("Data updated")
  }).catch(function (error) {
    res.status(404).json({ message: "Album could not be updated" })
  });
})

app.listen(port, console.log('The app is running on http://localhost:' + port))