import React, { useState, useLayoutEffect, useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { collection, addDoc, doc, onSnapshot } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { auth, database } from '../config/firebase';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import colors from '../colors';

export default function Chat({ route }) {
    const { recipientId } = route.params;
    const [messages, setMessages] = useState([]);
    const navigation = useNavigation();

    const chatId = recipientId;

    const onSignOut = () => {
        signOut(auth).catch(error => console.log('Error logging out: ', error));
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    style={{ marginRight: 10 }}
                    onPress={onSignOut}
                >
                    <AntDesign
                        name="logout"
                        size={24}
                        color={colors.gray}
                        style={{ marginRight: 10 }}
                    />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    useLayoutEffect(() => {
        const collectionRef = collection(
            database,
            'chats',
            recipientId,
            'messages'
        );

        const unsubscribe = onSnapshot(collectionRef, snapshot => {
            const loadedMessages = snapshot.docs.map(doc => ({
                _id: doc.id,
                createdAt: doc.data().createdAt.toDate(),
                text: doc.data().text,
                user: doc.data().user,
            }));
            setMessages(loadedMessages);
        });

        return () => unsubscribe();
    }, [recipientId]);

    const onSend = useCallback(async (messages = []) => {
        const { _id, createdAt, text, user } = messages[0];

        const chatDocRef = doc(database, 'chats', recipientId);
        const messageCollectionRef = collection(chatDocRef, 'messages');

        await addDoc(messageCollectionRef, {
            _id,
            createdAt,
            text,
            user,
        });
    }, [recipientId]);

    return (
        <GiftedChat
            messages={messages}
            showAvatarForEveryMessage={false}
            showUserAvatar={false}
            onSend={messages => onSend(messages)}
            messagesContainerStyle={{
                backgroundColor: '#fff',
            }}
            textInputStyle={{
                backgroundColor: '#fff',
                borderRadius: 20,
            }}
            user={{
                _id: auth?.currentUser?.uid,
                avatar: 'https://i.pravatar.cc/300',
            }}
        />
    );
}