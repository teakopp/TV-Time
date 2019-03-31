#!/bin/bash

# Obtain variables from UI and assign them to more understandable values
fullname=$1
handle=$2
password=$3
oldpassword=$4
serialNumber=$(ioreg -l | awk '/IOPlatformSerialNumber/ { print $4;}' | sed -e 's/^"//' -e 's/"$//')

data="{name: $fullname, handle: $handle, password: $password, oldpassword: $oldpassword, serialNumber: $serialNumber}"

printf "\nCredentials to be sent:\n
Full name: $fullname\nHandle: $handle\nPassword: $password\nOldpassowrd: $oldpassword\nserialNumber: $serialNumber\n\n"

# Creates a put request to send user data to Node server
curl -X PUT -d "$data" localhost:3000/user

# Uses the user's credntials to change the current account login and password
ShortName=`whoami`
FullName=`dscl . -read /Users/$ShortName RealName | tail -1 | sed 's/[^ ]* //'`

echo $oldpassword | sudo -S dscl . change /Users/$ShortName RealName $FullName $handle
echo $oldpassword | sudo -S dscl . -passwd /Users/$handle $password

printf "\nUser credentials changed.\n"

# Log out
osascript -e 'tell application "loginwindow" to  «event aevtrlgo»'
