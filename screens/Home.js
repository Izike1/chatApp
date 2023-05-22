import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../config/firebase";
import { FontAwesome } from '@expo/vector-icons';
import colors from '../colors';
import UserList from "../components/UserList";

const catImageUrl = "https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=49ed3252c0b2ffb49cf8b508892e452d";

const Home = () => {
    const [selectedRecipient, setSelectedRecipient] = useState(null)
    const [users, setUsers] = useState([]);
    const navigation = useNavigation()
    const usersCollectionRef = collection(database, 'users');
    const handleSelectRecipient = (recipientId) => {
        setSelectedRecipient(recipientId);
        navigation.navigate('Chat', recipientId);
    };
    const getUsers = async () => {
        try {
            const querySnapshot = await getDocs(usersCollectionRef);
            const userData = querySnapshot.docs.map((doc) => doc.data())
            setUsers(userData);
        }
        catch (e) {
            console.error("Error get users", e)
            setUsers([])
        }
    }
    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <FontAwesome name="search" size={24} color={colors.gray} style={{ marginLeft: 15 }} />
            ),
            headerRight: () => (
                <Image
                    source={{ uri: catImageUrl }}
                    style={{
                        width: 40,
                        height: 40,
                        marginRight: 15,
                    }}
                />
            ),
        });
        getUsers().then(r => r);
    }, [navigation]);

    return (
        <View style={styles.container}>
            <View style={styles.userList}>
                <UserList users={users} onSelectRecipient={handleSelectRecipient} />
            </View>
        </View>
    )
}
export default Home;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        backgroundColor: "#fff",
    },
    chatButton: {
        backgroundColor: colors.primary,
        height: 50,
        width: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: colors.primary,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: .9,
        shadowRadius: 8,
        marginRight: 20,
        marginBottom: 50,
    },
    userList: {
        position:'absolute',
        top: 0,
        left: 0,
        width: '100%',
        paddingHorizontal: 5,
        paddingTop: 10,

    }
});
