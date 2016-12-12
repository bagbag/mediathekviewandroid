/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    TextInput,
    View,
    ListView,
    Linking
} from 'react-native';
import {
    Container,
    Content,
    Card,
    CardItem,
    Text,
    Input,
    List,
    ListItem,
    Header,
    InputGroup,
    Button,
    Icon
} from 'native-base';
import MediathekEntry from './CustomComponents.js';

import lightTheme from 'native-base/Components/Themes/light';
var myTheme = Object.assign({}, lightTheme);
myTheme.iconFamily = 'MaterialIcons';
GLOBAL.myTheme = myTheme;

const io = require('socket.io-client');
const underscore = require('underscore');

export default class mediathekviewandroid extends Component {
    constructor(props) {
        super(props);

        this.socket = io('https://mediathekviewweb.batrick.de');

        this.socket.on('queryResult', (result) => {
            let entries = [];
            for (var i = 0; i < result.results.length; i++) {
                let data = result.results[i];
                data.index = i;
                entries.push(data);
            }
            this.setState({entries: entries});
        });

        this.state = {
            entries: []
        };

        this.styles = StyleSheet.create({
            fullwidthViewColumn: {
                flex: 1,
                flexDirection: 'column',
                padding: 2,
                alignItems: 'stretch'
            },
            height40: {
                height: 40
            }
        });
    }

    render() {
        let mediathekEntries = this.state.entries.map((entry) => {
            console.log(entry.url_video);
            return <MediathekEntry entry={entry} key={entry.index}/>
        });

        return (
            <Container theme={myTheme}>
                <Content>
                    <Header searchBar rounded>
                        <InputGroup>
                            <Icon name='search'/>
                            <Input placeholder="Suchen..." onChangeText={(text) => this.query(text)}/>
                        </InputGroup>
                        <Button transparent>
                            Search
                        </Button>
                    </Header>
                    <Card>
                        {mediathekEntries}
                    </Card>
                </Content>
            </Container>
        );
    }

    query(text) {
        query = underscore.throttle(() => {
            this.socket.emit('queryEntry', {
                queryString: text,
                includeTitle: true
            });
        }, 250);
        query();
    }
}

AppRegistry.registerComponent('mediathekviewandroid', () => mediathekviewandroid);
