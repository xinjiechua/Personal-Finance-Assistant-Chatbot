import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Platform,
    Modal,
    Button,
    TouchableWithoutFeedback,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import React, { useState } from "react";
import { colors, sw, sh, fonts } from "../../../styles/GlobalStyles.js";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Keyboard } from "react-native";
import { Picker } from '@react-native-picker/picker';




const Expenses_Tab_1 = ({
    openCalendar, //function to toggle calendar
    openDate, //state to check calendar should be open or not
    date, //state containing the value of date the text input should hold
    account,
    setAccount,
    category,
    setCategory,
    description,
    setDescription,
    amount,
    setAmount,
    handleDateChange,
    formatDate,
    goBackToPreviousPage
}) => {
    const [paymentMethod, setPaymentMethod] = useState("Cash");
    const [userId, setUserId] = useState(1);
    const isExpense = category !== "Income/Salary";

    const generateTransactionId = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');

        return `TRX${year}${month}${day}${hours}${minutes}${seconds}`;
    };

    const postTransactionData = async () => {
        const transactionData = {
            userId: 1,
            id: generateTransactionId(),
            date: date.toISOString(),
            transaction_details: account,
            description: description,
            category: category,
            payment_method: paymentMethod,
            withdrawal_amount: isExpense ? parseFloat(amount) : 0.00,
            deposit_amount: 0.00,
        };

        try {
            // Your API call here, replace `yourApiEndpoint` with your actual endpoint
            const response = await fetch('http://10.0.2.2:3000/transactions/insert/1', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(transactionData),
            });

            if (!response.ok) throw new Error('Network response was not ok.');
            // Handle response data as needed...
            alert('Transaction saved successfully!');
            goBackToPreviousPage();
        } catch (error) {
            console.error('Error saving transaction:', error);
            alert('Failed to save transaction.');
        }
    };




    const [categoryModalVisible, setCategoryModalVisible] = useState(false);

    const toggleCategoryModal = () => {
        setCategoryModalVisible(!categoryModalVisible);
    };

    const categories = [
        "Utilities", "Other Expenses", "Government Services",
        "Groceries", "Insurance", "Dining", "Health & Fitness",
        "Entertainment", "Transportation", "Debts/Overpayments", "Education",
        "Shopping", "Savings", "Investment", "Travel"
    ];

    return (
        <View style={[styles.columnContainer]}>
            <View
                style={{
                    // borderColor: "black",
                    // borderWidth: 1,
                    justifyContent: 'center',
                }}
            >
                <TextInput
                    style={[styles.input]}
                    placeholder="20/03/2024"
                    value={formatDate(date)}
                    editable={false}
                    placeholderTextColor="#DADADA"
                />
                <TouchableOpacity
                    onPress={openCalendar}
                    style={{
                        // borderColor: "red",
                        // borderWidth: 1,
                        position: 'absolute',
                        right: sw(40),
                        width: sw(24),
                        height: sh(25),
                    }}
                >
                    <Svg
                        style={{ position: 'absolute' }}
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={25}
                        fill="none"
                    >
                        <Path
                            stroke="#5B69D6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M15.333 4.222V2m0 2.222v2.222m0-2.222h-5M2 10.89v10c0 1.227.995 2.222 2.222 2.222h15.556A2.222 2.222 0 0 0 22 20.89v-10H2ZM2 10.89V6.444c0-1.228.995-2.223 2.222-2.223h2.222M6.445 2v4.444M22 10.89V6.444a2.222 2.222 0 0 0-2.222-2.223h-.556"
                        />
                    </Svg>
                </TouchableOpacity>
            </View>

            <TextInput
                style={styles.input}
                placeholder="Transaction detail"
                keyboardType="default"
                returnKeyType="next"
                autoCapitalize="none"
                placeholderTextColor="#DADADA"
                ref={(input) => {
                    accountInput = input;
                }}
                value={account}
                onChangeText={(text) => {
                    setAccount(text);
                }}
                onSubmitEditing={() => {
                    categoryInput.focus();
                }}
            />
            <TextInput
                style={styles.input}
                placeholder="Description"
                keyboardType="default"
                returnKeyType="next"
                autoCapitalize="none"
                value={description}
                placeholderTextColor="#DADADA"
                onChangeText={(text) => {
                    // Handle text input changes here
                    setDescription(text);
                }}
                ref={(input) => (descriptionInput = input)}
                onSubmitEditing={() => {
                    amountInput.focus();
                }}
            />
            {Platform.OS === 'ios' ? (
                <>
                    <TouchableOpacity
                        style={[styles.input, styles.pickerIos]}
                        onPress={toggleCategoryModal}
                    >
                        <Text>{category || 'Select Category'}</Text>
                    </TouchableOpacity>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={categoryModalVisible}
                        onRequestClose={toggleCategoryModal}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Picker
                                    selectedValue={category}
                                    onValueChange={(itemValue) => {
                                        setCategory(itemValue);
                                        toggleCategoryModal();
                                    }}
                                    style={{ width: '100%' }}
                                >
                                    {categories.map((cat, index) => (
                                        <Picker.Item key={index} label={cat} value={cat} />
                                    ))}
                                </Picker>
                            </View>
                        </View>
                    </Modal>
                </>
            ) : (
                <View style={styles.input}>
                    <Picker
                        selectedValue={category}
                        onValueChange={(itemValue) => setCategory(itemValue)}
                        mode="dropdown"
                        style={styles.pickerStyle}
                    >
                        {categories.map((cat, index) => (
                            <Picker.Item key={index} label={cat} value={cat} />
                        ))}
                    </Picker>
                </View>
            )}


            <TextInput
                style={styles.input}
                placeholder="Amount"
                keyboardType="number-pad"
                returnKeyType="next"
                autoCapitalize="none"
                value={amount.toString()}
                placeholderTextColor="#DADADA"
                onChangeText={(text) => {
                    // Handle text input changes here
                    setAmount(text);
                }}
                ref={(input) => {
                    amountInput = input;
                }}
                onSubmitEditing={() => {
                    Keyboard.dismiss();
                }}
            />

            <TouchableOpacity
                style={[styles.button, { alignSelf: 'center' }]}
                onPress={postTransactionData}
            >
                <Text style={styles.btnText}>Add</Text>
            </TouchableOpacity>

            {openDate &&
                (Platform.OS === 'ios' ? (
                    <View
                        style={{
                            position: 'absolute',
                            alignSelf: 'center',
                            backgroundColor: 'rgba(208, 208, 208, 1)',
                            borderRadius: 20,
                            padding: 10,
                        }}
                    >
                        <DateTimePicker
                            mode="date"
                            display="inline"
                            value={date}
                            onChange={handleDateChange}
                        />
                    </View>
                ) : (
                    <DateTimePicker
                        mode="date"
                        display="inline"
                        value={date}
                        onChange={handleDateChange}
                    />
                ))}
        </View>
    );
};

export default Expenses_Tab_1;

const styles = StyleSheet.create({
    columnContainer: { flexDirection: "column" },

    input: {
        alignSelf: "center",
        paddingVertical: sh(13),
        paddingHorizontal: sw(20),
        borderRadius: 10,
        borderColor: "#DADADA",
        borderWidth: 1,
        fontSize: 18,
        marginVertical: sh(15),
        width: "90%",
        color: "black",
        fontFamily: fonts.interRegular,
    },
    button: {
        backgroundColor: "#5B69D6",
        paddingVertical: sh(13),
        paddingHorizontal: sw(20),
        marginTop: sh(30),
        borderRadius: 10,
        width: "90%",
        alignItems: "center",
        justifyContent: "center",
    },
    btnText: {
        fontFamily: fonts.interSemiBold,
        fontSize: 20,
        color: colors.white,
    },
    pickerIos: {
        justifyContent: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '80%',
    },
});
