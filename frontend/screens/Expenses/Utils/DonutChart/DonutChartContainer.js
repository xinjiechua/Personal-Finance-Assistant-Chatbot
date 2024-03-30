/* eslint-disable react-native/no-inline-styles */
import React, { useState } from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import DonutChart from "./DonutChart";
import { useFont, SkFont, Skia, SkRect } from "@shopify/react-native-skia";
import { SharedValue, useDerivedValue } from "react-native-reanimated";
import { useSharedValue, withTiming } from "react-native-reanimated";
import { calculatePercentage } from "./calculatePercentage";
import RenderItem from "./RenderItem";
import { SafeAreaView } from "react-native-safe-area-context";
import { sw, sh, fonts } from "../../../../styles/GlobalStyles";


const RADIUS = sw(100);
const STROKE_WIDTH = sw(30);
const OUTER_STROKE_WIDTH = sw(40);
const GAP = 0.02;

const DonutChartContainer = () => {
    const n = 5;
    const totalValue = useSharedValue(0);
    const decimals = useSharedValue([]);
    const colors = ["#E5D8FF", "#FFF0D4", "#FDCED0", "#CAFDEA", "#BCDAFC"];
    const debtNumbers = [37, 25, 16, 14, 8];
    const debtNames = [
        "Food",
        "Housing",
        "Transportation",
        "Apparel",
        "Entertainment",
    ];
    const total = debtNumbers.reduce(
        (acc, currentValue) => acc + currentValue,
        0
    );
    const generatePercentages = calculatePercentage(debtNumbers, total);
    const generateDecimals = generatePercentages.map(
        (number) => Number(number.toFixed(0)) / 100
    );
    totalValue.value = withTiming(total, { duration: 1000 });
    decimals.value = [...generateDecimals];

    const arrayOfObjects = debtNumbers.map((value, index) => ({
        name: debtNames[index],
        value,
        percentage: generatePercentages[index],
        color: colors[index],
    }));

    const data = arrayOfObjects;

    const font = useFont(
        require("../../../../assets/fonts/Inter-Bold.ttf"),
        sw(20)
    );

    if (!font) {
        return <View />;
    }

    return (
        <ScrollView
            contentContainerStyle={{ alignItems: "center" }}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.monthlyPaymentContainer}>
                <View style={styles.chartAndLabel}>
                    <View style={styles.chartContainer}>
                        <DonutChart
                            radius={RADIUS}
                            gap={GAP}
                            strokeWidth={STROKE_WIDTH}
                            outerStrokeWidth={OUTER_STROKE_WIDTH}
                            font={font}
                            totalValue={totalValue}
                            n={n}
                            decimals={decimals}
                            colors={colors}
                        />
                    </View>
                    <View style={styles.labels}>
                        {data.map((item, index) => {
                            return (
                                <RenderItem
                                    item={item}
                                    key={index}
                                    index={index}
                                />
                            );
                        })}
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    mainTitle: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        fontSize: sw(20),
        fontWeight: "bold",
    },
    monthlyPaymentContainer: {
        flex: 1,
        marginTop: sh(10),
        // backgroundColor: "#FFFFFF",
        alignItems: "flex-start",
        borderRadius: 10,
    },
    container: {
        flex: 1,
        // backgroundColor: "#DFEEF8",
    },
    chartAndLabel: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: sw(20),
    },
    labels: {
        flex: 1,
        flexDirection: "column",
    },
    chartContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: sw(RADIUS * 2 + sw(20)),
        height: sh(RADIUS * 2 + sh(20)),
    },
    titleContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        margin: sh(20),
    },
    title: {
        flex: 1,
        justifyContent: "flex-start",
    },
});

export default DonutChartContainer;
