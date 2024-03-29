import React, { useEffect, useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { Path, Svg, Ellipse, Rect } from "react-native-svg";
import { sw, sh, fonts, colors } from "../../styles/GlobalStyles";

import DonutChartContainer from "./Utils/DonutChart/DonutChartContainer.js";
import Transaction_Card from "./Utils/Transaction/Transaction_Card.js";

function Expenses_Transaction({ navigation }) {
    const [transactions, setTransactions] = useState([]);
    const [currentMonth, setCurrentMonth] = useState("March");
    const [selectedCategory, setSelectedCategory] = useState("key1");
    const data = [
        { key: "1", value: "Expenses" },
        { key: "2", value: "Income" },
    ];


    const card_details_today = require("./MockData/Card_Details_Today.js");
    const card_details_ytd = require("./MockData/Card_Details_Yesterday.js");
    const toAddBudget = () => {
        navigation.navigate("Expenses_Add_1");
    };

    const fetchTransactions = async () => {
        try {
            const response = await fetch('http://10.0.2.2:3000/transactions/1');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setTransactions(data); // Assuming data is an array of transactions
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    };

    // console.log(card_details_today);

    const [transactionsByDate, setTransactionsByDate] = useState({});

    const categorizeTransactions = (allTransactions) => {
        const sorted = {};
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        allTransactions.forEach((transaction) => {
            const transactionDate = new Date(transaction.date);
            const formattedDate = transactionDate.toLocaleDateString('en-GB'); // Format like '26/3/2024'
            const todayFormatted = today.toLocaleDateString('en-GB');
            const yesterdayFormatted = yesterday.toLocaleDateString('en-GB');

            if (formattedDate === todayFormatted) {
                if (!sorted['Today']) sorted['Today'] = [];
                sorted['Today'].push(transaction);
            } else if (formattedDate === yesterdayFormatted) {
                if (!sorted['Yesterday']) sorted['Yesterday'] = [];
                sorted['Yesterday'].push(transaction);
            } else {
                if (!sorted[formattedDate]) sorted[formattedDate] = [];
                sorted[formattedDate].push(transaction);
            }
        });

        setTransactionsByDate(sorted);
    };

    // Modify the useEffect that fetches the transactions
    useEffect(() => {
        const fetchData = async () => {
            await fetchTransactions(); // Fetch and set to `transactions`
        };
        fetchData();
    }, []);

    // New useEffect to sort transactions after fetching
    useEffect(() => {
        if (transactions.length) {
            categorizeTransactions(transactions);
        }
    }, [transactions]);

    // Function to render transactions sorted by date
    const renderSortedTransactions = () => {
        const sortedDates = Object.keys(transactionsByDate).sort((a, b) => {
            if (a === 'Today') return -1;
            if (b === 'Today') return 1;
            if (a === 'Yesterday') return -1;
            if (b === 'Yesterday') return 1;
            return new Date(b) - new Date(a);
        });

        return sortedDates.map((date) => (
            <View dkey={date} style={styles.columnContainer}>
                <Text style={styles.cardTitle}>{date}</Text>
                {transactionsByDate[date].map((item) => (
                    <Transaction_Card
                        dkey={item.id}
                        category={item.category}
                        name={item.transaction_details}
                        description={item.description}
                        amount={item.withdrawal_amt + item.deposit_amt}
                    // Removed 'time', as you no longer need it
                    />
                ))}
            </View>
        ));
    };








    return (
        <View style={{ flex: 1, position: 'relative' }}>
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
                    style={{ position: "absolute", right: 0, top: 55, zIndex: 999 }}
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





                <View
                    style={[
                        styles.columnContainer,
                        { marginHorizontal: sw(20), marginVertical: sh(10) },
                    ]}
                >
                    {renderSortedTransactions()}
                </View>

            </ScrollView>

            <View
                style={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    alignSelf: "flex-end",
                }}
            >
                <TouchableOpacity onPress={toAddBudget} style={styles.floatingActionButton}>
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



export default Expenses_Transaction;

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
    floatingActionButton: {
        position: 'absolute',
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
        floatingActionButton: {
            position: 'absolute',
            width: 60,
            height: 60,
            alignItems: 'center',
            justifyContent: 'center',
            right: 30,
            bottom: 30,
            backgroundColor: '#5B69D6',
            borderRadius: 30,
            elevation: 4,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

        },
        borderRadius: 30,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

    },
});
