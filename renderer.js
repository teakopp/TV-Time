const fs = require('fs')
const os = require('os')
const path = require('path')

//Creates TV class for your viewing pleasure
class TV {

  constructor(directory, htmlIdTag){
    this.directory = path.resolve(__dirname, directory )
    this.index = 0;
    this.length = 0;
    this.images = [];
    this.htmlIdTag = htmlIdTag;
    this.standByDisplayed = false
  }

// Recursive loop to get a different random number, if same one picked twice
// then sets it when unique number found
  changeToRandom(){
    let random = this.randomPick(this.length - 1)
    console.log(this.index);
    if (this.index == random){
      this.changeToRandom()
    }
    else {
      this.index = random
      let image = this.images[this.index]
      this.setChannel(image, this.directory)
    }
  }

  // Increments image up one in the array of files
  // then sets it
  changeUp(){
    this.index += 1
    if (this.index > this.length){
      this.index = 0
    }
    let image = this.images[this.index]
    this.setChannel(image, this.directory)
  }

// Increments image down one in the array of files
// then sets it
  changeDown(){
    this.index -= 1
    console.log(this.index);
    if (this.index <= 0){
      this.index = this.length
    }
    this.setChannel(this.images[this.index], this.directory)
  }

// Gets a random number
  randomPick(max){
    return Math.floor(Math.random() * Math.floor(max));
  }

// Goes through this.directory and gets all files out of it.
// I haven't tested putting non-images so proceed with caution
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

// Use this function to set display the new image after using other functions to make changes
  setChannel(image, directory){
    let new_image = path.join(directory +'/' + image)
    console.log(new_image);
    var img = document.getElementById(this.htmlIdTag);
    img.src = new_image;
  }

  isImageHidden(){
    var img = document.getElementById(this.htmlIdTag);
     if(img.style.visibility == 'hidden'){
       return true
     }
     else{
       return false
     }
  }

  hideImage(){
    var img = document.getElementById(this.htmlIdTag);
    img.style.visibility = 'hidden'
  }
  showImage(){
    var img = document.getElementById(this.htmlIdTag);
    img.style.visibility = 'visible'
  }
  displayPleaseStandByScreen(){
    let image = 'giphy-2.gif'
    let directory = __dirname + '/default-images/'
    this.setChannel(image, directory)
    this.standByDisplayed = true
  }
  hideDisplayPleaseStandByScreen(){
    this.setChannel(this.images[this.index], this.directory)
    this.standByDisplayed = false
  }

  addStatic(){
    // this.displayPleaseStandByScreen()
    setTimeout(() => {

      this.displayPleaseStandByScreen()

      setTimeout(() => {
        this.hideDisplayPleaseStandByScreen()
      }, 200)

    }, 10)
  }

  automaticallyChangeChannel(){
    setTimeout(() => {
      this.addStatic()
      this.changeToRandom()
      this.automaticallyChangeChannel()
      return
    }, 1800000)
  }

}

let televison = new TV("gifs", "img-main")
televison.getFiles()
televison.automaticallyChangeChannel()

// Keeping this out of function, because I'm scared of weirdness it could potentially cause
document.onkeydown = (e) => {
    switch (e.keyCode) {
      // Esc Key
      case 27:
      if(televison.standByDisplayed){
        televison.hideDisplayPleaseStandByScreen()
      }
      else{
        televison.displayPleaseStandByScreen()
      }
      break;

      // Spacebar
      case 32:
        televison.addStatic()
        televison.changeToRandom()
        break;

      // Left Arrow
      case 37:
        televison.addStatic()
        televison.changeDown()
        break;

      // Right Arrow
      case 39:
        televison.addStatic()
        televison.changeUp()
        break;
    }
};
