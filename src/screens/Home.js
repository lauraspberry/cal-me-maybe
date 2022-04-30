import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from "../graphql/queries";
import * as mutations from "../graphql/mutations";


import Amplify, { Auth } from "aws-amplify";
import awsmobile from '../aws-exports';
import { withAuthenticator } from 'aws-amplify-react-native';


Amplify.configure({
    ...awsmobile,
    Analytics: {
      disabled: true,
    },
});

class HomeScreen extends React.Component {
    state = { valid: [], userPresent: false}

    async componentDidMount() {
        const response = await Auth.currentUserInfo()
        //console.log(response)
        const userId = response.username.replace("\n", "")
        // console.log(userId)
        try {
            const allData = await API.graphql(graphqlOperation(queries.listSelves, {filter: {name: {eq: userId}}}))
            this.setState({ valid: allData.data.listSelves.items })
            //console.log(this.state.valid)
            for(let i = 0; i < this.state.valid.length; i += 1){
                if (userId == this.state.valid[i].name) {
                    this.setState({userPresent: true})
                }
            }
        } catch (e) {
            console.log(e);
        }
       
        //console.log(this.state.userPresent)
        if(this.state.userPresent == false) {
            try {   
/*                 const {status: existingStatus} = await Notifications.getPermissionsAsync();
                let finalStatus = existingStatus;
                if (existingStatus !== 'granted') {
                    const { status } = await Notifications.requestPermissionsAsync();
                    finalStatus = status;
                }
                if (finalStatus !== 'granted') {
                    alert('Failed to get push token for push notification!');
                    return;
                }
                const token = (await Notifications.getExpoPushTokenAsync()).data;
                if (Platform.OS === 'android') {
                    Notifications.setNotificationChannelAsync('default', {
                        name: 'default',
                        importance: Notifications.AndroidImportance.MAX,
                        vibrationPattern: [0, 250, 250, 250],
                        lightColor: '#FF231F7C',
                    });
                } */
                console.log("visited home >");
                await API.graphql(graphqlOperation(mutations.createSelf, {input: {name: userId}}))
            } catch(err) {
            }
        }
    }

    render() {

        return (
            <View style={styles.container}>
                <Text style={styles.titleText}> Cal Me Maybe </Text>
                <Image
                    style={styles.logo}
                    source={{uri: 'https://codeology.club/static/media/calmemaybe.e63b4e37.png'}}
                />
                <Text style={styles.bodyText}>Cal Me Maybe is a night safety app for UC Berkeley students. {"\n"}</Text>
                <Text style={styles.bodyText}>Open the menu on the right to add friends, input your current destination and estimated arrival time, or see alerts from your friends. </Text>
            </View>
        )

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        margin: 30,
    },
    logo: {
        width: 270,
        height: 270,
        margin: 30,
        borderRadius: 20,
      },
    titleText: {
        fontSize: 40,
        fontWeight: "bold"
      },
    bodyText: {
        fontSize: 20,
        alignSelf: 'flex-start',
      },    
})


export default withAuthenticator(HomeScreen, { includeGreeetings: false})