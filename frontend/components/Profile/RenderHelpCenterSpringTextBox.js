import React, { useState, useEffect } from 'react';
import { View, Text, TouchableWithoutFeedback, Animated, StyleSheet, Image } from 'react-native';
import { sw, sh, colors, fonts, logo } from '../../../styles/GlobalStyles';

const styles = StyleSheet.create({
    container:{
        flex: 1,
        marginHorizontal: sw(20),
        marginTop: sh(16),
        padding: sh(16),
        borderColor: '#D9D9D9',
        borderRadius: sw(6),
        borderWidth: sw(1)
    },
    titleAndButton:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    contentContainer:{
        flex: 0.8,
        flexDirection: 'row'
    },
    titleStyle:{
        flex: 0.8,
        fontFamily: fonts.interSemiBold,
        fontSize: sw(14),
        overflow: 'scroll'
    },
    contentStyle:{
        color: '#757575',
        fontFamily: fonts.interRegular,
        fontSize: sw(13)
    }
})

const CollapsibleView = ({ question, answer, defaultValue = true}) => {
    const initialCollapsedState = defaultValue
    const [collapsed, setCollapsed] = useState(initialCollapsedState);
    const [collapsedIcon, setCollapsedIcon] = useState(logo.plus_icon);
    const [animation] = useState(new Animated.Value(0));
    const [toggleCalled, setToggleCalled] = useState(false);

    useEffect(() => {
        Animated.timing(animation, {
            toValue: collapsed ? 0 : 1,
            duration: 300,
            useNativeDriver: false
        }).start();
        setCollapsedIcon(collapsed ? logo.plus_icon : logo.minus_icon);
    }, [collapsed, animation]);

    const toggleCollapse = () => {
        setCollapsed(!collapsed);
        setToggleCalled(!toggleCalled)
    };

    if (initialCollapsedState != collapsed && toggleCalled == false) {
        setCollapsed(!collapsed);
    }


    const heightInterpolate = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, sh(100)]
    });

    return (
        <View style={styles.container}>
            <View style={styles.titleAndButton}>
                <Text style={styles.titleStyle}>{question}</Text>
                <TouchableWithoutFeedback onPress={toggleCollapse} style={{flex:0.2, marginLeft: sw(4)}}>
                    <Image source={collapsedIcon}/>
                </TouchableWithoutFeedback>
            </View>
            <View style={styles.contentContainer}>
                <Animated.View style={{ height: heightInterpolate,  marginVertical: sh(10), flex: 0.8}} useNativeDriver='true'>
                    <Text style={styles.contentStyle}>{answer}</Text>
                </Animated.View>
                <View style={{flex: 0.2}}></View>
            </View>
        </View>
    );
};

export default CollapsibleView;