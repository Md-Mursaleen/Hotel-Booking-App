import { Dimensions, Platform, PixelRatio } from "react-native";

const { width: Screen_Width } = Dimensions.get("window");
const scale = Screen_Width / 360;

export function pixelNormalSize(size) {
    const newSize = size * scale;
    if (Platform.OS === "ios") {
        return Math.round(PixelRatio.roundToNearestPixel(newSize));
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
    }
};