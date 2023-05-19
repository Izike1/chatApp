import React, { useState } from "react";
import { Text, View, TextInput, Image, SafeAreaView, TouchableOpacity } from "react-native";
import { auth, database } from "../config/firebase";
import { addDoc, collection } from "firebase/firestore";
import { createUserWithEmailAndPassword } from 'firebase/auth'
const bgImage = require('../assets/BgImage.png');
import styles from './styles'
export default function Login({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const onHandleSignup = async () => {
        try {
            const nameUser = name;
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const { user } = userCredential;
            return await addDoc(collection(database, 'users'), {
                name: nameUser,
                email: user.email,
                id: user.uid,
            })

        } catch (err) {
            console.error('Error registration user', err)
        }
    }

    return (
        <View style={styles.container}>
            <Image source={bgImage} style={styles.bgImage} />
            <View style={styles.whiteSheet} />
            <SafeAreaView style={styles.form}>
                <Text style={styles.title}>Signup</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter name"
                    autoCapitalize="none"
                    autoFocus={true}
                    value={name}
                    onChangeText={(text) => setName(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Enter email"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    autoFocus={true}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Enter password"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                    textContentType="password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
                <TouchableOpacity style={styles.button} onPress={onHandleSignup}>
                    <Text style={{ fontWeight: "bold", color: "#fff", fontSize: 18 }}>Signup</Text>
                </TouchableOpacity>
                <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
                    <Text style={{ color: "grey", fontWeight: "600", fontSize: 14 }}>Your have on account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                        <Text style={{ color: "#f57c00", fontWeight: '600', fontSize: 14 }}>Login</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

        </View>
    )
}