import React from 'react';
import { StyleSheet, Text, SafeAreaView, View, FlatList, TextInput, Button } from 'react-native';
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

class Friend extends React.Component {
    state = { friends: [], input: "", nickname: "", valid: [], pass: false, userPresent: false, email: ""}

    verifyID = async(userInput) => {
        for(let i = 0; i < this.state.valid.length; i += 1){
            console.log(userInput, this.state.valid[i].name)
            if (userInput == this.state.valid[i].name) {
                this.setState({pass: true})
            }
        }
        console.log(this.state.pass)
    }

    async componentDidMount() {
        const response = await Auth.currentUserInfo()
        const userId = response.username
        console.log(userId)
        const selfData = await API.graphql(graphqlOperation(queries.listFriends, { filter: {selfPostsId: {eq: userId}} }))
        console.log("componentDidMount")
        const allData = await API.graphql(graphqlOperation(queries.listSelves))
        this.setState({ friends: selfData.data.listFriends.items, valid: allData.data.listSelves.items })
        console.log(this.state.valid)
    }

    getFriendsList = async () => {
        try {
            const response = await API.graphql(graphqlOperation(queries.listFriends))
            this.setState({ friends: response.data.listFriends.items })
        } catch (err) {
            console.error(err);
        }
    }

    addFriend = async () => {
        await this.verifyID(this.state.input)
        if (this.state.pass) {
            try {
                const response = await Auth.currentUserInfo()
                const userId = response.username
                console.log(this.state.input, this.state.nickname, userId)
                await API.graphql(graphqlOperation(mutations.createFriend, 
                    { input: {username: this.state.input, nickname: this.state.nickname, email: this.state.email, selfPostsId: userId}}))
                console.log("passed")
                this.setState({ input: "", nickname: "", email: "", pass: false})
                this.getFriendsList()
            } catch (err) {
                console.error(err);
            }
        } else {
            console.log("ID does not exist!")

        }
        
    }

    deleteFriend = async (id) => {
        try {
            await API.graphql(graphqlOperation(mutations.deleteFriend, { input: { id: id} }))
            this.getFriendsList()
        } catch (err) {
            console.error(err);
        }
    }


    render() {

        return (
            <View style={styles.container}>
                <Text style = {styles.heading}>Add Friends{"\n"}</Text>
                <TextInput
                    style={styles.input}
                    value={this.state.input}
                    placeholder="Type your friend's ID"
                    onChangeText={(text) => this.setState({ input: text })}
                />
                <TextInput
                    style={styles.input}
                    value={this.state.email}
                    placeholder="Type your friend's email"
                    onChangeText={(text) => this.setState({ email: text })}
                />
                <TextInput
                    style = {styles.input}
                    value = {this.state.nickname}
                    placeholder= "Type your friend's name (optional)"
                    onChangeText = {(text) => this.setState({ nickname: text })}
                />
                <Button title="Add Friend" onPress={this.addFriend} />
                <Text style = {styles.item}>
                    <Text style = {styles.heading}>My Friends{"\n"}</Text>
                </Text>
                <Text style={styles.body}>You currently don't have any friends! Begin by adding friends by their ID above.</Text>
                <FlatList
                    data={this.state.friends}
                    renderItem={({ item }) => (
                        <View>
                            <Text style={styles.item}>
                                <Text style = {{fontWeight: "bold"}}>Name: </Text>
                                <Text>{item.nickname}    </Text>
                            </Text>
                            <Button title="Delete Friend" color="#ffa500" onPress={() => this.deleteFriend(item.id)} />
                        </View>

                    )}
                />
            </View>
        )

    }
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
    },
    input: {
        height: 40,
        borderWidth:1,
        padding: 10,
        borderRadius: 10,
        margin: 10,
        borderColor: "gray",
    },
    heading: {
        fontSize: 30,
        height: 66,
        fontWeight: "bold",
    },
    body: {
        height: 66,
        fontSize: 16,
        margin: 20,
        color: "gray",
    }
})


export default withAuthenticator(Friend, { includeGreeetings: false})