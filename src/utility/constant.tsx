import { Dimensions, Platform } from "react-native";


export const IS_ANDROID = Platform.OS === 'android';
export const WIDTH = Dimensions.get('screen').width;
export const HEIGHT = Dimensions.get('screen').height;
export const baseUrl = "http://feeds.bbci.co.uk/";