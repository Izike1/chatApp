import React, { useCallback, useLayoutEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { addDoc, collection, doc, onSnapshot, setDoc } from '@firebase/firestore';
import { signOut } from '@firebase/auth';
import { auth, database } from '../config/firebase';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import colors from '../colors';

export default function Chat({ route }) {
    const { recipientId } = route.params;
    const [messages, setMessages] = useState([]);
    const navigation = useNavigation();

    const chatId = [auth.currentUser.uid, recipientId].sort().join('_');

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
        const collectionRef = collection(database, 'chats', chatId, 'messages');

        const unsubscribe = onSnapshot(collectionRef, snapshot => {
            const loadedMessages = snapshot.docs.map(doc => ({
                _id: doc.id,
                createdAt: doc.data().createdAt.toDate(),
                text: doc.data().text,
                user: doc.data().user,
            }));
            loadedMessages.sort((a, b) => b.createdAt - a.createdAt);
            setMessages(loadedMessages);
        });

        return () => unsubscribe();
    }, [recipientId]);

    //const createChat = async (currentUserUid, recipientUid, chatId) => {
    //    try {
    //        const chatRef = doc(database, 'chats', chatId);
    //        const usersCollectionRef = collection(chatRef, 'users');

    //        await setDoc(usersCollectionRef.doc(currentUserUid), { userId: currentUserUid });
    //        await setDoc(usersCollectionRef.doc(recipientUid), { userId: recipientUid });

    //        console.log('Chat created successfully');
    //    } catch (error) {
    //        console.error('Error creating chat:', error);
    //    }
    //};

    const onSend = useCallback(async (messages = []) => {
        const currentUserUid = auth.currentUser.uid;
        //await createChat(currentUserUid, recipientId, chatId);
        const { _id, createdAt, text, user } = messages[0];

        const chatRef = doc(database, 'chats', chatId);
        const messageCollectionRef = collection(chatRef, 'messages');

        await addDoc(messageCollectionRef, {
            _id,
            createdAt,
            text,
            user,
            recipientId,
        });
    }, [recipientId, chatId]);

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
                avatar: 'https://placeimg.com/140/140/any',
            }}
        />
    );
}