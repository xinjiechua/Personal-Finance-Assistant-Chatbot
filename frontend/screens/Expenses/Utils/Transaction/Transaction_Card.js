import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { sw, sh, fonts, colors } from "../../../../styles/GlobalStyles";
import ShoppingSVG from "./ShoppingSVG";
import EntertainmentSVG from "./EntertainmentSVG";
import FoodSVG from "./FoodSVG";
import SalarySVG from "./SalarySVG";

const Transaction_Card = ({ category, name, description, amount, time }) => {
    const isExpense = category !== "Income/Salary" && category !== "Income" && category !== "Refund";

    const getCategoryIcon = (category) => {
        switch (category) {
            case "Shopping":
                return <ShoppingSVG />;
            case "Entertainment":
            case "Other Expenses":
            case "Government Services":
            case "Travel":
                return <EntertainmentSVG />;
            case "Dining":
            case "Food":
                return <FoodSVG />;
            case "Income":
            case "Income/Salary":
            case "Refund":
                return <SalarySVG />;
            default:
                return <ShoppingSVG />;
        }
    };

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
            <View style={[styles.rowContainer, { flex: 1 }]}>

                {getCategoryIcon(category)}
                <View
                    style={[
                        styles.columnContainer,
                        { marginLeft: 15, flex: 1 },
                    ]}
                >
                    <Text style={[styles.cardTitle]} numberOfLines={1}>
                        {name}
                    </Text>
                    <Text
                        style={[
                            styles.cardDescription,
                        ]}
                        numberOfLines={2} // Limit description to two lines
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
        fontSize: 14,
    },
    cardDescription: {
        fontFamily: fonts.interRegular,
        color: "#91919F",
        fontSize: 13,
        flexShrink: 1, // Ensure text shrinks to avoid pushing out other elements
    },
    // Ensure amount text has some space to "push" against if description is long
    amount: {
        fontFamily: fonts.interSemiBold,
        fontSize: 13,
        minWidth: sw(60), // Set a minimum width for the amount
    },
    rowContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    columnContainer: {
        flexDirection: "column",
        justifyContent: "space-between",
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
