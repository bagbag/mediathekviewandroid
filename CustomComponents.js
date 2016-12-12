import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    TextInput,
    View,
    ListView,
    Linking
} from 'react-native';
import {ListItem, Text, Button, CardItem, Container} from 'native-base';

const moment = require('moment');

export default class MediathekEntry extends React.Component {
    constructor(props) {
        super(props);

        this.styles = StyleSheet.create({
            flexRow: {
                flexDirection: 'row'
            },
            flexLeft: {
                flex: 1,
                textAlign: 'left'
            },
            flexRight: {
                flex: 1,
                textAlign: 'right'
            }
        });
    }

    render() {
        return (
            <CardItem onPress={this.openVideo.bind(this)}>
                <View style={this.styles.flexRow}>
                    <Text style={this.styles.flexLeft}>{this.props.entry.channel} - {this.props.entry.topic}</Text>
                    <Text style={this.styles.flexRight}>{moment.unix(this.props.entry.timestamp).format('DD.MM.YY HH:mm')}</Text>
                </View>

                <View style={this.styles.flexRow}>
                    <Text style={this.styles.flexLeft}>{this.props.entry.title}</Text>
                    <Text style={this.styles.flexRight}>{moment.unix(this.props.entry.duration - 3600).format('HH:mm')}</Text>
                </View>
            </CardItem>
        );
    }

    openVideo() {
        Linking.openURL(this.props.entry.url_video).catch(err => console.error('An error occurred', err));
    }
}
