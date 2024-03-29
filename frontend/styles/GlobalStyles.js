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
    aliForceBlue: "#5B69D6",
    indigoDye: "#1A4568",
    black: "#000000",
    white: "#FFFFFF",
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
    profile_icon: require("../assets/Profile_Main_Page_Profile_Logo.png"),
    notification_icon: require("../assets/Profile_Main_Page_Notification_Logo.png"),
    lock_icon: require("../assets/Profile_Main_Page_Lock_Logo.png"),
    ctos_icon: require("../assets/Profile_Main_Page_CTOS_Logo.png"),
    help_icon: require("../assets/Profile_Main_Page_Help_Logo.png"),
    problem_icon: require("../assets/Profile_Main_Page_Problem_Logo.png"),
    feedback_icon: require("../assets/Profile_Main_Page_Feedback_Logo.png"),
    tnc_icon: require("../assets/Profile_Main_Page_TNC_Logo.png"),
};

