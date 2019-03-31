const fs = require('fs')
const os = require('os')
const path = require('path')


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.

var index = 0
var length = 0

document.onkeydown = (e) => {
    switch (e.keyCode) {
        case 32:
        let random = randomPick(length)
        index = randomPick(length)
        changeImage()

        case 37:
          index -= 1
          if (index <= 0){
            index = length
          }
          console.log(index);
          changeImage()
          break;

        case 39:
          index += 1
          if (index > length){
            index = 0
          }
          console.log(index);
          changeImage()
            break;
    }
};

function changeImage(){

  getImages('gifs', (files) =>{
    let length = files.length
    let new_image = "./gifs/" + files[index]

    var img = document.getElementById("img-main");
    img.src = new_image;
  })
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
  length = files.length - 1
  console.log(length);
  index = randomPick(length)
  let new_image = "./gifs/" + files[index]
  console.log(new_image);

  var img = document.getElementById("img-main");
  img.src = new_image;
})
