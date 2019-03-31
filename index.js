const fs = require('fs')
const os = require('os')
const path = require('path')


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.


document.onkeydown = (e) => {
    switch (e.keyCode) {
        case 37:

            break;
        case 39:

            break;
    }
};

function changeImage(direction){

  getImages('gifs', (files) =>{
    let length = files.length
    let new_image = "./gifs/" + files[index]

    var img = document.getElementById("img-main");
    img.src = new_image;
  }
}

function randomPick(max){
  return Math.floor(Math.random() * Math.floor(max));
}

function getImages(directory, callback){
  images = []
  fs.readdir(directory, (err, files) => {
    if (err) {
      console.log(err)
    }
    files.map(
      (file) => {
        images.push(file)
      }
    )
    return callback(images)
  })

}

getImages('gifs', (files) =>{
  let length = files.length
  let index = randomPick(length)
  let new_image = "./gifs/" + files[index]
  console.log(new_image);

  var img = document.getElementById("img-main");
  img.src = new_image;
})
