import React, { useContext, useState, useRef, useCallback } from 'react';
import { Platform, ScrollView, StyleSheet, View, Text, TextInput, TouchableOpacity, Image, StatusBar, Switch } from 'react-native';
import { GlobalContext } from '../../../context';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { sw, sh, colors, fonts } from '../../../styles/GlobalStyles';
import Animated from 'react-native-reanimated';
import AppBar from '../../Module_3/Utils/AppBar';
import { BottomButton } from '../../Module_3/Utils/RenderBottomButton';
import { TextInput as TextInputPaper } from 'react-native-paper';
import { Rating } from '@kolking/react-native-rating';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

const styles = StyleSheet.create({
    switchContainer: {
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: sw(20),
        paddingVertical: sh(10),
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: sw(1),
        borderBottomColor: '#C1BFC0'
    },
    switchTextContainer:{
        flex: 0.8,
        flexDirection: 'column',
        marginRight: sw(10),
    },
    switchTitle: {
        color: '#000',
        fontFamily: fonts.interLight,
        fontSize: sh(16),
        marginBottom: sh(10)
    },
    switchContent: {
        color: '#9D9FA0',
        fontFamily: fonts.interRegular,
        fontSize: sh(13),
    },
    toggleOff: {
        flex: 0.2,
        backgroundColor: '#d9d9d9',
        borderRadius: sw(100),
    },
});

const RenderNotificationContainer = ({ title, content }) => {

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (
        <View style={styles.switchContainer}>
            <View style={styles.switchTextContainer}>
                <Text style={styles.switchTitle}>{title}</Text>
                <Text style={styles.switchContent}>{content}</Text>
            </View>
            <Switch
                onValueChange={toggleSwitch}
                value={isEnabled}
                trackColor={{ false: '#FFFFFF', true: '#5F84A1' }}
                thumbColor={isEnabled ? '#FFFFFF' : '#5F84A1'}
                style={styles.toggleOff}
            />
        </View>
    );
}

export default RenderNotificationContainer;