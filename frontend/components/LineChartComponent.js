import { LineChart } from "react-native-gifted-charts";
import { StyleSheet, View, Text } from "react-native";
import { IP_ADD } from "../url";
import axios from "axios";
import { useEffect, useState } from "react";
import { colors, fonts, sh, sw } from "../styles/GlobalStyles";
const LineChartComponent = () => {
    // const xAxisLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
    // const lineData = [
    //     { value: 0 },
    //     { value: 10 },
    //     { value: 8 },
    //     { value: 58 },
    //     { value: 56 },
    //     { value: 78 },
    //     { value: 74 },
    //     { value: 98 },
    // ];
    // const lineData2 = [
    //     { value: 0 },
    //     { value: 20 },
    //     { value: 18 },
    //     { value: 40 },
    //     { value: 36 },
    //     { value: 60 },
    //     { value: 54 },
    //     { value: 85 },
    // ];
    const userId = "1";
    const [lineData, setLineData] = useState([]);
    const fetchData = async () => {
        try {
            const response = await axios.get(
                `http://${IP_ADD}:3000/transactions/${userId}/line`
            );
            const fetchedData = response.data;
            setLineData(fetchedData);
        } catch (err) {
            console.log(err);
        }
    };
    const weekNumbers = Object.keys(lineData);

    // Mapping the response data to format expected by the LineChart component
    const lineData1 = weekNumbers.map((week) => ({
        value: lineData[week].totalExpenses, // Using totalExpenses as the value for Line 1
    }));

    const lineData2 = weekNumbers.map((week) => ({
        value: lineData[week].totalIncome, // Using totalIncome as the value for Line 2
    }));

    // Mapping the week numbers to months for xAxisLabels
    const xAxisLabels = weekNumbers.map((week) => {
        // console.log(week)
        // Assuming week format is "YYYY-Wn", extract the week number and year
        const [year, weekNumber] = week.split("-W");
        // Convert the week number to a month (assuming each month has 4 weeks)
        const monthIndex = Math.ceil(Number(weekNumber) / 4);
        // Get the month name from its index (adjust index as needed)
        const monthNames = ["J", "F", "M", "A", "M", "J"];
        return `${monthNames[monthIndex - 1]}`;
    });
    const maxTotal = Math.max(
        ...lineData1.map((data) => data.value),
        ...lineData2.map((data) => data.value)
    );

    console.log(xAxisLabels);
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <View style={{ flexDirection: "column", gap: sh(40) }}>
            <View>
                <Text
                    style={[
                        styles.cardTitle,
                        { color: colors.black, fontSize: 18, flex: 1 },
                    ]}
                >
                    Expenses (RM)
                </Text>
                <LineChart
                    areaChart
                    curved
                    data={lineData1}
                    stepValue={7000}
                    // maxValue={8000}
                    // data2={lineData2}
                    height={300}
                    showVerticalLines
                    spacing={50}
                    initialSpacing={0}
                    color1="#5b69d6"
                    // color2="orange"
                    textColor1="green"
                    // hideDataPoints
                    yAxisLabelWidth={50}
                    dataPointsColor1="#5b69d6"
                    startFillColor1="#5b69d6"
                    // startFillColor2="orange"
                    startOpacity={0.8}
                    endOpacity={0.3}
                    xAxisLabelTexts={xAxisLabels}
                    yAxisThickness={0}
                    // width={"90%"}
                    width={sw(300)}
                    yAxisTextStyle={[
                        styles.cardDescription,
                        { color: "#666666" },
                    ]}
                />
            </View>

            <View>
                <Text
                    style={[
                        styles.cardTitle,
                        { color: colors.black, fontSize: 18, flex: 1 },
                    ]}
                >
                    Income (RM)
                </Text>
                <LineChart
                    areaChart
                    curved
                    data={lineData2}
                    stepValue={20000}
                    // data2={lineData2}
                    height={300}
                    width={sw(290)}
                    showVerticalLines
                    spacing={50}
                    initialSpacing={0}
                    color1="#83baec"
                    textColor1="green"
                    // hideDataPoints
                    yAxisLabelWidth={60}
                    yAxisThickness={0}
                    dataPointsColor1="#83baec"
                    startFillColor1="#83baec"
                    startOpacity={0.8}
                    endOpacity={0.3}
                    xAxisLabelTexts={xAxisLabels}
                    yAxisTextStyle={[
                        styles.cardDescription,
                        { color: "#666666" },
                    ]}
                />
            </View>
        </View>
    );
};

export default LineChartComponent;
const styles = StyleSheet.create({
    cardTitle: {
        fontFamily: fonts.interSemiBold,

        color: colors.white,
    },
    cardDescription: {
        fontFamily: fonts.interSemiBold,
        color: colors.white,
    },
});
