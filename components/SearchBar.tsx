import { Platform, StyleSheet, TextInput } from 'react-native';

import { Text, View } from '../components/Themed';
import { Feather } from '@expo/vector-icons';

type Props = {
    searchTerm: string, 
    onSearchTermChanged: (newSearchTerm: string) => void,
    onSubmit: () => void
}

export default function SearchBar({searchTerm, onSearchTermChanged, onSubmit}: Props) {
    return <View style={styles.container}>
        <Feather name="search" style={styles.icon}/>
        <TextInput 
            placeholder='Search' 
            value={searchTerm}
            onChangeText={onSearchTermChanged}
            onEndEditing={onSubmit}
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}/>
    </View>;
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f0eeee",
        height: 50,
        borderRadius: 5,
        marginHorizontal: 15,
        marginVertical: 15,
        flexDirection: "row",
        alignItems: 'center'
    },
    icon: {
        fontSize: 35,
        marginHorizontal: 15
    },
    input: {
        flex: 1,  // Eat up space in flex direction
        alignSelf: 'stretch',  // Eat up space in non-flex direction
        fontSize: 18
    }
});
