/*
Setting up for Android on Macos

-   Install Nodejs
-   brew install watchman
-   Install Android studio
-   Open android studio >> Configure >> SDK Manager >> Select the SDK Tools tab >> Check d following options in the attached screenshots
-   Create a virtual device using the AVD Manager

CREATE A PROJECT
-   npx react-native init rncontacts (npx react-native init project-name)

CREATING A REACT NATIVE PROJECT USING A SPECIFIC VERSION
npx react-native init rncontacts --version 0.63.0

app.json
{
  "name": "rncontacts",
  "displayName": "rncontacts"
} ==> Ds is the app name dt appears on ur fone

ios/Podfile ==> ds is where we will be installing ios native modules

RUNNING THE APP ON IOS SIMULATOR
#   You might need to remove flipper to get this to work on ios

RUNNING THE APP ON ANDROID PHYSICAL DEVICE VIA WIFI
 -  In the terminal window, run 'adb reverse tcp:8081 tcp:8081'


Method 2: Connect via Wi-Fi
You can also connect to the development server over Wi-Fi. You'll first need to install the app on your device using a USB cable, but once that has been done you can debug wirelessly by following these instructions. You'll need your development machine's current IP address before proceeding.

You can find the IP address in System Preferences → Network.

Make sure your laptop and your phone are on the same Wi-Fi network.
Open your React Native app on your device.
Open the in-app Developer menu.
Go to Dev Settings → Change Bundle Location
Type in your ip address and port
Go back to the Developer menu and select Reload JS.

RUNNING THE APP ON ANDROID VIRTUAL DEVICE
-   cd ~/Library/Android/sdk/emulator
-   ./emulator -list-avds
-   ./emulator -avd Pixel_3a_XL_API_25


ADDING ENV VAR TO PATH ON MAC OS
ls -la
vim .bash_profile
paste d path e.g. export JAVA_HOME="/Applications/Android Studio.app/Contents/jre/jdk/Contents/Home"
:wq
cat .bash_profile
source .bash_profile
echo $PATH



How to solve (Could not initialize class org.codehaus.groovy.reflection.ReflectionCache) issue in react native

Adding this variable solved my problem:

export JAVA_HOME="/Applications/Android Studio.app/Contents/jre/jdk/Contents/Home"



APP SHOWING WHITE SCREEN ON ANDROID
-   ./gradlew clean
-   Uninstall the app from your phone and rebuild the app
*/
