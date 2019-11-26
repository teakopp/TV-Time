const fs = require('fs')
const os = require('os')
const path = require('path')

//Creates TV class for your viewing pleasure
class TV {

  constructor(directory, htmlIdTag) {
    this.directory = path.resolve(__dirname, directory)
    this.index = 0;
    this.length = 0;
    this.images = [];
    this.htmlIdTag = htmlIdTag;
    this.standByDisplayed = false
  }


  // Goes through this.directory and gets all files out of it.
  // I haven't tested putting non-images so proceed with caution
  // Also beware of callback hell when messing with it
  getFiles() {
    var things = []

    fs.readdir(this.directory, (err, files) => {
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
      console.log(this.images);
      this.setChannelBasedOnHelpdeskSchedule()
    })
  }

  // generic callback function, I use this mostly for logging tbh
  callback(value) {
    return value
  }

  // Use this function to set display the new image after using other functions to make changes
  setChannel(image, directory) {
    let new_image = path.join(directory + '/' + image)
    console.log(new_image);
    var img = document.getElementById(this.htmlIdTag);
    img.src = new_image;
  }

  isImageHidden() {
    var img = document.getElementById(this.htmlIdTag);
    if (img.style.visibility == 'hidden') {
      return true
    } else {
      return false
    }
  }

  hideImage() {
    var img = document.getElementById(this.htmlIdTag);
    img.style.visibility = 'hidden'
  }
  showImage() {
    var img = document.getElementById(this.htmlIdTag);
    img.style.visibility = 'visible'
  }
  displayPleaseStandByScreen() {
    let image = 'giphy-2.gif'
    let directory = __dirname + '/default-images/'
    this.setChannel(image, directory)
    this.standByDisplayed = true
  }
  hideDisplayPleaseStandByScreen() {
    this.setChannel(this.images[this.index], this.directory)
    this.standByDisplayed = false
  }

  addStatic() {
    // this.displayPleaseStandByScreen()
    setTimeout(() => {

      this.displayPleaseStandByScreen()

      setTimeout(() => {
        this.hideDisplayPleaseStandByScreen()
      }, 200)

    }, 10)
  }

  refreshChannel() {
    setTimeout(() => {
      this.setChannelBasedOnHelpdeskSchedule()
      this.refreshChannel()
      return
    }, 1800000)
  }

  getDayOfTheWeek(){
    var date = new Date();
    var number = date.getDay();
    return date.getDay();
  }

  getCurrentTime(){
    let date = new Date();
    return date.getHours()
  }

  getImageByDayOfWeek(){
    let day = this.getDayOfTheWeek()
    if(day >= 1 && day <= 3 ){
      return ("IT.gif")
    }
    else if(day == 4 || day == 5){
      return ("IT-Hubot-Gif-off-thurs-fri.gif")
    }
    else{
      return ("IT-Hubot-Gif-closed.gif")
    }
  }

  helpdeskIsOpen(){
    let currentHour = this.getCurrentTime()

    if(currentHour < 17 && currentHour >=  9){
      return true
    }
    else{
      return false
    }
  }

  setChannelBasedOnHelpdeskSchedule(){
    let helpDeskIsOpen = this.helpdeskIsOpen()
    if(helpDeskIsOpen){
      televison.setChannel(televison.getImageByDayOfWeek(), "gifs")
    }
    else{
      televison.setChannel("IT-Hubot-Gif-closed.gif", "gifs")
    }
  }

}

let televison = new TV("gifs", "img-main")
televison.getFiles()
televison.setChannelBasedOnHelpdeskSchedule()
televison.refreshChannel()
