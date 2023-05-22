import React, {useState} from "react";
import { Text, View, TextInput, Image, SafeAreaView, TouchableOpacity, Alert} from "react-native";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../config/firebase";
const bgImage = require('../assets/BgImage.png');
import styles from './styles'
export default function Login ({ navigation }) {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const onHandleLogin = () => {
        if (email !== '' && password !== '') {
            signInWithEmailAndPassword(auth,email,password)
                .then(() => console.log('Login success'))
                .catch((err) => Alert.alert('Login error', err.message))
        }
    }

    return (
        <View style={styles.container}>
            <Image source={bgImage} style={styles.bgImage}/>
            <View style={styles.whiteSheet} />
            <SafeAreaView style={styles.form}>
                <Text style={styles.title}>Login</Text>
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
                <TouchableOpacity style={styles.button} onPress={onHandleLogin}>
                    <Text style={{fontWeight:"bold", color:"#fff", fontSize: 18}}>Login</Text>
                </TouchableOpacity>
                <View style={{marginTop: 20, flexDirection: 'row', alignItems:'center', alignSelf:'center'}}>
                    <Text style={{color: "grey", fontWeight: "600", fontSize:14}}>Don't have on account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                        <Text style={{color:"#f57c00", fontWeight: '600', fontSize: 14}}>Sing up</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

        </View>
    )
}