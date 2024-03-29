import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { sw, sh, fonts, colors } from "../../../../styles/GlobalStyles";
import ShoppingSVG from "./ShoppingSVG";
import EntertainmentSVG from "./EntertainmentSVG";
import FoodSVG from "./FoodSVG";
import SalarySVG from "./SalarySVG";
const Transaction_Card = ({ category, name, description, amount, time }) => {
    const isExpense = category !== "Income/Salary";
    return (
        <View
            style={[
                styles.rowContainer,
                {
                    paddingHorizontal: sw(10),
                    paddingVertical: sh(10),
                    justifyContent: "space-between",
                },
            ]}
        >
            <View style={[styles.rowContainer]}>
                {name === "Shopping" && <ShoppingSVG />}
                {name === "Entertainment" && <EntertainmentSVG />}
                {name === "Food" && <FoodSVG />}
                {name === "Salary" && <SalarySVG />}

                <View
                    style={[
                        styles.columnContainer,
                        { marginLeft: 15 },
                    ]}
                >
                    <Text style={[styles.cardTitle]}>
                        {name}
                    </Text>
                    <Text
                        style={[
                            styles.cardDescription,
                        ]}
                    >
                        {description}
                    </Text>
                </View>
            </View>

            <Text
                style={
                    isExpense
                        ? [styles.amount, { color: "#FD3C4A" }]
                        : [styles.amount, { color: "#00A86B" }]
                }
            >
                {isExpense ? `-RM ${amount.toFixed(2)}` : `+RM ${amount.toFixed(2)}`}
            </Text>
        </View>
    );
};


export default Transaction_Card;

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: "column",
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

    cardTitle: {
        fontFamily: fonts.interSemiBold,
        color: colors.black,
        fontSize: 15,
    },
    cardDescription: {
        fontFamily: fonts.interRegular,
        color: "#91919F",
        fontSize: 13,
    },
    rowContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    columnContainer: {
        flexDirection: "column",
        justifyContent: "space-between",
    },
    amount: {
        fontFamily: fonts.interSemiBold,
        fontSize: 15,
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
