import React from "react";
import { View } from "react-native";
import { LineChart, BarChart, PieChart } from "react-native-chart-kit";
import { sh, sw } from "../styles/GlobalStyles";

const ChartComponent = ({ jsonData }) => {
    const { type, data } = jsonData;

    let ChartToRender = null;

    switch (type) {
        case "line":
            ChartToRender = (
                <LineChart
                    data={{
                        labels: data.x,
                        datasets: [
                            {
                                data: data.y,
                                color: (opacity = 1) =>
                                    `rgba(100, 100, 219,${opacity})`,
                            },
                        ],
                    }}
                    width={sw(300)}
                    height={sh(200)}
                    chartConfig={{
                        backgroundGradientFrom: "#fff",
                        backgroundGradientTo: "#fff",
                        decimalPlaces: 0,
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        style: {
                            borderRadius: 16,
                        },
                        propsForLabels: {
                            fontFamily: "Arial",
                            fontSize: 9,
                        },
                        useShadowColorFromDataset: true,
                    }}
                />
            );
            break;
        case "bar":
            ChartToRender = (
                <BarChart
                    data={{
                        labels: data.x,
                        datasets: [{ data: data.y }],
                    }}
                    width={sw(300)}
                    height={200}
                    chartConfig={{
                        backgroundGradientFrom: "#fff",
                        backgroundGradientTo: "#fff",
                        decimalPlaces: 0,
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        style: {
                            borderRadius: 16,
                        },
                        propsForLabels: {
                            fontFamily: "Arial",
                            fontSize: 11,
                        },
                        fillShadowGradient: "#6464DB",
                    }}
                />
            );
            break;
        case "pie":
            const pieColors = [
                "#3EDAD8",
                "#48D6FD",
                "#9ADCFF",
                "#9BB7D9",
                "#9197C8",
            ];
            ChartToRender = (
                <PieChart
                    data={data.y.map((value, index) => ({
                        name: data.x[index],
                        value,
                        color: pieColors[index % pieColors.length],
                    }))}
                    width={sw(300)}
                    height={200}
                    chartConfig={{
                        backgroundGradientFrom: "#fff",
                        backgroundGradientTo: "#fff",
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    }}
                    accessor="value"
                    backgroundColor="transparent"
                    paddingLeft="15"
                />
            );
            break;
        case "forecast":
            const n = 5;
            const actualLabels = data.actualdata.x.map((label, index) =>
                index % n === 0 ? label : ""
            );
            const forecastLabels = data.forecastdata.x.map((label, index) =>
                index % n === 0 ? label : ""
            );

            ChartToRender = (
                <LineChart
                    data={{
                        labels: [...actualLabels, ...forecastLabels],
                        legend: ["Actual", "Forecast"],
                        datasets: [
                            {
                                data: [
                                    ...data.actualdata.y,
                                    ...Array(data.forecastdata.y.length).fill(
                                        null
                                    ),
                                ],
                                color: (opacity = 1) =>
                                    `rgba(100, 100, 219,${opacity})`,
                                strokeWidth: 4,
                                withDots: false,
                            },
                            {
                                data: [
                                    ...Array(data.actualdata.y.length).fill(
                                        null
                                    ),
                                    ...data.forecastdata.y,
                                ],
                                color: (opacity = 1) =>
                                    `rgba(255, 100, 100,${opacity})`,
                                strokeWidth: 4,
                                withDots: false,
                            },
                        ],
                    }}
                    width={sw(300)}
                    height={200}
                    // verticalLabelRotation={45}
                    chartConfig={{
                        backgroundGradientFrom: "#fff",
                        backgroundGradientTo: "#fff",
                        decimalPlaces: 0,
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        style: {
                            borderRadius: 16,
                        },
                        propsForLabels: {
                            fontFamily: "Arial",
                            fontSize: 11,
                        },
                        fillShadowGradientFrom: "rgba(255, 255, 255, 0.5)",
                        fillShadowGradientTo: "rgba(255, 255, 255, 0.5)",
                    }}
                />
            );
            break;
        default:
            ChartToRender = null;
            break;
    }

    return <View>{ChartToRender}</View>;
};

export default ChartComponent;
