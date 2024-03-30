import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    KeyboardAvoidingView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TypingAnimation } from "react-native-typing-animation";
import axios from "axios";
import { colors, fonts, sh, sw } from "../styles/GlobalStyles";
import { IP_ADD } from "../url";
import ChartComponent from "../components/ChartComponent";

const MessageBubble = ({ message, time, isSender, chartData }) => (
    <View
        style={[
            styles.messageBubble,
            isSender ? styles.sender : styles.receiver,
        ]}
    >
        <Text style={styles.messageText}>{message}</Text>
        {chartData && <ChartComponent jsonData={chartData} />}
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

    const [recommend1Message, setRecommend1Message] = useState(
        "What are my spendings on coffee?"
    );
    const [recommend2Message, setRecommend2Message] = useState("Question 2...");
    const [recommend3Message, setRecommend3Message] = useState("Question 3...");
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
    const [botTurn, setBotTurn] = useState(true);
    const [loading, setLoading] = useState(false);
    const [thread, setThread] = useState(null);

    const sendMessage = (message) => {
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
            setMessages((prevMessages) => [...prevMessages, newMessage]);
            console.log("send", message);
            setMessage("");

            setChatInit(false);

            setBotTurn(true);
            setLoading(true);
            makeResponse(message);
            // setTimeout(makeResponse, 3000);
        }
    };

    const makeResponse = async (user_message) => {
        
        const response = await axios.post(
            `http://${IP_ADD}:8000/umhack_app/chatbot/send_message`,
            {
                thread_id: thread,
                message: user_message,
                
            }
        );
        
        if (thread == null) {
            setThread(response.data.thread_id);
        }
        console.log(response.data);
        let preData = {};
        if (response.data.data_visualisation_response !== null) {
            preData = {
                type: response.data.data_visualisation_response[0],
                data: response.data.data_visualisation_response[1],
            };
        }
        // preprocess chartData
        
        // console.log(preData.data.x)
        // console.log(preData.data.y);
        const newMessage = {
            id: messages.length + 1,
            text: response.data.responded_message,
            time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            }),
            isSender: false,
            chartData: preData
            
        };
        setBotTurn(false);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setLoading(false);
        console.log("receive", messages);
    };

    useEffect(() => {
        if (messages.length > 0 && botTurn) {
            const timer = setTimeout(makeResponse, 3000);
            return () => clearTimeout(timer);
        }
    }, [messages]);

    const selectRecommend1 = () => {
        sendMessage(recommend1Message);
    };

    const selectRecommend2 = () => {
        sendMessage(recommend2Message);
    };

    const selectRecommend3 = () => {
        sendMessage(recommend3Message);
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
                    <View>
                        <MessageBubble
                            message={msg.text}
                            time={msg.time}
                            isSender={msg.isSender}
                            chartData={msg.chartData}
                        />
                        {msg.text.includes("we proposed:")}
                    </View>
                ))}
                {loading && (
                    <View
                        style={[
                            styles.messageBubble,
                            styles.receiver,
                            {
                                alignItems: "center",
                            },
                        ]}
                    >
                        <TypingAnimation
                            style={{
                                borderColor: "black",
                                // borderWidth: 1,
                                padding: 7,
                            }}
                            dotColor="#5B69D6"
                            dotMargin={5}
                            dotAmplitude={3}
                            dotSpeed={0.15}
                            dotRadius={2.5}
                            dotX={12}
                            dotY={6}
                        />
                    </View>
                )}
                {chatInit &&
                    chatInitMessage.map((msg, index) => (
                        <View>
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

                                <TouchableOpacity onPress={selectRecommend1}>
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
                                            {recommend1Message}
                                        </Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={selectRecommend2}>
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
                                            {recommend2Message}
                                        </Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={selectRecommend3}>
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
                                            {recommend3Message}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                                <Text style={styles.messageTime}>
                                    {msg.time}
                                </Text>
                            </View>
                        </View>
                    ))}
            </ScrollView>
            <KeyboardAvoidingView
                behavior="padding"
                keyboardVerticalOffset={sh(94)}
            >
                <View style={styles.inputContainer}>
                    <TouchableOpacity style={styles.iconButton}>
                        <Ionicons name="mic" size={24} color="#5F84A1" />
                    </TouchableOpacity>
                    <TextInput
                        style={styles.input}
                        value={message}
                        onChangeText={setMessage}
                        placeholder="Type a message"
                        onSubmitEditing={() => sendMessage(message)}
                    />
                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={() => sendMessage(message)}
                    >
                        <Ionicons name="send" size={24} color="#5F84A1" />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
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
        marginBottom: 26,
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
