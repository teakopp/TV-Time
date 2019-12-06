const fs = require('fs')
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
    })
  }

  // generic callback function, I use this mostly for logging tbh
  callback(value) {
    return value
  }

  // Use this function to set display the new image after using other functions to make changes
  setChannel(image, directory) {
    let new_image = path.join(directory + '/' + image)
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
    this.setChannelBasedOnHelpdeskSchedule()
    this.refreshChannel()
  }

  getDayOfTheWeek() {
    var date = new Date();
    return date.getDay();
  }

  getCurrentHour() {
    let date = new Date();
    return date.getHours()
  }

  getCurrentMinutes() {
    let date = new Date();
    return date.getMinutes()
  }

  getImageByDayOfWeek() {
    let day = this.getDayOfTheWeek()
    if (day >= 1 && day <= 3) {
      return ("IT.gif")
    } else if (day == 4 || day == 5) {
      return ("IT-Hubot-Gif-off-thurs-fri.gif")
    } else {
      return ("IT-Hubot-Gif-closed.gif")
    }
  }

  getHoursForHelpdesk(){
      let day = this.getDayOfTheWeek();
      if (day == 4 || day == 5){
        return [16, 9]
      }
      else{
        return [17, 9]
      }
  }

  helpdeskIsOpen() {
    let currentHour = this.getCurrentHour()
    let helpdeskHours = this.getHoursForHelpdesk()
    
    if (currentHour < helpdeskHours[0] && currentHour >= helpdeskHours[1]) {
      return true
    } else {
      return false
    }
  }

  checkForRefresh(interval, minuteToRefresh) {

    setInterval(() => {
      let time = this.getCurrentMinutes()

      if (time == minuteToRefresh) {
        this.refreshChannel()
      }
    }, interval)
  }

  setChannelBasedOnHelpdeskSchedule() {
    let helpDeskIsOpen = this.helpdeskIsOpen()
    if (helpDeskIsOpen) {
      televison.setChannel(televison.getImageByDayOfWeek(), "gifs")
    } else {
      televison.setChannel("IT-Hubot-Gif-closed.gif", "gifs")
    }
  }

}

let televison = new TV("gifs", "img-main")
televison.getFiles()
televison.setChannelBasedOnHelpdeskSchedule()
televison.checkForRefresh(50000, 0)
console.log(televison.helpdeskIsOpen());
