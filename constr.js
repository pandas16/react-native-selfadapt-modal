
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const basePx = 375;
const Size = function (font) {
    return font * screenWidth / basePx;
}

module.exports ={screenWidth,screenHeight,Size};
