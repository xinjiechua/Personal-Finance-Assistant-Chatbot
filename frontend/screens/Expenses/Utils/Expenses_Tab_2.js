import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Platform
} from "react-native";
import Svg, { Path } from "react-native-svg";
import React, { useState } from "react";
import { colors, sw, sh, fonts } from "../../../styles/GlobalStyles.js";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Keyboard } from "react-native";

const Expenses_Tab_2 = ({
    openCalendar,
    openDate,
    date,
    account,
    setAccount,
    setCategory,
    description,
    setDescription,
    amount,
    setAmount,
    handleDateChange,
    formatDate,
    goBackToPreviousPage
}) => {
    const [paymentMethod, setPaymentMethod] = useState("cash"); // Assuming default payment method

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

    const category = "Income/Salary";

    const postTransactionData = async () => {
        const transactionData = {
            userId: 1,
            id: generateTransactionId(),
            date: date.toISOString(),
            transaction_details: account,
            description: description,
            category: "Income/Salary",
            payment_method: paymentMethod,
            withdrawal_amount: 0.00,
            deposit_amount: parseFloat(amount),
        };

        try {
            const response = await fetch('http://10.0.2.2:3000/transactions/insert/1', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(transactionData),
            });

            if (!response.ok) {
                throw new Error(`Server responded with ${response.status}`);
            }

            alert('Income saved successfully!');
            goBackToPreviousPage();
        } catch (error) {
            console.error('Error saving income:', error);
            alert('Failed to save income.');
        }
    };





    return (
        <View style={[styles.columnContainer]}>
            <View
                style={{
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
                    setDescription(text);
                }}
                ref={(input) => (descriptionInput = input)}
                onSubmitEditing={() => {
                    amountInput.focus();
                }}
            />
            <View style={[styles.input, styles.categoryInput]}>
                <Text style={styles.categoryText}>{category}</Text>
            </View>

            <TextInput
                style={styles.input}
                placeholder="Amount"
                keyboardType="number-pad"
                returnKeyType="next"
                autoCapitalize="none"
                value={amount.toString()}
                placeholderTextColor="#DADADA"
                onChangeText={(text) => {
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

export default Expenses_Tab_2;

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
});
