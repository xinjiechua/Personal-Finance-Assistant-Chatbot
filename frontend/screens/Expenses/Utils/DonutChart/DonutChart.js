import { StyleSheet, View } from "react-native";
import React from "react";
import { SharedValue, useDerivedValue } from "react-native-reanimated";
import { Canvas, Path, SkFont, Skia, Text } from "@shopify/react-native-skia";
import DonutPath from "./DonutPath";
import { sw, sh } from "../../../../styles/GlobalStyles";

// type Props = {
//     n: number;
//     gap: number;
//     radius: number;
//     strokeWidth: number;
//     outerStrokeWidth: number;
//     decimals: SharedValue<number[]>;
//     colors: string[];
//     totalValue: SharedValue<number>;
//     font: SkFont;
// };

const DonutChart = ({
    n,
    gap,
    decimals,
    colors,
    totalValue,
    strokeWidth,
    outerStrokeWidth,
    radius,
    font,
}) => {
    const array = Array.from({ length: n });
    const innerRadius = radius - outerStrokeWidth / 2;

    const path = Skia.Path.Make();
    path.addCircle(radius, radius, innerRadius);

    const targetText = useDerivedValue(
        () => `$${Math.round(totalValue.value * 100) / 100}`,
        []
    );

    // Placeholder for the value
    const fontSize = font.measureText("$" + totalValue);

    const textX = useDerivedValue(() => {
        const _fontSize = font.measureText(targetText.value);
        return radius - _fontSize.width / 2;
    }, []);

    return (
        <View style={styles.container}>
            <Canvas style={styles.container}>
                <Path
                    path={path}
                    color="#f4f7fc"
                    style="fill"
                    strokeWidth={outerStrokeWidth}
                    start={0}
                    end={1}
                />
                {array.map((_, index) => {
                    return (
                        <DonutPath
                            key={index}
                            radius={radius}
                            strokeWidth={strokeWidth}
                            outerStrokeWidth={outerStrokeWidth}
                            color={colors[index]}
                            decimals={decimals}
                            index={index}
                            gap={gap}
                        />
                    );
                })}
                <Text
                    x={textX}
                    y={radius + fontSize.height / 2}
                    text={targetText}
                    font={font}
                    color="black"
                />
            </Canvas>
        </View>
    );
};

export default DonutChart;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
