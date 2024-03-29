import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors, sw, sh, fonts } from "../styles/GlobalStyles";
import { Svg, Path } from "react-native-svg";
import { Keyboard } from "react-native";
import Expenses_Tab_1 from "../components/Transaction/Expenses_Tab_1";
import Expenses_Tab_2 from "../components/Transaction/Expenses_Tab_2";
import Expenses_Tab_3 from "../components/Transaction/Expenses_Tab_2";
const Add_Transaction = ({ navigation, route }) => {
    //state of each tab
    const [isPressed1, setIsPressed1] = useState(true);
    const [isPressed2, setIsPressed2] = useState(false);
    const [isPressed3, setIsPressed3] = useState(false);

    //for Expenses Component
    const [openDate, setOpenDate] = useState(false);
    const [date, setDate] = useState(new Date());
    const [account, setAccount] = useState("");
    const [category, setCategory] = useState("");
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");

    const openCalendar = () => {
        setOpenDate(true);
    };

    const closeCalendar = () => {
        setOpenDate(false);
        setIncomeOpenDate(false);
        setTransferOpenDate(false);
    };

    const formatDate = (date) => {
        let formattedDate = new Intl.DateTimeFormat("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        }).format(date);

        return formattedDate;
    };

    const handleDateChange = ({ type }, selectedDate) => {
        if (type === "set") {
            setOpenDate(false);
            setDate(selectedDate);
        } else {
            setOpenDate(false);
        }
    };

    //for Income Component
    const [incomeOpenDate, setIncomeOpenDate] = useState(false);
    const [incomeDate, setIncomeDate] = useState(new Date());
    const [incomeAccount, setIncomeAccount] = useState("");
    const [incomeCategory, setIncomeCategory] = useState("");
    const [incomeAmount, setIncomeAmount] = useState("");
    const [incomeDescription, setIncomeDescription] = useState("");

    const openIncomeCalendar = () => {
        setIncomeOpenDate(true);
    };

    const handleIncomeDateChange = ({ type }, selectedDate) => {
        if (type === "set") {
            setIncomeOpenDate(false);
            setIncomeDate(selectedDate);
            // setBudgetDate(selectedDate.toDateString()); // Convert date to string format and set it to the input
        } else {
            setIncomeOpenDate(false);
        }
    };

    //for Transfer Component
    const [transferOpenDate, setTransferOpenDate] = useState(false);
    const [transferDate, setTransferDate] = useState(new Date());
    const [transferToInput, setTransferToInput] = useState("");
    const [transferFromInput, setTransferFromInput] = useState("");
    const [transferAmount, setTransferAmount] = useState("");
    const [transferDescription, setTransferDescription] = useState("");

    const openTransferCalendar = () => {
        setTransferOpenDate(true);
    };

    const handleTransferDateChange = ({ type }, selectedDate) => {
        if (type === "set") {
            setTransferOpenDate(false);
            setTransferDate(selectedDate);
            // setBudgetDate(selectedDate.toDateString()); // Convert date to string format and set it to the input
        } else {
            setTransferOpenDate(false);
        }
    };

    const handlePress1 = () => {
        setIsPressed1(true);
        setIsPressed2(false);
        setIsPressed3(false);
    };

    const handlePress2 = () => {
        setIsPressed1(false);
        setIsPressed2(true);
        setIsPressed3(false);
    };

    const handlePress3 = () => {
        setIsPressed1(false);
        setIsPressed2(false);
        setIsPressed3(true);
    };

    const dismissKeyboard = () => {
        Keyboard.dismiss();
        closeCalendar();
    };

    const scanReceipt = () => {
        navigation.navigate("Open_Camera");
    };

    const goBackToPreviousPage = () => {
        navigation.goBack();
    };

    useEffect(() => {
        if (route.params && route.params.transactionDetails) {
            // console.log(route.params);
            const transactionDetails = route.params.transactionDetails;
            // console.log(transactionDetails);
            setDate(transactionDetails.date);
            setAccount(transactionDetails.account);
            setCategory(transactionDetails.category);
            setDescription(transactionDetails.description);
            setAmount(transactionDetails.amount);
        }
    });
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.wrapper}
        >
            <TouchableWithoutFeedback onPress={dismissKeyboard}>
                <View
                    style={{
                        backgroundColor: colors.white,
                        height: "100%",
                    }}
                >
                    <View
                        style={[
                            styles.columnContainer,
                            {
                                marginHorizontal: sw(20),
                                marginTop: sh(30),
                                gap: 10,
                            },
                        ]}
                    >
                        {/* <View
                            style={[
                                styles.rowContainer,
                                {
                                    justifyContent: "flex-end",
                                    marginTop: sh(10),
                                },
                            ]}
                        >
                            <TouchableOpacity onPress={scanReceipt}>
                                <Svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={25}
                                    height={30}
                                    fill="none"
                                >
                                    <Path
                                        fill="#000"
                                        fillRule="evenodd"
                                        d="M10.663 4.5a1.57 1.57 0 0 0-1.398.83l-.41.788C8.412 6.965 7.51 7.5 6.524 7.5H5.208c-.863 0-1.562.672-1.562 1.5v9c0 .828.7 1.5 1.562 1.5h14.584c.863 0 1.562-.672 1.562-1.5V9c0-.828-.7-1.5-1.562-1.5h-1.317c-.986 0-1.888-.535-2.33-1.382l-.41-.789a1.57 1.57 0 0 0-1.398-.829h-3.674Zm-2.33.382c.441-.847 1.343-1.382 2.33-1.382h3.674c.987 0 1.889.535 2.33 1.382l.41.789c.265.508.806.829 1.398.829h1.317c1.438 0 2.604 1.12 2.604 2.5v9c0 1.38-1.166 2.5-2.604 2.5H5.208c-1.438 0-2.604-1.12-2.604-2.5V9c0-1.38 1.166-2.5 2.604-2.5h1.317a1.57 1.57 0 0 0 1.397-.83l.411-.788Z"
                                        clipRule="evenodd"
                                    />
                                    <Path
                                        fill="#000"
                                        fillRule="evenodd"
                                        d="M12.5 9.5c-2.014 0-3.646 1.567-3.646 3.5s1.633 3.5 3.646 3.5c2.014 0 3.646-1.567 3.646-3.5S14.513 9.5 12.5 9.5ZM7.812 13c0-2.485 2.1-4.5 4.688-4.5 2.589 0 4.688 2.015 4.688 4.5s-2.1 4.5-4.688 4.5c-2.589 0-4.688-2.015-4.688-4.5Z"
                                        clipRule="evenodd"
                                    />
                                    <Path
                                        fill="#000"
                                        d="M9.59 26.09c0 .607-.108 1.134-.324 1.583a2.506 2.506 0 0 1-.892 1.04c-.377.244-.811.366-1.302.366-.49 0-.925-.122-1.304-.366a2.513 2.513 0 0 1-.889-1.04c-.214-.449-.32-.976-.32-1.582 0-.606.106-1.133.32-1.58.216-.448.514-.795.892-1.04.38-.246.813-.369 1.301-.369.491 0 .925.123 1.302.37.378.244.676.59.892 1.04.216.446.323.973.323 1.579Zm-.518 0c0-.52-.087-.966-.26-1.337a2.002 2.002 0 0 0-.714-.855 1.832 1.832 0 0 0-1.026-.296c-.38 0-.721.099-1.022.296-.301.197-.54.48-.716.852-.174.371-.262.818-.262 1.34 0 .522.088.968.262 1.339.174.371.412.656.713.855.301.197.643.296 1.025.296.383 0 .725-.099 1.026-.296.303-.197.542-.481.716-.852.174-.373.26-.82.258-1.341Zm6.36-1.09h-.535a1.657 1.657 0 0 0-.216-.551 1.705 1.705 0 0 0-.386-.446 1.76 1.76 0 0 0-.529-.296 1.893 1.893 0 0 0-.639-.105c-.367 0-.703.096-1.006.287-.3.192-.542.473-.724.844-.18.37-.27.822-.27 1.358 0 .54.09.994.27 1.363.182.37.423.65.724.841.303.19.639.284 1.006.284.23 0 .442-.035.64-.105a1.706 1.706 0 0 0 .915-.739c.103-.17.175-.354.215-.553h.534a2.334 2.334 0 0 1-.267.747c-.129.23-.293.43-.494.602a2.222 2.222 0 0 1-.688.404c-.26.096-.544.145-.855.145-.489 0-.922-.123-1.301-.367a2.506 2.506 0 0 1-.892-1.04c-.214-.447-.321-.974-.321-1.582 0-.608.107-1.136.32-1.582.217-.447.514-.793.893-1.037.379-.247.813-.37 1.301-.37.31 0 .596.049.855.145.26.095.489.23.688.404A2.303 2.303 0 0 1 15.43 25Zm1.247 4v-5.818h1.878c.413 0 .757.075 1.034.224.278.148.488.354.628.617.142.261.213.561.213.9 0 .34-.071.639-.213.898-.14.26-.349.462-.625.608-.277.146-.62.219-1.029.219h-1.6v-.486h1.586c.303 0 .555-.05.756-.15a.993.993 0 0 0 .452-.43c.1-.185.15-.405.15-.659a1.4 1.4 0 0 0-.15-.664 1.03 1.03 0 0 0-.455-.444c-.2-.104-.455-.156-.761-.156H17.21V29h-.531Zm2.565-2.625L20.676 29h-.613l-1.418-2.625h.6Z"
                                    />
                                </Svg>
                            </TouchableOpacity>
                        </View> */}
                        <View
                            style={[
                                styles.rowContainer,
                                {
                                    alignSelf: "center",
                                    marginVertical: sh(10),
                                    
                                },
                            ]}
                        >
                            <TouchableOpacity onPress={handlePress1}>
                                <View
                                    style={
                                        isPressed1
                                            ? [
                                                  styles.tabContainer,
                                                  {
                                                      borderTopRightRadius: 0,
                                                      borderBottomRightRadius: 0,
                                                      borderColor: "#5B69D6",
                                                      borderWidth: 1,
                                                      
                                                  },
                                              ]
                                            : [
                                                  styles.tabContainer,
                                                  {
                                                      borderColor: "#5B69D6",
                                                      borderWidth: 1,
                                                      backgroundColor:
                                                          colors.white,
                                                      borderTopRightRadius: 0,
                                                      borderBottomRightRadius: 0,
                                                  },
                                              ]
                                    }
                                >
                                    <Text
                                        style={
                                            isPressed1
                                                ? [
                                                      styles.tabTitle,
                                                      { color: colors.white },
                                                  ]
                                                : [styles.tabTitle]
                                        }
                                    >
                                        Expenses
                                    </Text>
                                </View>
                            </TouchableOpacity>

                           

                            <TouchableOpacity onPress={handlePress3}>
                                <View
                                    style={
                                        isPressed3
                                            ? [
                                                  styles.tabContainer,
                                                  {
                                                      borderTopLeftRadius: 0,
                                                      borderBottomLeftRadius: 0,
                                                      borderColor: "#5B69D6",
                                                      borderWidth: 1,
                                                  },
                                              ]
                                            : [
                                                  styles.tabContainer,
                                                  {
                                                      backgroundColor:
                                                          colors.white,
                                                      borderColor: "#5B69D6",
                                                      borderWidth: 1,

                                                      borderTopLeftRadius: 0,
                                                      borderBottomLeftRadius: 0,
                                                  },
                                              ]
                                    }
                                >
                                    <Text
                                        style={
                                            isPressed3
                                                ? [
                                                      styles.tabTitle,
                                                      { color: colors.white },
                                                  ]
                                                : [styles.tabTitle]
                                        }
                                    >
                                        Transfer
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        {isPressed1 && (
                            <Expenses_Tab_1
                                openCalendar={openCalendar}
                                openDate={openDate}
                                date={date}
                                account={account}
                                setAccount={setAccount}
                                category={category}
                                setCategory={setCategory}
                                description={description}
                                setDescription={setDescription}
                                amount={amount}
                                setAmount={setAmount}
                                handleDateChange={handleDateChange}
                                formatDate={formatDate}
                                goBackToPreviousPage={goBackToPreviousPage}
                            />
                        )}

                        {isPressed2 && (
                            <Expenses_Tab_2
                                openCalendar={openIncomeCalendar}
                                openDate={incomeOpenDate}
                                date={incomeDate}
                                account={incomeAccount}
                                setAccount={setIncomeAccount}
                                category={incomeCategory}
                                setCategory={setIncomeCategory}
                                description={incomeDescription}
                                setDescription={setIncomeDescription}
                                amount={incomeAmount}
                                setAmount={setIncomeAmount}
                                handleDateChange={handleIncomeDateChange}
                                formatDate={formatDate}
                                goBackToPreviousPage={goBackToPreviousPage}
                            />
                        )}

                        {isPressed3 && (
                            <Expenses_Tab_3
                                openCalendar={openTransferCalendar}
                                openDate={transferOpenDate}
                                date={transferDate}
                                fromInput={transferFromInput}
                                setFromInput={setTransferFromInput}
                                toInput={transferToInput}
                                setToInput={setTransferToInput}
                                description={transferDescription}
                                setDescription={setTransferDescription}
                                amount={transferAmount}
                                setAmount={setTransferAmount}
                                handleDateChange={handleTransferDateChange}
                                formatDate={formatDate}
                                goBackToPreviousPage={goBackToPreviousPage}
                            />
                        )}
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export default Add_Transaction;

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    rowContainer: { flexDirection: "row" },
    columnContainer: { flexDirection: "column" },
    tabContainer: {
        paddingHorizontal: sw(20),
        paddingVertical: sh(12),
        backgroundColor: "#5B69D6",
        borderRadius: 10,
    },
    tabTitle: {
        fontFamily: fonts.interMedium,
        color: "#5B69D6",
        fontSize: 16,
    },
});
