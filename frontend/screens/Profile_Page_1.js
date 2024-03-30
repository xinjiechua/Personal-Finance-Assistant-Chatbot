import React, { useContext } from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GlobalContext } from "../context/index";
import { fonts, logo, sh, sw } from "../styles/GlobalStyles";
import RenderProfileMainItem from "../components/Profile/RenderProfileMainItem";



function Profile_Page_1({ navigation, route }) {
    const { currentUsername, setCurrentUsername } = useContext(GlobalContext);
    const { setIsAuth } = route.params;
    const handleLogout = () => {
        setIsAuth(false);
    };

    if (currentUsername == "") {
        setCurrentUsername("Ahmad");
    }

    const ProfileEditPage = () => {
        navigation.navigate("ProfileEditPage");
    };
    const ProfileNotificationPage = () => {
        navigation.navigate("ProfileNotificationPage");
    };
    const ProfileHelpCenterPage = () => {
        navigation.navigate("ProfileHelpCenter");
    };
    const ProfileCTOSPage = () => {
        navigation.navigate("ProfileCTOSPage");
    };
    const ProfileFeedbackPage = () => {
        navigation.navigate("ProfileFeedbackPage");
    };
    const ProfileReportPage = () => {
        navigation.navigate("ProfileReport");
    };

    const mockData1 = [
        {
            icon: logo.profile_icon,
            title: "Edit Profile",
            navigation: ProfileEditPage,
            index: 1,
        },
        {
            icon: logo.notification_icon,
            title: "Notifications",
            navigation: ProfileNotificationPage,
            index: 2,
        },
        {
            icon: logo.lock_icon,
            title: "Privacy & Security",
            navigation: () => {},
            index: 3,
        },
        {
            icon: logo.ctos_icon,
            title: "CTOS Check",
            navigation: ProfileCTOSPage,
            index: 4,
        },
        {
            icon: logo.help_icon,
            title: "Help Center",
            navigation: ProfileHelpCenterPage,
            index: 5,
        },
        {
            icon: logo.problem_icon,
            title: "Report a Problem",
            navigation: ProfileReportPage,
            index: 6,
        },
        {
            icon: logo.feedback_icon,
            title: "Send feedback",
            navigation: ProfileFeedbackPage,
            index: 7,
        },
        {
            icon: logo.tnc_icon,
            title: "Terms & Conditions",
            navigation: () => {},
            index: 8,
        },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.upperHalfCircle}></View>
                <TouchableOpacity style={styles.avatarContainerStyle}>
                    <Image
                        source={require("../assets/pfp.png")}
                    ></Image>
                    <Text style={styles.usernameStyle}>{currentUsername}</Text>
                </TouchableOpacity>
                <View style={styles.contentContainer}>
                    {mockData1.map(({ icon, title, navigation, index }) => {
                        return (
                            <RenderProfileMainItem
                                icon={icon}
                                title={title}
                                navigation={navigation}
                                index={index}
                            />
                        );
                    })}
                </View>
                <View style={styles.footer}>
                    <TouchableOpacity
                        style={styles.buttonContainer}
                        onPress={handleLogout}
                    >
                        <Text style={styles.buttonText}>Log Out</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default Profile_Page_1;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
    },
    upperHalfCircle: {
        position: "absolute",
        // top: sh(-650),
        top: sh(-720),
        left: sw(-200), // left must be the 1/4 of the total width
        width: sw(800),
        aspectRatio: 1,
        backgroundColor: "#EDEFFF",
        borderRadius: sw(400),
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
    },
    avatarContainerStyle: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: sh(80),
        zIndex: 99,
    },
    usernameStyle: {
        marginVertical: sh(10),
        fontSize: sw(22),
        fontFamily: fonts.interSemiBold,
        color: "#5F84A1",
    },
    contentContainer: {
        flex: 1,
        marginHorizontal: sw(20),
        marginVertical: sh(20),
        backgroundColor: "#F6F7FA",
        borderRadius: sw(10),
        alignItems: "center",
        justifyContent: "center",
        shadowOffset: { width: 0, height: sh(4) },
        shadowOpacity: 0.3,
    },
    buttonContainer: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 99,
    },
    buttonText: {
        fontSize: sw(18),
        fontFamily: fonts.interSemiBold,
        color: "#ff9C9C",
    },
    footer: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "#FFF4F4",
        borderColor: "#ff9C9C",
        borderWidth: 1,
        margin: sw(20),
        paddingVertical: sh(20),
        borderRadius: sw(10),
        shadowOffset: { width: 0, height: sh(4) },
        shadowOpacity: 0.3,
    },
});