import React from 'react';
import { Image, Button, Text, View, StyleSheet } from 'react-native';
import { SearchBar } from 'react-native-elements'

export default class Search extends React.Component {

    static navigationOptions = {
        title: '',
    }

    constructor() {
        super();
        this.state = {
            searchTerm: '',
        }

        this.searchText = this.searchText.bind(this);
    }

    searchText(text) {
        this.setState({searchTerm: text});
        console.log(this.state.searchTerm);
    }

    componentDidMount() {

    }

    render() {
        const { navigate } = this.props.navigation;

        return (
            <View style={styles.container}>
                <Text style={styles.text}>Entertain Me!</Text>
                <SearchBar
                    containerStyle={styles.search}
                    round
                    lightTheme
                    clearIcon={{ color: 'grey' }}
                    searchIcon={true}
                    onChangeText={(text) => this.searchText({text})}
                    placeholder='What are you interested in?'
                />
                <View style={styles.button}>
                    <Button
                        title="Search"
                        color="red"
                        onPress={() => {
                            navigate('Results', {
                                term: this.state.searchTerm,
                            });
                        }}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#323232',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        height: 100,
        fontSize: 50,
        fontWeight: 'bold',
        color: 'white'
    },
    search: {
        backgroundColor: '#323232',
        width: '80%',
        borderColor: '#323232',
        borderBottomColor: '#323232',
        borderTopColor: '#323232'
    },
    button: {
        height: 100,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
