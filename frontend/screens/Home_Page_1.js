import React, { useState, useEffect } from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { sw, sh, fonts, colors } from "../styles/GlobalStyles";
import { LinearGradient } from "expo-linear-gradient";
import { LineChart } from "react-native-gifted-charts";
import { Path, Circle, Svg, Ellipse } from "react-native-svg";
import { AreaChart, XAxis } from "react-native-svg-charts";
import * as Progress from "react-native-progress";
import * as shape from "d3-shape";
import DonutChartContainer from "../components/Donut/DonutChartContainer";
import axios from "axios";
import { IP_ADD } from "../url";
import Testing from "../components/BarChart";
import BarChartComponent from "../components/BarChart";
import LineChartComponent from "../components/LineChartComponent";

function Home_Page_1({ navigation }) {
    const toTransactionPage = () => {
        navigation.navigate("Testing");
    };

    const toChat = () => {
        navigation.navigate("Chat");
    };

    const toAddBudgetBottom = () => {
        navigation.navigate("Expenses_Budget");
    };

    // const data = [50, 10, 40, 95, 30, 24, 85, 91, 35, 53, 53, 24];
    // const xLabels = [
    //     "Jan",
    //     "Feb",
    //     "Mar",
    //     "Apr",
    //     "May",
    //     "Jun",
    //     // "Jul",
    //     // "Aug",
    //     // "Sep",
    //     // "Oct",
    //     // "Nov",
    //     // "Dec",
    // ];
    const data = [
        { value: 35 },
        { value: 40 },
        { value: 30 },
        { value: 15 },
        { value: 30 },
        { value: 20 },
    ];

    const xAxisLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

    const yLabels = ["Poor", "Fair", "Good", "Very Good", "Excellent"];

    const Line = ({ line }) => (
        <Path
            key={"line"}
            d={line}
            stroke={"rgb(95, 132, 161)"}
            fill={"none"}
        />
    );

    const userId = "1";
    
    const [totalBalance, setTotalBalance] = useState(0);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [totalIncome, setTotalIncome] = useState(0);
    const fetchResponse = async () => {
        const response = await axios.get(
            `http://${IP_ADD}:3000/transactions/${userId}/balance`
        );
        const { totalAmount, totalBalance, totalExpenses } = response.data;

        // Round off the values to 2 decimal places
        const roundedTotalBalance = parseFloat(totalBalance).toFixed(2);
        const roundedTotalExpenses = parseFloat(totalExpenses).toFixed(2);
        const roundedTotalIncome = parseFloat(totalAmount).toFixed(2);

        // Set the rounded values to state variables
        setTotalBalance(roundedTotalBalance);
        setTotalExpenses(roundedTotalExpenses);
        setTotalIncome(roundedTotalIncome);
        
    };

    useEffect(() => {
        fetchResponse();
    }, []);

    return (
        <View>
            <ScrollView
                style={{ backgroundColor: colors.white, height: "100%" }}
            >
                <View
                    style={{
                        height: sh(200),
                        backgroundColor: "rgba(109,123,233,0.5)",
                        paddingTop: sh(30),
                        marginBottom: sh(50),
                    }}
                >
                    {/* <Text
                    style={{
                        fontFamily: fonts.interSemiBold,
                        fontSize: 22,
                        alignSelf: "center",
                    }}
                >
                    Expenses
                </Text> */}
                    <LinearGradient
                        style={styles.cardContainer}
                        colors={["#7499B6", "#5F84A1", "#2E3A94"]}
                        start={{ x: 0.38, y: -0.9 }}
                        end={{ x: 0, y: 0 }}
                        locations={[0, 0.3, 1]}
                    >
                        <View style={styles.balanceContainer}>
                            <Text style={[styles.cardTitle, { fontSize: 18 }]}>
                                Total Balance
                            </Text>
                            <Text
                                style={[
                                    styles.cardDescription,
                                    { fontSize: 30 },
                                ]}
                            >
                                RM{totalBalance}
                            </Text>
                        </View>

                        <View style={styles.rowContainer}>
                            <View style={[styles.columnContainer, { flex: 1 }]}>
                                <View style={styles.subTitleContainer}>
                                    <Image
                                        source={require("../assets/expenses_arrow_up.png")}
                                    />
                                    <Text
                                        style={[
                                            styles.subTitleText,
                                            { fontSize: 16, color: "#D0DAE5" },
                                        ]}
                                    >
                                        Income
                                    </Text>
                                </View>
                                <Text
                                    style={[
                                        styles.subTitleText,
                                        { fontSize: 20 },
                                    ]}
                                >
                                    RM{totalIncome}
                                </Text>
                            </View>
                            <View style={styles.columnContainer}>
                                <View style={styles.subTitleContainer}>
                                    <Image
                                        source={require("../assets/expenses_arrow_down.png")}
                                    />
                                    <Text
                                        style={[
                                            styles.subTitleText,
                                            { fontSize: 16, color: "#D0DAE5" },
                                        ]}
                                    >
                                        Expenses
                                    </Text>
                                </View>
                                <Text
                                    style={[
                                        styles.subTitleText,
                                        { fontSize: 20 },
                                    ]}
                                >
                                    RM{totalExpenses}
                                </Text>
                            </View>
                        </View>
                    </LinearGradient>
                </View>
                {/* <DonutChartContainer data={chartExpensesData} /> */}
                <BarChartComponent />
                <View
                    style={[
                        styles.rowContainer,
                        {
                            marginHorizontal: sw(20),
                            marginVertical: sh(0),
                            justifyContent: "space-between",
                            alignItems: "flex-end",
                        },
                    ]}
                >
                    <Text
                        style={[
                            styles.cardTitle,
                            { color: colors.black, fontSize: 18, flex: 1 },
                        ]}
                    >
                        Trend Analysis
                    </Text>

                    <TouchableOpacity onPress={toTransactionPage}>
                        <Text
                            style={[
                                {
                                    fontFamily: fonts.interMedium,
                                    color: "#5F84A1",
                                    fontSize: 18,
                                },
                            ]}
                        >
                            See All
                        </Text>
                    </TouchableOpacity>
                </View>
                
                <View style={[styles.chartContainer]}>
                    {/* <View style={styles.rowContainer}>
                        <LineChart
                            isAnimated
                            areaChart
                            color="#07BAD1"
                            curved
                            data={data}
                            width={sw(400)}
                            rulesLength={sw(330)}
                            maxValue={50}
                            startFillColor="rgb(46, 217, 255)"
                            startOpacity={0.8}
                            endFillColor="rgb(203, 241, 250)"
                            endOpacity={0.3}
                            xAxisLabelTexts={xAxisLabels}
                            yAxisTextStyle={[
                                styles.cardDescription,
                                { color: "#666666" },
                            ]}
                            xAxisLabelTextStyle={[
                                styles.cardDescription,
                                { color: "#666666" },
                            ]}
                            spacing={60}
                            // hideYAxisText
                            noOfSections={5}
                            xAxisThickness={0}
                            yAxisThickness={0}
                        />
                    </View> */}
                    <LineChartComponent />
                </View>

                {/* details parent frame */}
            </ScrollView>
            <View
                style={{
                    position: "absolute",
                    bottom: 5,
                    right: 15,
                    alignSelf: "flex-end",
                }}
            >
                <TouchableOpacity onPress={toChat} style={{ opacity: 0.75 }}>
                    {/* <Svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={60}
                        height={60}
                        fill="none"
                        opacity={0.4}
                    >
                        <Ellipse
                            cx={30.526}
                            cy={29.698}
                            fill="#5F84A1"
                            rx={29.474}
                            ry={29.698}
                        />
                        <Path
                            fill="#000"
                            stroke="#FCFCFC"
                            strokeWidth={2.5}
                            d="M31.085 30.067H29.84v11.864a.071.071 0 0 1-.067.07.07.07 0 0 1-.046-.02.072.072 0 0 1-.02-.05V30.067H17.931a.07.07 0 0 1-.07-.067.071.071 0 0 1 .07-.067h11.774V18.145a.07.07 0 0 1 .115-.029.072.072 0 0 1 .019.029v11.788H41.665l.048-.004c.01 0 .02 0 .029.004l.409-1.185-.41 1.185a.07.07 0 0 1 .042.039l1.139-.502-1.139.502a.07.07 0 0 1 .006.028h1.245-1.245a.072.072 0 0 1-.047.067.07.07 0 0 1-.029.004l-.048-.004h-10.58Z"
                        />
                    </Svg> */}
                    <Image
                        source={require("../assets/chatbot_home.png")}
                    ></Image>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default Home_Page_1;

const styles = StyleSheet.create({
    cardContainer: {
        display: "flex",
        flexDirection: "column",
        gap: 20,
        paddingHorizontal: sw(24),
        paddingVertical: sh(15),
        marginVertical: sh(15),
        marginHorizontal: sw(20),
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 10,
    },
    balanceContainer: {
        flexDirection: "column",
        gap: 4,
    },
    cardTitle: {
        fontFamily: fonts.interSemiBold,

        color: colors.white,
    },
    cardDescription: {
        fontFamily: fonts.interSemiBold,
        color: colors.white,
    },
    rowContainer: { flexDirection: "row" },
    columnContainer: { flexDirection: "column" },
    subTitleContainer: {
        flexDirection: "row",
        gap: 5,
    },
    subTitleText: {
        fontFamily: fonts.interMedium,
        color: colors.white,
    },
    chartContainer: {
        // marginHorizontal: sw(10),
        // borderColor: "black",
        // borderWidth: 1,
        padding: sw(20),
        flexDirection: "column",
    },
});
