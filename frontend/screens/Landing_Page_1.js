import { View, Text, Image, Animated } from "react-native";
import { useEffect, useRef } from "react";
import React from "react";
import { fonts, sh, sw } from "../styles/GlobalStyles";
import { TouchableOpacity } from "react-native-gesture-handler";

const Landing_Page_1 = ({ navigation }) => {
    const toLogin = () => {
        navigation.navigate("Login");
    };
    const fadeAnim = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, []);
    return (
        <View
            style={{
                height: "100%",
                paddingHorizontal: sw(20),
                backgroundColor: "white",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Animated.Image
                source={require("../assets/myCFO.png")}
                style={{ height: sh(300), width: sw(300), opacity: fadeAnim }}
            ></Animated.Image>
            <Text style={{ fontFamily: fonts.interMedium, fontSize: 40 }}>
                My
                <Text
                    style={{
                        fontFamily: fonts.interBlack,
                        color: "rgb(46,58,148)",
                    }}
                >
                    CFO
                </Text>
            </Text>
            <TouchableOpacity onPress={toLogin}>
                <View
                    style={{
                        width: sw(250),
                        paddingHorizontal: sw(40),
                        paddingVertical: sh(13),
                        backgroundColor: "#5B69D6",
                        borderRadius: 13,
                        marginVertical: sh(20),
                        marginTop: sh(40),
                        alignItems: "center",
                    }}
                >
                    <Text
                        style={{
                            fontFamily: fonts.interSemiBold,
                            fontSize: 22,
                            color: "white",
                            alignSelf: "center",
                        }}
                    >
                        Start
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default Landing_Page_1;
