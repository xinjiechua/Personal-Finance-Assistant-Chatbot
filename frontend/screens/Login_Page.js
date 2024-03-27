import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const Login_Page = ({ route }) => {
    const { setIsAuth } = route.params;
    const handleLogin = () => {
        setIsAuth(true);
    };

    return (
        <View>
            <Text>Login_Page</Text>
            <TouchableOpacity onPress={handleLogin}>
                <Text>LOGIN</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Login_Page;
