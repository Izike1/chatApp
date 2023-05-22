import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, Text } from 'react-native';

const UserList = ({ users, onSelectRecipient }) => {
    const [selectedRecipient, setSelectedRecipient] = useState(null);

    const handleSelectRecipient = (recipientId) => {
        setSelectedRecipient(recipientId);
        onSelectRecipient({recipientId});
    };

    return (
        <View>
            <FlatList
                data={users}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={{
                            paddingVertical: 10,
                            paddingHorizontal: 16,
                            borderBottomWidth: 1,
                            borderBottomColor: '#EAEAEA',
                        }}
                        onPress={() => handleSelectRecipient(item.id)}
                    >
                        <Text style={{ fontSize: 16 }}>{item.name}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id}
                extraData={selectedRecipient}
            />
        </View>
    );
};

export default UserList;