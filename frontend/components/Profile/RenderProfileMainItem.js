import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';
import { sw, sh, fonts } from '../../styles/GlobalStyles';

const styles = StyleSheet.create({
    widgetContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentContainer: {
        flex: 0.6,
    },
    titleText: {
        fontSize: sw(15),
        fontFamily: fonts.interRegular,
        fontWeight: 'bold',
        color: 'black',
    },
    imageContainer: {
        aspectRatio: 1,
        flex: 0.2,
        marginHorizontal: sw(4),
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageStyle: {
        resizeMode: 'contain',
    },
});


const RenderProfileMainItem = ({icon, title, navigation, index}) => {
    return (
        <Animated.View
            style={styles.widgetContainer}
            entering={FadeInDown.delay(index * 100)}
            exiting={FadeOutDown}
        >
            <View style={styles.imageContainer}>
                <Image
                    source={icon}
                    style={styles.imageStyle}
                ></Image>
            </View>
            <View style={[styles.contentContainer, { alignItems: 'flex-start' }]}>
                <Text style={styles.titleText}>{title}</Text>
            </View>
            <TouchableOpacity style={styles.imageContainer} onPress={navigation}>
                <Image
                    source={require('../../assets/chevron-right.png')}
                    style={styles.imageStyle}
                ></Image>
            </TouchableOpacity>
        </Animated.View>
    );
};

export default RenderProfileMainItem;
