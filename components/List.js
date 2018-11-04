import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dimensions, Text, View, FlatList, StyleSheet, TouchableHighlight, Image } from 'react-native';
import { ListItem } from 'react-native-elements'
import { LinearGradient } from 'expo';
import { TASTE_API_KEY, THE_MOVIE_DB_API_KEY } from 'react-native-dotenv'

const movieReq = `https://tastedive.com/api/similar?k=${TASTE_API_KEY}&type=movies&q=movie:`;
const showReq = `https://tastedive.com/api/similar?k=${TASTE_API_KEY}&type=shows&q=`;
const bookReq = `https://tastedive.com/api/similar?k=${TASTE_API_KEY}&type=books&q=book:`;

const red = 0;
const green = 0;
const blue = 0;

const screenWidth = (Dimensions.get('window').width);
const screenHeight = (Dimensions.get('window').height);

export default class List extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('term').text,
            headerStyle: {
                backgroundColor: 'black',
            },
            headerTextStyle: {
                color: 'white',
            },
            headerTintColor: 'white'
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            movieList: [],
            showList: [],
            bookList: [],
        }
    }

    _keyExtractor = (item, index) => item.Name;

    _renderList = ({item}) => {
        let darkness = Math.random() * (1 - 0.2) + 0.2;

        return (
            <TouchableHighlight>
                <View style={styles.box} backgroundColor={`rgba(${red}, ${green}, ${blue}, ${darkness})`}>
                    <Text style={styles.text}>{item.Name}</Text>
                </View>
            </TouchableHighlight>
        );
    }

    fetchContent(searchTerm) {
        let movieSearch = movieReq + encodeURIComponent(searchTerm).replace(/%20/g, '+');
        console.log(movieSearch);
        fetch(movieSearch)
            .then((response) => response.json())
            .then((response) => {
                this.setState({
                    movieList: response.Similar.Results
                })
            })

        let showSearch = showReq + encodeURIComponent(searchTerm).replace(/%20/g, '+');
        console.log(showSearch);
        fetch(showSearch)
            .then((response) => response.json())
            .then((response) => {
                this.setState({
                    showList: response.Similar.Results
                })
            })

        let bookSearch = bookReq + encodeURIComponent(searchTerm).replace(/%20/g, '+');
        console.log(bookSearch);
        fetch(bookSearch)
            .then((response) => response.json())
            .then((response) => {
                this.setState({
                    bookList: response.Similar.Results
                })
            })
    }

    componentDidMount() {
        this.fetchContent(this.props.navigation.getParam('term').text);
        red = Math.floor(Math.random() * 255);
        green = Math.floor(Math.random() * 255);
        blue = Math.floor(Math.random() * 255);
    }

    render() {
        return (
            <View style={styles.container}>
                <LinearGradient
                    colors={['#000000', '#323232']}
                    style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0,
                        height: screenHeight,
                        width: screenWidth,
                    }}
                />
                <Text style={{ marginTop: 15, color: 'white'}}>Books</Text>
                <FlatList
                    keyExtractor={this._keyExtractor}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    data={this.state.bookList}
                    renderItem={this._renderList}
                />
                <Text style={{ color: 'white' }}>Movies</Text>
                <FlatList
                    keyExtractor={this._keyExtractor}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    data={this.state.movieList}
                    renderItem={this._renderList}
                />
                <Text style={{ color: 'white' }}>TV Shows</Text>
                <FlatList
                    keyExtractor={this._keyExtractor}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    data={this.state.showList}
                    renderItem={this._renderList}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#323232',
        alignItems: 'center',
        justifyContent: 'center',
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'center',
    },
    box: {
        width: screenWidth * 0.35,
        height: screenHeight * 0.25,
        margin: screenWidth * 0.01,
        marginTop: 0,
        backgroundColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center'
    }
});
