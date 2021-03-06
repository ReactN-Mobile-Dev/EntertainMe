import React from 'react';
import {Image, ScrollView, StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import {LinearGradient} from 'expo';
import Search from './Search';
import FlatlistComponent from './FlatlistComponent';

export default class List extends Search {

    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.getParam('term'),
            headerStyle: {
                backgroundColor: 'black',
            },
            headerTextStyle: {
                color: 'white',
            },
            headerRight: (
                <TouchableWithoutFeedback onPress={() => navigation.navigate('Search')}>
                    <Image source={require('../assets/baseline_home_white_18dp.png')} style={{width: 35, height: 35}}/>
                </TouchableWithoutFeedback>
            ),
            headerTintColor: 'white'
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            movieList: [],
            showList: [],
            bookList: [],
            movieGenres: [],
            tvGenres: []
        }
    }

    componentDidMount() {
        this.fetchContent(this.props.navigation.getParam('term'));
    }

    render() {
        return (
            <LinearGradient colors={['#000000', '#323232']} style={StyleSheet.absoluteFill}>
                <ScrollView>
                    <View style={{marginBottom: 10}}>
                        {this.state.bookList && this.state.bookList.length > 0
                            ? <FlatlistComponent
                                type={'Books'}
                                listItems={this.state.bookList}
                                navigation={this.props.navigation}/>
                            : <View/>
                        }

                        {this.state.movieList && this.state.movieList.length > 0
                            ? <FlatlistComponent
                                type={'Movies'}
                                listItems={this.state.movieList}
                                navigation={this.props.navigation}/>
                            : <View/>
                        }

                        {this.state.showList && this.state.showList.length > 0
                            ?  <FlatlistComponent
                                type={'TV Shows'}
                                listItems={this.state.showList}
                                navigation={this.props.navigation}/>
                            : <View/>
                        }
                    </View>
                </ScrollView>
            </LinearGradient>
        )
    }
}
