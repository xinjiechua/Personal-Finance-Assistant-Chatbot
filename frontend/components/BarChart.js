import { BarChart } from "react-native-gifted-charts";
import { StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import { IP_ADD } from "../url";
import { colors, fonts, sh, sw } from "../styles/GlobalStyles";
import RenderItem from "./Donut/RenderItem";
const BarChartComponent = () => {
    const [barData, setBarData] = useState([]);
    const [labelData, setLabelData] = useState([]);
    const userId = "1";
    const colors = [
        "#E5D8FF",
        "#FFF0D4",
        "#FDCED0",
        "#CAFDEA",
        "#BCDAFC",
        "#FFD8D8",
        "#FFE5D9",
        "#FFF3D9",
        "#D7E4FF",
        "#C6F1E7",
        "#D4F9DC",
        "#FFEEDD",
        "#FFDEE9",
        "#FFD8D8",
        "#F4F4F4",
    ];

    const fetchData = async () => {
        // Define an async function to fetch data
        try {
            const response = await axios.get(
                `http://${IP_ADD}:3000/transactions/${userId}/category`
            );
            const fetchedData = response.data;
            console.log(response.data);
            const totalAmount = fetchedData.reduce(
                (acc, item) => acc + item.totalAmount,
                0
            );

            const processedData = fetchedData
                .map((item, index) => ({
                    value: (item.totalAmount / totalAmount) * 100,
                    label: item.category,
                    frontColor: colors[index % colors.length],
                }))
                .slice(0, 5);
            setBarData(processedData);

            const newLabelData = processedData.map((element, index) => ({
                name: element.label,
                color: colors[index],
            }));
            setLabelData(newLabelData);

            // setBarData(response.data); // Update state with fetched data
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    useEffect(() => {
        fetchData(); // Call the async function
    }, []); // Empty dependency array to run effect only once

    // const barData = [
    //     { value: 250, label: 'M' },
    //     { value: 500, label: 'T', frontColor: '#177AD5' },
    //     { value: 745, label: 'W', frontColor: '#177AD5' },
    //     { value: 320, label: 'T' },
    //     { value: 600, label: 'F', frontColor: '#177AD5' },
    //     { value: 256, label: 'S' },
    //     { value: 300, label: 'S' },
    // ];
    return (
        <View
            style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: sw(20),
                paddingVertical: sh(20),
            }}
        >
            <View style={{}}>
                <BarChart
                    // width="90%"
                    // rotateLabel={90}
                    // horizontal
                    isAnimated
                    barWidth={25}
                    barBorderRadius={4}
                    frontColor="lightgray"
                    data={barData}
                    yAxisThickness={0}
                    xAxisThickness={2}
                    xAxisLabelsHeight={0}
                    hideOrigin
                    yAxisLabelWidth={sw(30)}
                    yAxisTextStyle={[
                        styles.cardDescription,
                        { color: "#666666" },
                    ]}
                />
            </View>

            <View style={{}}>
                {labelData.map((item, index) => (
                    <RenderItem key={index} item={item} />
                ))}
            </View>
        </View>
    );
};

export default BarChartComponent;

const styles = StyleSheet.create({
    cardDescription: {
        fontFamily: fonts.interSemiBold,
        color: colors.white,
    },
});
