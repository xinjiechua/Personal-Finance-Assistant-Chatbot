import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import React from "react";
import Animated, { FadeInDown, FadeOutDown } from "react-native-reanimated";
import { sw, sh } from "../../../../styles/GlobalStyles";

const RenderItem = ({ item, index }) => {
    return (
        <Animated.View
            style={[styles.container, { width: sw(150) }]}
            entering={FadeInDown.delay(index * 200)}
            exiting={FadeOutDown}
        >
            <View style={styles.contentContainer}>
                <View style={[styles.color, { backgroundColor: item.color }]} />
                <Text style={styles.text}>{item.name}</Text>
                <Text style={styles.text}>{item.percentage}%</Text>
            </View>
        </Animated.View>
    );
};

export default RenderItem;

const styles = StyleSheet.create({
    container: {
        paddingVertical: sh(8),
        marginBottom: sh(10),

        borderRadius: sw(20),
    },
    contentContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 5,
    },
    color: {
        width: sw(20),
        height: sh(20),
        borderRadius: sw(10),
    },
    text: {
        fontSize: 14,

        color: "#8C97A7",
    },
});
