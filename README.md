# reactNativeApp
Requirements:
- xcode
- brew install node

If cloning this repo use this
```
cd reactNativeApp
npm install
react-native run-ios
```
NOTE: if you get red screen (could not connect) it’s probably because the packager is still building. just refresh (cmd-R) when the packager is done

NOTE: if you want to debug without using the xcode console (for JS debugging)
      CMD-CTRL-Z to 'shake device'
      Select "Remote JS Debugging'
      CMD-OPT-J to open chrome JS console

The following is just for educational purposes
Instructions to re-create this from scratch
following instruction here (somewhat) except for the coapods for google maps
https://medium.com/@kswanie21/react-native-google-map-with-react-native-maps-572e3d3eee14

```
npm i -g react-native-cli
react-native init reactNativeApp
cd reactNativeApp
react-native run-ios
```
To add maps
```
npm install react-native-maps --save
#npm install react@16.0.0-alpha.12
react-native link react-native-maps
```
- open xcode project file in the ‘reactNativeApp/ios’ dir
- drag reactNativeApp/node_modules/react-native-maps/lib/ios/AirMaps to into xcode (reactNativeApp subfolder). choose copy and create groups.
- add $(SRCROOT)/../node_modules/react-native-maps/ios/AirMaps to header search paths
- modify index.ios.app with MapView
```
react-native run-ios
```

