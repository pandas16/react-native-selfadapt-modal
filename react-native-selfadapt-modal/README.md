
# react-native-selfadapt-modal

## Getting started

`$ npm install react-native-selfadapt-modal --save`

### Mostly automatic installation

`$ react-native link react-native-selfadapt-modal`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-selfadapt-modal` and add `RNSelfadaptModal.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNSelfadaptModal.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.jwt.selfadapt.RNSelfadaptModalPackage;` to the imports at the top of the file
  - Add `new RNSelfadaptModalPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-selfadapt-modal'
  	project(':react-native-selfadapt-modal').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-selfadapt-modal/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-selfadapt-modal')
  	```


## Usage
```javascript
import RNSelfadaptModal from 'react-native-selfadapt-modal';

// TODO: What to do with the module?
RNSelfadaptModal;
```
  