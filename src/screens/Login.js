import React from 'react';
import { SafeAreaView, TextInput, Text, Button, StyleSheet } from 'react-native';
import { Auth } from "aws-amplify";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 40,
        borderWidth:1,
        padding: 10,
        borderRadius: 10,
        margin: 10,
        borderColor: "gray",
        width: 250,
    },
    heading: {
        fontSize: 30, 
        fontWeight: 'bold', 
        alignSelf: 'center',
    },
    

});

const LoginScreen = ({ LogIn, params}) => {

    async function handleSubmit() {    
        try {
          await Auth.signIn(params.Email, params.Password);
          LogIn(true);
        } catch (e) {
        }
    }

    return (
        <SafeAreaView style = {styles.container}>
            <Text style={styles.heading}> Sign In </Text>
            <TextInput
                style = {styles.input}
                onChangeText = {params.ChangeEmail}
                value = {params.Email}
                placeholder = "Enter your email."
                keyboardType = "email-address"
            />
            <TextInput 
                style = {styles.input}
                onChangeText = {params.ChangePass}
                value = {params.Password}
                placeholder = "Enter your password."
                secureTextEntry
            />
            <Button 
                title = "Sign In" onPress = {handleSubmit}
            />
        </SafeAreaView>

    );
};

export default LoginScreen; 