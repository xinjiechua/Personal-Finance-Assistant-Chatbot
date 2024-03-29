import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Platform,
    TouchableWithoutFeedback,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import React from "react";
import { colors, sw, sh, fonts } from "../../styles/GlobalStyles";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Keyboard } from "react-native";

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
    handleDateChange, //function when the date is selected from calendar
    formatDate, //function to format the date
    goBackToPreviousPage
}) => {
    return (
        <View style={[styles.columnContainer]}>
            <View
                style={{
                    // borderColor: "black",
                    // borderWidth: 1,
                    justifyContent: "center",
                }}
            >
                <TextInput
                    style={[styles.input]}
                    placeholder="20/03/2024"
                    value={formatDate(date)}
                    editable={false}
                    placeholderTextColor="#DADADA"
                    color="#5B69D6"
                />
                <TouchableOpacity
                    onPress={openCalendar}
                    style={{
                        // borderColor: "red",
                        // borderWidth: 1,
                        position: "absolute",
                        right: sw(40),
                        width: sw(24),
                        height: sh(25),
                    }}
                >
                    <Svg
                        style={{ position: "absolute" }}
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
                placeholder="Account"
                keyboardType="default"
                returnKeyType="next"
                autoCapitalize="none"
                placeholderTextColor="#5B69D6"
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
                placeholder="Category"
                keyboardType="default"
                returnKeyType="next"
                autoCapitalize="none"
                value={category}
                placeholderTextColor="#5B69D6"
                onChangeText={(text) => {
                    // Handle text input changes here
                    setCategory(text);
                }}
                ref={(input) => {
                    categoryInput = input;
                }}
                onSubmitEditing={() => {
                    descriptionInput.focus();
                }}
            />

            <TextInput
                style={styles.input}
                placeholder="Description"
                keyboardType="default"
                returnKeyType="next"
                autoCapitalize="none"
                value={description}
                placeholderTextColor="#5B69D6"
                onChangeText={(text) => {
                    // Handle text input changes here
                    setDescription(text);
                }}
                ref={(input) => (descriptionInput = input)}
                onSubmitEditing={() => {
                    amountInput.focus();
                }}
            />
            <TextInput
                style={styles.input}
                placeholder="Amount"
                keyboardType="number-pad"
                returnKeyType="next"
                autoCapitalize="none"
                value={amount.toString()}
                placeholderTextColor="#5B69D6"
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
                style={[styles.button, { alignSelf: "center" }]}
                onPress={goBackToPreviousPage}
            >
                <Text style={styles.btnText}>Save</Text>
            </TouchableOpacity>

            {openDate &&
                (Platform.OS === "ios" ? (
                    <View
                        style={{
                            position: "absolute",
                            alignSelf: "center",
                            backgroundColor: "rgba(208, 208, 208, 1)",
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
        borderColor: "#5B69D6",
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
        width: "60%",
        alignItems: "center",
        justifyContent: "center",
    },
    btnText: {
        fontFamily: fonts.interSemiBold,
        fontSize: 20,
        color: colors.white,
    },
});
