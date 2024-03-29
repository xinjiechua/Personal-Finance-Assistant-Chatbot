import React from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { sw, sh, fonts, colors } from "../../styles/GlobalStyles";
import { LinearGradient } from "expo-linear-gradient";
import { LineChart } from "react-native-gifted-charts";
import { Path, Circle, Svg, Ellipse } from "react-native-svg";
import { AreaChart, XAxis } from "react-native-svg-charts";
import * as Progress from "react-native-progress";

import * as shape from "d3-shape";
import DonutChartContainer from "./Utils/DonutChart/DonutChartContainer";

function Expenses_Main({ navigation }) {
    const toChat = () => {
        navigation.navigate("Chat");
    };

    const toTransactionPage = () => {
        navigation.navigate("Expenses_Transaction");
    };

    const toAddBudget = () => {
        navigation.navigate("Expenses_Add_1");
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

    return (
        <ScrollView style={{ backgroundColor: colors.white, height: '100%' }}>
            <View >
                <Text style={{ fontFamily: fonts.interSemiBold, fontSize: 22, alignSelf: 'center' }}>Dashboard</Text>
                <LinearGradient
                    style={styles.cardContainer}
                    colors={['#6D7BE9', '#5B69D6', '#2E3A94']}
                    start={{ x: 0.4, y: -0.9 }}
                    end={{ x: 0, y: 0 }}
                    locations={[0, 0.3, 1]}
                >
                    <View style={styles.balanceContainer}>
                        <Text style={[styles.cardTitle, { fontSize: 18 }]}>Total Balance</Text>
                        <Text style={[styles.cardDescription, { fontSize: 30 }]}>RM 2548.00</Text>
                    </View>

                    <View style={styles.rowContainer}>
                        <View style={[styles.columnContainer, { flex: 1 }]}>
                            <View style={styles.subTitleContainer}>
                                <Image source={require('../../assets/images/expenses_arrow_up.png')} />
                                <Text style={[styles.subTitleText, { fontSize: 16, color: '#D0DAE5' }]}>Income</Text>
                            </View>
                            <Text style={[styles.subTitleText, { fontSize: 20 }]}>RM 1840.00</Text>
                        </View>
                        <View style={styles.columnContainer}>
                            <View style={styles.subTitleContainer}>
                                <Image source={require('../../assets/images/expenses_arrow_down.png')} />
                                <Text style={[styles.subTitleText, { fontSize: 16, color: '#D0DAE5' }]}>Expenses</Text>
                            </View>
                            <Text style={[styles.subTitleText, { fontSize: 20 }]}>RM 544.00</Text>
                        </View>
                    </View>
                </LinearGradient>
            </View>

            <DonutChartContainer />

            <View
                style={[
                    styles.rowContainer,
                    {
                        marginHorizontal: sw(20),
                        justifyContent: 'space-between',
                        alignItems: 'flex-end',
                    },
                ]}
            >

                <Text style={[styles.cardTitle, { color: colors.black, fontSize: 18, flex: 1 }]}>
                    Trend Analysis
                </Text>
                <TouchableOpacity onPress={toTransactionPage}>
                    <Text
                        style={[
                            {
                                fontFamily: fonts.interMedium,
                                color: '#5B69D6',
                                fontSize: 18,
                            },
                        ]}
                    >
                        See All
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={[styles.chartContainer]}>
                <View style={styles.rowContainer}>
                    {/* <YAxis
                        svg={{
                            fill: "",
                            fontSize: 15,
                        }}
                        contentInset={{ top: 20, bottom: 20 }}
                        data={yLabels}
                        min={0}
                        max={100}
                        numberOfTicks={yLabels.length}
                        formatLabel={(value) => `${value}`}
                    /> */}
                    {/* <AreaChart
                        style={{
                            height: sh(230),
                            marginHorizontal: sw(20),
                            flex: 1,
                        }}
                        data={data}
                        contentInset={{ top: 30, bottom: 30 }}
                        curve={shape.curveNatural}
                        svg={{ fill: "rgba(95, 132, 161, 0.3)" }}
                        // yAccessor={({ item }) => item.value}
                        // xAccessor={({ item }) => item.month}
                    >
                        {/* <Grid /> 

                        <Line />
                    </AreaChart> */}

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
                        yAxisTextStyle={[styles.cardDescription, { color: '#666666' }]}
                        xAxisLabelTextStyle={[styles.cardDescription, { color: '#666666' }]}
                        spacing={60}
                        // hideYAxisText
                        noOfSections={5}
                        xAxisThickness={0}
                        yAxisThickness={0}
                    />
                </View>
                {/* <XAxis
                    data={xLabels}
                    contentInset={{ left: 30, right: 30 }}
                    svg={{
                        fill: "rgb(102,102,102)",
                        fontSize: 15,
                    }}
                    numberOfTicks={xLabels.length}
                    formatLabel={(value, index) => xLabels[index]}
                /> */}
            </View>

            {/* details parent frame */}
            <View
                style={[
                    styles.columnContainer,
                    {
                        paddingVertical: sh(10),
                        paddingHorizontal: sw(20),
                        gap: 5,
                        position: 'relative',
                        borderTopLeftRadius: 25,
                        borderTopRightRadius: 25,
                        backgroundColor: '#fafafa',
                        shadowColor: '#000',
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 5,
                    },
                ]}
            >
                {/* details header frame
                <View style={[styles.columnContainer]}>
                    <Text style={[styles.cardTitle, { color: colors.black, fontSize: 18 }]}>Budgets</Text>
                    <View
                        style={[
                            styles.rowContainer,
                            {
                                justifyContent: 'space-between',

                                alignItems: 'center',
                            },
                        ]}
                    >
                        <Text style={[styles.subTitleText, { color: '#91919F', flex: 1 }]}>This month</Text>
                        <View
                            style={[
                                styles.rowContainer,
                                {
                                    gap: 15,
                                },
                            ]}
                        >
                            <View style={[styles.rowContainer, { gap: 1, alignItems: 'center' }]}>
                                <Svg
                                    height="24"
                                    width="24"
                                >
                                    <Circle
                                        cx="11"
                                        cy="11"
                                        r="8"
                                        fill="#B5FFE3"
                                    />
                                </Svg>
                                <Text style={[styles.subTitleText, { color: '#91919F' }]}>In limit</Text>
                            </View>
                            <View style={[styles.rowContainer, { gap: 1, alignItems: 'center' }]}>
                                <Svg
                                    height="24"
                                    width="24"
                                >
                                    <Circle
                                        cx="11"
                                        cy="11"
                                        r="8"
                                        fill="#FFD1D3"
                                    />
                                </Svg>
                                <Text style={[styles.subTitleText, { color: '#91919F' }]}>Overspend</Text>
                            </View>
                        </View>
                    </View>
                </View> */}

                {/* details frame */}
                {/* <View style={[styles.columnContainer, { gap: 10 }]}>
                    <View style={[styles.columnContainer]}>
                        <Text style={[styles.cardTitle, { color: colors.black, fontSize: 18 }]}>Food</Text>

                        <View
                            style={[
                                styles.rowContainer,
                                {
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                },
                            ]}
                        >
                            <Text
                                style={[
                                    {
                                        fontFamily: fonts.interRegular,
                                        color: colors.black,
                                        fontSize: 18,
                                        flex: 1,
                                    },
                                ]}
                            >
                                RM600 Spent
                            </Text>
                            <Text
                                style={[
                                    {
                                        fontFamily: fonts.interRegular,
                                        color: colors.black,
                                        fontSize: 18,
                                    },
                                ]}
                            >
                                RM1000
                            </Text>
                        </View>
                    </View>
                    <Progress.Bar
                        progress={0.5}
                        color="#B5FFE3"
                        width={sw(370)}
                        height={sh(10)}
                    />
                </View>

                {/* details frame */}
                {/*                 
                <View style={[styles.columnContainer, { gap: 10 }]}>
                    <View style={[styles.columnContainer]}>
                        <Text style={[styles.cardTitle, { color: colors.black, fontSize: 18 }]}>Clothing</Text>

                        <View
                            style={[
                                styles.rowContainer,
                                {
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                },
                            ]}
                        >
                            <Text
                                style={[
                                    {
                                        fontFamily: fonts.interRegular,
                                        color: colors.black,
                                        fontSize: 18,
                                        flex: 1,
                                    },
                                ]}
                            >
                                RM100 Spent
                            </Text>
                            <Text
                                style={[
                                    {
                                        fontFamily: fonts.interRegular,
                                        color: colors.black,
                                        fontSize: 18,
                                    },
                                ]}
                            >
                                RM500
                            </Text>
                        </View>
                    </View>
                    <Progress.Bar
                        progress={1}
                        color="#FFD1D3"
                        height={sh(10)}
                        width={sw(370)}
                    />
                </View>

                <TouchableOpacity onPress={toAddBudgetBottom}>
                    <View
                        style={{
                            marginTop: sh(10),
                            paddingHorizontal: sw(15),
                            paddingVertical: sh(30),
                            backgroundColor: 'rgba(128, 128, 128, 0.1)',
                            width: '40%',
                            borderRadius: 10,
                            justifyContent: 'center',
                        }}
                    >
                        <Text
                            style={[
                                styles.cardTitle,
                                {
                                    color: '#5B69D6',
                                    fontSize: 16,
                                    position: 'absolute',
                                    alignSelf: 'center',
                                },
                            ]}
                        >
                            Add Budget +
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View
                style={{
                    position: 'absolute',
                    bottom: 5,
                    right: 15,
                    alignSelf: 'flex-end',
                }}
            >
                <TouchableOpacity onPress={toAddBudget}>
                    <Svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={60}
                        height={60}
                        fill="none"
                        opacity={0.4}
                    >
                        <Ellipse
                            cx={30.526}
                            cy={29.698}
                            fill="#5B69D6"
                            rx={29.474}
                            ry={29.698}
                        />
                        <Path
                            fill="#000"
                            stroke="#FCFCFC"
                            strokeWidth={2.5}
                            d="M31.085 30.067H29.84v11.864a.071.071 0 0 1-.067.07.07.07 0 0 1-.046-.02.072.072 0 0 1-.02-.05V30.067H17.931a.07.07 0 0 1-.07-.067.071.071 0 0 1 .07-.067h11.774V18.145a.07.07 0 0 1 .115-.029.072.072 0 0 1 .019.029v11.788H41.665l.048-.004c.01 0 .02 0 .029.004l.409-1.185-.41 1.185a.07.07 0 0 1 .042.039l1.139-.502-1.139.502a.07.07 0 0 1 .006.028h1.245-1.245a.072.072 0 0 1-.047.067.07.07 0 0 1-.029.004l-.048-.004h-10.58Z"
                        />
                    </Svg>
                </TouchableOpacity> */}



            </View>
        </ScrollView>

    );
}

export default Expenses_Main;

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
