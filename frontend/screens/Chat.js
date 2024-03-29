import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors, fonts, sh, sw } from "../styles/GlobalStyles";

const MessageBubble = ({ message, time, isSender }) => (
    <View
        style={[
            styles.messageBubble,
            isSender ? styles.sender : styles.receiver,
        ]}
    >
        <Text style={styles.messageText}>{message}</Text>
        <Text style={styles.messageTime}>{time}</Text>
    </View>
);

const ActionButton = ({ text, onPress, backgroundColor }) => (
    <TouchableOpacity
        style={[styles.actionButton, { backgroundColor }]}
        onPress={onPress}
    >
        <Text style={styles.actionText}>{text}</Text>
    </TouchableOpacity>
);

const Chat = ({ navigation }) => {
    // const goToNextScreen = () => {
    //     navigation.navigate("Negotiation Results");
    // };
    const [chatInit, setChatInit] = useState(true);
    const chatInitMessage = [
        {
            id: 1,
            text: "How can I assist you today?",
            time: "12:34pm",
            isSender: false,
        },
        // {
        //     id: 2,
        //     text: "Hi, Jason, sorry to hear that, we proposed:",
        //     time: "12:36pm",
        //     isSender: false,
        // },
    ];
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([
        // {
        //     id: 1,
        //     text: "The root of my financial distress stems from a significant loss in business revenue, making it impossible to meet my current repayment terms. My intention is to avoid filing for bankruptcy by restructuring my debts and finding a feasible plan to fulfill my obligations.",
        //     time: "12:34pm",
        //     isSender: true,
        // },
        // {
        //     id: 2,
        //     text: "Hi, Jason, sorry to hear that, we proposed:",
        //     time: "12:36pm",
        //     isSender: false,
        // },
    ]);

    const sendMessage = () => {
        if (message.trim()) {
            const newMessage = {
                id: messages.length + 1,
                text: message,
                time: new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                }),
                isSender: true,
            };
            setMessages([...messages, newMessage]);
            setMessage("");
        }
    };

    return (
        <View style={styles.container}>
            {/* <TopBar /> */}
            {/* <View style={styles.doccard}>
                {/* <Image
                    source={require("../../../assets/Module_2/pdfIcon.png")}
                    style={styles.docicon}
                /> 
                <Text style={styles.doctext}>PersonalLoan_with _ELKL.pdf</Text>
            </View> */}
            <ScrollView
                style={styles.messagesContainer}
                ref={(scrollView) => {
                    this.scrollView = scrollView;
                }}
                onContentSizeChange={() =>
                    this.scrollView.scrollToEnd({ animated: true })
                }
            >
                {messages.map((msg, index) => (
                    <View key={msg.id}>
                        <MessageBubble
                            message={msg.text}
                            time={msg.time}
                            isSender={msg.isSender}
                        />
                        {msg.text.includes("we proposed:")}
                    </View>
                ))}
                {chatInit &&
                    chatInitMessage.map((msg, index) => (
                        <View key={msg.id}>
                            <View
                                style={[
                                    styles.messageBubble,
                                    msg.isSender
                                        ? styles.sender
                                        : styles.receiver,
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.messageText,
                                        { marginBottom: sh(10) },
                                    ]}
                                >
                                    {msg.text}
                                </Text>
                                <View
                                    style={{
                                        marginBottom: sh(10),
                                        paddingHorizontal: sw(20),
                                        paddingVertical: sh(5),
                                        borderRadius: 10,
                                        borderWidth: 1,
                                        borderColor: "#9F97F7",
                                    }}
                                >
                                    <Text
                                        style={[
                                            styles.messageText,
                                            { color: "#9F97F7" },
                                        ]}
                                    >
                                        Question 1...
                                    </Text>
                                </View>

                                <View
                                    style={{
                                        marginBottom: sh(10),
                                        paddingHorizontal: sw(20),
                                        paddingVertical: sh(5),
                                        borderRadius: 10,
                                        borderWidth: 1,
                                        borderColor: "#9F97F7",
                                    }}
                                >
                                    <Text
                                        style={[
                                            styles.messageText,
                                            { color: "#9F97F7" },
                                        ]}
                                    >
                                        Question 2...
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        marginBottom: sh(10),
                                        paddingHorizontal: sw(20),
                                        paddingVertical: sh(5),
                                        borderRadius: 10,
                                        borderWidth: 1,
                                        borderColor: "#9F97F7",
                                    }}
                                >
                                    <Text
                                        style={[
                                            styles.messageText,
                                            { color: "#9F97F7" },
                                        ]}
                                    >
                                        Question 3...
                                    </Text>
                                </View>
                                <Text style={styles.messageTime}>
                                    {msg.time}
                                </Text>
                            </View>
                        </View>
                    ))}
            </ScrollView>
            <View style={styles.inputContainer}>
                <TouchableOpacity style={styles.iconButton}>
                    <Ionicons name="mic" size={24} color="#5F84A1" />
                </TouchableOpacity>
                <TextInput
                    style={styles.input}
                    value={message}
                    onChangeText={setMessage}
                    placeholder="Type a message"
                    onSubmitEditing={sendMessage}
                />
                <TouchableOpacity
                    style={styles.iconButton}
                    onPress={sendMessage}
                >
                    <Ionicons name="send" size={24} color="#5F84A1" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    messagesContainer: {
        flex: 1,
    },
    messageBubble: {
        margin: 10,
        padding: 10,
        paddingRight: sw(30),
        borderRadius: 20,
        borderColor: "#5B69D6",
        backgroundColor: "#F4F5FF",
        borderWidth: 1,
        maxWidth: "80%",
    },
    sender: {
        alignSelf: "flex-end",
        backgroundColor: "#BAE1FF",
        borderBottomRightRadius: 0,
        padding: 15,
    },
    receiver: {
        alignSelf: "flex-start",
        backgroundColor: "#F8F9FE",
        borderBottomLeftRadius: 0,
        padding: 15,
    },
    messageText: {
        fontSize: 16,
    },
    messageTime: {
        alignSelf: "flex-end",
        fontSize: 12,
    },
    inputContainer: {
        flexDirection: "row",
        padding: 10,
    },
    input: {
        flex: 1,
        padding: 10,
        borderRadius: 20,
        backgroundColor: "#BAE1FF",
        marginRight: 10,
    },
    sendButtonText: {
        color: "#fff",
        fontSize: 24,
    },
    actionButton: {
        padding: 10,
        margin: 10,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    actionText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    topBar: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10,
        backgroundColor: "#FFF",
    },
    leftContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    rightContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    iconMargin: {
        marginLeft: 10,
    },
    logo: {
        height: 30,
        width: 30,
        marginRight: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderTopWidth: 1,
        borderTopColor: "#ECECEC",
        paddingVertical: 8,
        paddingHorizontal: 12,
        backgroundColor: "#fff",
    },
    input: {
        flex: 1,
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 20,
        paddingVertical: 0,
        paddingHorizontal: 12,
        marginHorizontal: 10,
        backgroundColor: "#F8F9FE",
        fontSize: 16,
    },
    iconButton: {
        padding: 8,
        alignItems: "center",
        justifyContent: "center",
    },
    doccard: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 8,
        padding: 15,
        marginTop: 10,
        marginLeft: 75,
        marginVertical: 5,
        backgroundColor: "#BAE1FF",
        margin: 10,
        borderBottomRightRadius: 0,
    },
    docicon: {
        width: 40,
        height: 40,
        marginRight: 10,
    },
    doctext: {
        flex: 1,
        fontSize: 16,
        fontWeight: "500",
        color: "#000",
    },
});

export default Chat;
