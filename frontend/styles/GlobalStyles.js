
import { Dimensions } from "react-native";
const designed_on_width = 412;
const designed_on_height = 892;

// scale width & height
const sw = (width) =>
    (Dimensions.get("window").width * width) / designed_on_width;
const sh = (height) =>
    (Dimensions.get("window").height * height) / designed_on_height;
export { sw, sh };

export const colors = {
    aliceBlue: "#DBECF4",
    columbiaBlue: "#CBDEED",
    columbiaBlue2: "#B6D0E1",
    powderBlue: "#90AFC4",
    aliForceBlue: "#5F84A1",
    indigoDye: "#1A4568",
    black: "#000000",
    white: "#FFFFFF"
};

export const fonts = {
    interBlack: "InterBlack",
    interExtraLight: "InterExtraLight",
    interLight: "InterMedium",
    interMedium: "InterMedium",
    interRegular: "InterRegular",
    interSemiBold: "InterSemiBold",
    interThin: "InterThin",
    openSansBold: "OpenSansBold",
};

export const logo = {

}
