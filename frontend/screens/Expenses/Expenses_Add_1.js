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
import { colors, sw, sh, fonts } from "../../styles/GlobalStyles";
import { Svg, Path } from "react-native-svg";
import { Keyboard } from "react-native";
import Expenses_Tab_1 from "./Utils/Expenses_Tab_1";
import Expenses_Tab_2 from "./Utils/Expenses_Tab_2";
const Expenses_Add_1 = ({ navigation, route }) => {

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


    const goBackToPreviousPage = () => {
        navigation.goBack();
    }

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
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.wrapper}
        >
            <TouchableWithoutFeedback onPress={dismissKeyboard}>
                <View
                    style={{
                        backgroundColor: colors.white,
                        height: '100%',
                    }}
                >
                    <View
                        style={[
                            styles.columnContainer,
                            {
                                marginHorizontal: sw(20),
                                gap: 10,
                            },
                        ]}
                    >
                        <View
                            style={[
                                styles.rowContainer,
                                {
                                    justifyContent: 'flex-end',
                                    marginTop: sh(10),
                                },
                            ]}
                        >
                        </View>
                        <View
                            style={[
                                styles.rowContainer,
                                {
                                    alignSelf: 'center',
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
                                                    borderColor: '#5B69D6',
                                                    borderWidth: 1,
                                                },
                                            ]
                                            : [
                                                styles.tabContainer,
                                                {
                                                    borderColor: '#5B69D6',
                                                    borderWidth: 1,
                                                    backgroundColor: colors.white,
                                                    borderTopRightRadius: 0,
                                                    borderBottomRightRadius: 0,
                                                },
                                            ]
                                    }
                                >
                                    <Text
                                        style={
                                            isPressed1 ? [styles.tabTitle, { color: colors.white }] : [styles.tabTitle]
                                        }
                                    >
                                        Expenses
                                    </Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={handlePress2}>
                                <View
                                    style={
                                        isPressed2
                                            ? [
                                                styles.tabContainer,
                                                {
                                                    borderTopLeftRadius: 0,
                                                    borderBottomLeftRadius: 0,
                                                    borderColor: '#5B69D6',
                                                    borderWidth: 1,
                                                },
                                            ]
                                            : [
                                                styles.tabContainer,
                                                {
                                                    backgroundColor: colors.white,
                                                    borderColor: '#5B69D6',
                                                    borderWidth: 1,

                                                    borderTopLeftRadius: 0,
                                                    borderBottomLeftRadius: 0,
                                                },
                                            ]
                                    }
                                >
                                    <Text
                                        style={
                                            isPressed2 ? [styles.tabTitle, { color: colors.white }] : [styles.tabTitle]
                                        }
                                    >
                                        Income
                                    </Text>
                                </View>
                            </TouchableOpacity>

                            {/* <TouchableOpacity onPress={handlePress3}>
                                <View
                                    style={
                                        isPressed3
                                            ? [
                                                  styles.tabContainer,
                                                  {
                                                      borderTopLeftRadius: 0,
                                                      borderBottomLeftRadius: 0,
                                                      borderColor: '#5B69D6',
                                                      borderWidth: 1,
                                                  },
                                              ]
                                            : [
                                                  styles.tabContainer,
                                                  {
                                                      backgroundColor: colors.white,
                                                      borderColor: '#5B69D6',
                                                      borderWidth: 1,

                                                      borderTopLeftRadius: 0,
                                                      borderBottomLeftRadius: 0,
                                                  },
                                              ]
                                    }
                                >
                                    <Text
                                        style={
                                            isPressed3 ? [styles.tabTitle, { color: colors.white }] : [styles.tabTitle]
                                        }
                                    >
                                        Transfer
                                    </Text>
                                </View>
                            </TouchableOpacity> */}
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
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export default Expenses_Add_1;

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    rowContainer: { flexDirection: "row" },
    columnContainer: { flexDirection: "column" },
    tabContainer: {
        paddingHorizontal: sw(50),
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
