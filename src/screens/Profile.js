import React from 'react';
import { StyleSheet, Text, SafeAreaView, View, FlatList, TextInput, Button, Image, Pressable } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from "../graphql/queries";
import * as mutations from "../graphql/mutations";
import * as subscriptions from "../graphql/subscriptions";


import Amplify, { Auth } from "aws-amplify";
import awsmobile from '../aws-exports';
import { withAuthenticator } from 'aws-amplify-react-native';
import { ConsoleLogger } from '@aws-amplify/core';


Amplify.configure({
    ...awsmobile,
    Analytics: {
      disabled: true,
    },
});

function Profile ({vars}) {
    //console.log(vars)
    const [state, setState] = React.useState({
        userId: "",
        userEmail: vars.Email,
    })

    React.useEffect(() => {
        (async () => {
          const response = await Auth.currentUserInfo();
          setState({
              userId: response.username,
              userEmail: vars.Email,
          })
        })();
    }, []);


    return (
        <View style={styles.container}>
            <Image
                    style = {styles.logo}
                    source={{uri: 'https://m.media-amazon.com/images/I/713q68N9bLL._AC_SL1500_.jpg'}}
                />
            <Text style = {styles.heading}>My Profile{"\n"}</Text>
            <Text style = {styles.text}>Name </Text>
            <Text style = {styles.item}>Avo Cado{"\n"}</Text>
            <Text style = {styles.text}>Email </Text>
            <Text style = {styles.item}>{state.userEmail}{"\n"}</Text>
            <Text style = {styles.text}>ID </Text>
            <Text style = {styles.item}>{state.userId}{"\n"}</Text>
            <Text style = {styles.text}>Password </Text>
            <Text style = {styles.item}>******{"\n"}</Text>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22,
        marginLeft: 20,
        marginRight: 20,
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
        alignItems: 'center',
    },
    text: {
        padding: 10,
        fontSize: 18,
        height: 44,
        alignItems: 'center',
        fontWeight: 'bold',
    },
    input: {
        height: 40,
        borderWidth:1,
        padding: 10,
    },
    heading: {
        fontSize: 30,
        height: 66,
        fontWeight: "bold",
        alignSelf: 'center',
    },
    logo: {
        width: 100,
        height: 100,
        alignSelf: 'center',
        margin: 20,
        borderRadius: 20,
      },
      button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'black',
      },
      buttontext: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
      },
    
})


export default Profile
