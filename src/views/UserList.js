import React, { useContext } from 'react';
import { View, FlatList, Alert} from 'react-native';
import { ListItem, Avatar, Button, Icon} from '@rneui/themed'; // Make sure you have this library installed

import UsersContext from '../context/UsersContext'

export default props =>  {
    const {state, dispatch } = useContext(UsersContext)
    
    function confirmUserDeletion(user) {
        Alert.alert("Excluir Usuário", "Deseja excluir o usuário", [
            {
                text: "Sim",
                onPress(){
                    dispatch({
                        type: 'deleteUser',
                        payload: user,
                    })
                }
            },
            {
                text: "Nâo"
            }
        ])
    }

    function getAction(user) {
        return (
            <>
                <Button
                    onPress={() => props.navigation.navigate('UserForm',user)}
                    type="clear"
                    icon={<Icon name="edit" size={25} color="orange"/>}
                />
                 <Button
                    onPress={() => confirmUserDeletion(user)}
                    type="clear"
                    icon={<Icon name="delete" size={25} color="red"/>}
                />
            </>
        )
    }
    
    function getUserItem({ item: user }) {
        return (
        <ListItem key={user.id} bottomDivider  
            onPress={() => props.navigation.navigate('UserForm', user)}
            rightElement={getAction(user)}
        >
        <Avatar source={{uri: user.avatarUrl}} />
        <ListItem.Content>
          <ListItem.Title>{user.name}</ListItem.Title>
          <ListItem.Subtitle>{user.email}</ListItem.Subtitle>          
        </ListItem.Content>
        <View>
            <ListItem.Subtitle>{getAction()}</ListItem.Subtitle>
        </View>
      </ListItem>
        );
    }

    return (
        <View>
            <FlatList
                keyExtractor={user => user.id.toString()}
                data={state.users}
                renderItem={getUserItem}
            />
        </View>
    );
}
