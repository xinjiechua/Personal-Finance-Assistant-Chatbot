import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import axios from "axios";

const Home_Page_1 = () => {
    const sendRequest = async () => {
        const response1 = await axios.get("http://192.168.0.3:3000");
        const response2 = await axios.get("http://192.168.0.3:8000");
        console.log(response1.data);
        console.log(response2.data);
    };
    return (
        <TouchableOpacity onPress={sendRequest}>
            <View
                style={{
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    backgroundColor: "grey",
                }}
            >
                <Text>SEND REQUEST</Text>
            </View>
        </TouchableOpacity>
    );
};

export default Home_Page_1;
