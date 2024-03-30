import React, { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { Path, Svg, Ellipse, Rect } from "react-native-svg";
import { sw, sh, fonts, colors } from "../styles/GlobalStyles.js";

import DonutChartContainer from "../components/Donut/DonutChartContainer.js";
import Transaction_Card from "../components/Transaction/Transaction_Card.js";

function Expenses_Main({ navigation }) {
    const [currentMonth, setCurrentMonth] = useState("March");
    const [selectedCategory, setSelectedCategory] = useState("key1");
    const data = [
        { key: "1", value: "Expenses" },
        { key: "2", value: "Income" },
        { key: "3", value: "Transfer" },
    ];

    const card_details_today = require("../data/MockData/Card_Details_Today.js");
    const card_details_ytd = require("../data/MockData/Card_Details_Yesterday.js");
    const toAddBudget = () => {
        navigation.navigate("Add_Expenses");
    };

    console.log(card_details_today);

    return (
        <View>
            <ScrollView
                style={{
                    backgroundColor: colors.white,
                    height: "100%",
                    position: "relative",
                }}
            >
                <View
                    style={[
                        styles.rowContainer,
                        {
                            marginHorizontal: sw(20),
                            marginVertical: sh(10),
                            justifyContent: "space-between",
                            position: "relative",

                            borderColor: "black",
                            alignItems: "flex-end",

                            height: sh(50),
                        },
                    ]}
                >
                    <View
                        style={[
                            styles.rowContainer,
                            {
                                marginHorizontal: sw(20),
                                gap: 10,
                            },
                        ]}
                    >
                        <View
                            style={{
                                height: sh(40),
                                width: sw(30),

                                borderColor: "#5B69D6",
                                borderWidth: 1,
                                borderRadius: 5,
                                alignItems: "center",
                            }}
                        >
                            <TouchableOpacity
                                style={{
                                    borderRadius: 5,
                                    alignItems: "center",
                                    justifyContent: "center",

                                    height: sh(40),
                                    width: sw(30),
                                }}
                            >
                                <Svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    fill="none"
                                >
                                    <Path
                                        stroke="#5B69D6"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="m15 6-6 6 6 6"
                                    />
                                </Svg>
                            </TouchableOpacity>
                        </View>

                        <Text
                            style={[
                                styles.cardDescription,
                                {
                                    color: "#5B69D6",
                                    fontSize: 20,

                                    alignSelf: "center",
                                },
                            ]}
                        >
                            {/* {currentMonth} */}
                            Mac 2024
                        </Text>

                        <View
                            style={{
                                height: sh(40),
                                width: sw(30),

                                borderColor: "#5B69D6",
                                borderWidth: 1,
                                borderRadius: 5,
                                alignItems: "center",
                            }}
                        >
                            <TouchableOpacity
                                style={{
                                    borderRadius: 5,
                                    alignItems: "center",
                                    justifyContent: "center",

                                    height: sh(40),
                                    width: sw(30),
                                }}
                            >
                                <Svg
                                    style={{ position: "absolute" }}
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    fill="none"
                                >
                                    <Path
                                        stroke="#5B69D6"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="m9 18 6-6-6-6"
                                    />
                                </Svg>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View
                    style={{
                        position: "absolute",
                        right: 0,
                        top: 55,
                        zIndex: 999,
                    }}
                >
                    <SelectList
                        dropdownStyles={{
                            position: "absolute",
                            right: 20,
                            top: 0,
                            zIndex: 100,
                            width: sw(130),
                            backgroundColor: "white",
                            borderColor: "#5B69D6", // Border color of dropdown items
                            borderWidth: 1, // Border width of dropdown items
                            borderRadius: 5, // Border radius of dropdown items
                            paddingVertical: sh(10), // Vertical padding of dropdown items
                        }}
                        setSelected={(val) => setSelectedCategory(val)}
                        fontFamily={fonts.interMedium}
                        data={data}
                        search={false}
                        boxStyles={{
                            position: "absolute",
                            right: 20,
                            bottom: 0,
                            borderRadius: 10,
                            width: sw(130),
                            borderColor: "#5B69D6",
                            paddingHorizontal: sw(10),
                            paddingVertical: sh(10),
                            alignItems: "center",
                            justifyContent: "space-between",

                            zIndex: 100,
                        }}

                        defaultOption={{ key: "1", value: "Expenses" }}
                    />
                </View>

                {/* <DonutChartContainer /> */}

                <View
                    style={[
                        styles.columnContainer,
                        { marginHorizontal: sw(20), marginVertical: sh(10) },
                    ]}
                >
                    <Text
                        style={[
                            styles.cardTitle,
                            { fontSize: 18, marginBottom: sh(10) },
                        ]}
                    >
                        Today
                    </Text>

                    {card_details_today &&
                        card_details_today.default.map((item, index) => (
                            <Transaction_Card
                                key={index}
                                category={item.category}
                                name={item.name}
                                description={item.description}
                                amount={item.amount}
                                time={item.time}
                            />
                        ))}
                </View>

                <View
                    style={[
                        styles.columnContainer,
                        { marginHorizontal: sw(20), marginVertical: sh(10) },
                    ]}
                >
                    <Text
                        style={[
                            styles.cardTitle,
                            { fontSize: 18, marginBottom: sh(10) },
                        ]}
                    >
                        Yesterday
                    </Text>

                    {card_details_ytd &&
                        card_details_ytd.default.map((item, index) => (
                            <Transaction_Card
                                key={index}
                                category={item.category}
                                name={item.name}
                                description={item.description}
                                amount={item.amount}
                                time={item.time}
                            />
                        ))}
                </View>
            </ScrollView>
            <View
                style={{
                    position: "absolute",
                    bottom: sh(20),
                    right: sw(20),
                    alignSelf: "flex-end",
                }}
            >
                <TouchableOpacity onPress={toAddBudget}>
                    <Svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={60}
                        height={60}
                        fill="none"
                        opacity={0.8}
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
                </TouchableOpacity>
            </View>
        </View>
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
        elevation: 5,
    },

    balanceContainer: {
        flexDirection: "column",
        gap: 4,
    },
    cardTitle: {
        fontFamily: fonts.interSemiBold,
        color: colors.black,
    },
    cardDescription: {
        fontFamily: fonts.interRegular,
        color: colors.black,
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
        // marginHorizontal: sw(20),
        flexDirection: "column",
    },
});
