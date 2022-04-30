import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';

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
        fontWeight: "bold",
      },
    bodyText: {
        fontSize: 20,
        alignSelf: 'flex-start',
      },
    button: {
        backgroundColor: 'black',
        },

});

const LandingScreen = ({ navigation }) => {
    return (
        <View style = {styles.container}>
                <Text style={styles.titleText}> Cal Me Maybe </Text>
                <Image
                    style={styles.logo}
                    source={{uri: 'https://codeology.club/static/media/calmemaybe.e63b4e37.png'}}
                />
                <Text style={styles.bodyText}>Cal Me Maybe is a night safety app for UC Berkeley students. {"\n"}</Text>

            <Button style = {styles.button} title = "Sign In" onPress = {() => navigation.navigate("Sign In")}/>
            <Button style = {styles.button} title = "Sign Up" onPress = {() => navigation.navigate("Sign Up")}/>
        </View>
    )
};

export default LandingScreen