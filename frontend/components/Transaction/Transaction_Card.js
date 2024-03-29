import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { sw, sh, fonts, colors } from "../../styles/GlobalStyles";
import ShoppingSVG from "./ShoppingSVG";
import EntertainmentSVG from "./EntertainmentSVG";
import FoodSVG from "./FoodSVG";
import SalarySVG from "./SalarySVG";
const Transaction_Card = ({ category, name, description, amount, time }) => {
    return (
        <View
            style={[
                styles.rowContainer,
                {
                    paddingHorizontal: sw(10),
                    paddingVertical: sh(10),
                    gap: 10,
                    justifyContent: "space-between",
                },
            ]}
        >
            <View style={[styles.rowContainer, { gap: 15 }]}>
                {name === "Shopping" && <ShoppingSVG />}
                {name === "Entertainment" && <EntertainmentSVG />}
                {name === "Food" && <FoodSVG />}
                {name === "Salary" && <SalarySVG />}

                <View
                    style={[
                        styles.columnContainer,
                        { justifyContent: "space-between" },
                    ]}
                >
                    <Text style={[styles.cardTitle, { marginTop: sh(5) }]}>
                        {name}
                    </Text>
                    <Text
                        style={[
                            styles.cardDescription,
                            {
                                alignSelf: "flex-end",
                                marginBottom: sh(5),
                                color: "#91919F",
                            },
                        ]}
                    >
                        {description}
                    </Text>
                </View>
            </View>

            <View
                style={[
                    styles.columnContainer,
                    {
                        justifyContent: "space-between",
                    },
                ]}
            >
                <Text
                    style={
                        category === "Expenses"
                            ? [
                                  styles.cardTitle,
                                  {
                                      marginTop: sh(5),
                                      alignSelf: "flex-end",
                                      color: "#FD3C4A",
                                  },
                              ]
                            : [
                                  styles.cardTitle,
                                  {
                                      marginTop: sh(5),
                                      alignSelf: "flex-end",
                                      color: "#00A86B",
                                  },
                              ]
                    }
                >
                    {category === "Expenses"
                        ? `-RM ${amount}`
                        : `+RM ${amount}`}
                </Text>
                <Text
                    style={[
                        styles.cardDescription,
                        {
                            alignSelf: "flex-end",
                            marginBottom: sh(5),
                            alignSelf: "flex-end",
                            color: "#91919F",
                        },
                    ]}
                >
                    {time}
                </Text>
            </View>
        </View>
    );
};

export default Transaction_Card;

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
