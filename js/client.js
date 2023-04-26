
async function showAlbums() {
  let data = await (await (fetch("http://localhost:3000/albums"))).json();
  let albums = data["data"]
  console.log(albums)


  let html = `
  <table>
      <tr>
        <th>Title</th>
        <th>Artist</th>
        <th>Year</th>
        <th></th>
      </tr>`

  for (let i = 0; i < albums.length; i++) {
    console.log(albums[i].title)
    html += `
    <tr>
    <td><input type="text" id="t_${albums[i]._id}" value = "${albums[i].title}"></input></td>
    <td><input type="text" id="a_${albums[i]._id}" value = "${albums[i].artist}"></input></td>
    <td><input type="number" id="y_${albums[i]._id}" value = "${albums[i].year}"></input></td>
    <td>
    <button type="button" id="d_${albums[i]._id}">Delete</button>
    <button type="button" id="u_${albums[i]._id}">Update</button>
    
    </td>
    </tr>
    `

  }

  html += `</table>`

  document.getElementById("albumList").innerHTML = html;

  //add events
  for (let i = 0; i < albums.length; i++) {
    //add delete button event
    document.getElementById("d_" + albums[i]._id).addEventListener('click', event => {
      deleteAlbum(albums[i]._id);
    });

    //add update button event
    document.getElementById("u_" + albums[i]._id).addEventListener('click', event => {
      updateAlbum(albums[i]._id);
    });


  }
}

//update Album
function updateAlbum(id) {
  let artist = document.getElementById("a_" + id).value
  let title = document.getElementById("t_" + id).value
  let year = document.getElementById("y_" + id).value
  console.log(artist, title, year);
  let checkAlbum = true

  //make json string
  let json_text = '{"artist":"' + artist + '","title":"' + title + '","year":"' + year + '"}'
  console.log(json_text)

  //check input
  let yearnr = Number(year);
  if ((Number.isNaN(yearnr)) || (year.length != 4)) {
    checkAlbum = false
  }

  if (artist.length == 0) {
    checkAlbum = false
  }
  if (title.length == 0) {
    checkAlbum = false
  }

  //post to database
  if (checkAlbum) {
    const response = fetch(`http://localhost:3000/albums/${id}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: json_text
    });
  }
  else {
  }

}

function deleteAlbum(id) {
  console.log(id);
  let json_text = `{"_id":"${id}"}`

  const response = fetch(`http://localhost:3000/albums/${id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: json_text
  });
}

//add album with supplied details
addAlbum.addEventListener('click', event => {
  console.log("ADD data")
  let artist = artistText.value
  let title = titleText.value
  let year = yearNumber.value
  let checkAlbum = true

  //make json string
  let json_text = '{"artist":"' + artist + '","title":"' + title + '","year":"' + year + '"}'
  console.log(json_text)

  //check input
  let yearnr = Number(year);
  if ((Number.isNaN(yearnr)) || (year.length != 4)) {
    checkAlbum = false
  }

  if (artist.length == 0) {
    checkAlbum = false
  }
  if (title.length == 0) {
    checkAlbum = false
  }

  //post to database
  if (checkAlbum) {
    const response = fetch('http://localhost:3000/albums', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: json_text
    });
    document.getElementById("artistText").value = ""
    document.getElementById("titleText").value = ""
    document.getElementById("yearNumber").value = NaN
  }
  else {
  }
});


showAlbums();