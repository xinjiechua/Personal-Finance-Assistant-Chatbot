import React, { useContext, Component, useState } from 'react';
import { ScrollView, StyleSheet, View, Text, TextInput, TouchableOpacity, Image, StatusBar, SafeAreaView, Dimensions } from 'react-native';
import { sw, sh, colors, fonts } from '../../../styles/GlobalStyles';
import Carousel from 'react-native-snap-carousel';

const styles = StyleSheet.create({
    scrollViewContainer:{
        flex: 1, 
        flexDirection: 'row',
        backgroundColor:'#FFF',
        marginLeft: sw(20),
    },
    cardContainer: {
        borderRadius: sw(10),
        padding: sw(12),
    },
    imageContainer:{
        flex:1,
        marginVertical: sh(10)
    },
    normalText:{
        color: '#616161',
        fontSize: sw(14),
        fontFamily: fonts.interRegular,
        marginVertical: sw(4)
    },
    boldText:{
        color: '#000',
        fontSize: sw(14),
        fontFamily: fonts.interSemiBold,
        marginBottom: sh(10)
    }
});

const WINDOWS_WIDTH = Dimensions.get('window').width
const WINDOWS_WIDTH_MINUS_MARGIN = WINDOWS_WIDTH - sw(20)

export default class RenderHelpCenterScrollView extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          activeIndex:0,
          carouselItems: this.props.carouselItems
      }
    }

    _renderItem({item,index}){
        return (
          <View style={[styles.cardContainer, {backgroundColor:item.backgroundColor}]}>
            <View style={styles.imageContainer}>
                <Image source={item.logo} resizeMode='contain'></Image>
            </View>
            <Text style={styles.normalText}>Questions about</Text>
            <Text style={styles.boldText}>{item.text}</Text>
          </View>

        )
    }

    render() {
        return (
          <View style={styles.scrollViewContainer}>
                <Carousel
                  layout={"default"}
                  ref={ref => this.carousel = ref}
                  data={this.state.carouselItems}
                  sliderWidth={WINDOWS_WIDTH_MINUS_MARGIN}
                  itemWidth={sw(150)}
                  renderItem={this._renderItem}
                  onSnapToItem = { index => this.setState({activeIndex:index}) }
                  loop={true} />
          </View>
        );
    }
}

