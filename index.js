const fs = require('fs')
const os = require('os')
const path = require('path')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.

//Creates TV class for your viewing pleasure
class TV {

  constructor(directory, htmlIdTag){
    this.directory = directory;
    this.index = 0;
    this.length = 0;
    this.images = [];
    this.htmlIdTag = htmlIdTag;
  }

//recursive loop to get a different random number, if same one picked twice
// then sets it when unique number found
  changeToRandom(){
    let random = this.randomPick(this.length - 1)
    console.log(this.index);
    if (this.index == random){
      this.changeToRandom()
    }
    else {
      this.index = random
      this.setChannel()
    }
  }
  // Increments image up one in the array of files
  // then sets it
  changeUp(){
    this.index += 1
    if (this.index > this.length){
      this.index = 0
    }
    console.log(this.index);
    this.setChannel()
  }

// Increments image down one in the array of files
// then sets it
  changeDown(){
    this.index -= 1
    console.log(this.index);
    if (this.index <= 0){
      this.index = this.length
    }
    console.log(this.index);
    this.setChannel()
  }

// Gets a nice ol random number
  randomPick(max){
    return Math.floor(Math.random() * Math.floor(max));
  }

// Goes through this.directory, and gets all files out of it.
// I haven't tested puttin non-images so proceed with caution
// Also beware of callback hell when messing with it
  getFiles(){
    var things = []

    fs.readdir(this.directory , (err, files) => {
      if (err) {
        console.log(err)
      }
      files.map(
        (file) => {
          things.push(file)
        }
      )

      this.images = this.callback(things)
      this.length = this.images.length - 1
      this.changeToRandom()
    })
  }

// generic callback function, I use this mostly for logging tbh
  callback(value){
    return value
  }

// use this fucntion to set display the new image after using other functions to make changes
  setChannel(){
    let new_image = this.directory + this.images[this.index]
    var img = document.getElementById(this.htmlIdTag);
    img.src = new_image;
  }


}

let televison = new TV("./gifs/", "img-main")
televison.getFiles()



//Keeping this out of function, because I'm scared of weirdness it could potentially cause
document.onkeydown = (e) => {
    switch (e.keyCode) {
        case 32:
          televison.changeToRandom()
          break;

        case 37:
          televison.changeDown()
          break;

        case 39:
          televison.changeUp()
          break;
    }
};
