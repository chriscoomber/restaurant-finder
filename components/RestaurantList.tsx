import { useNavigation } from "@react-navigation/native";
import { FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";
import { RestaurantStackScreenProps } from "../navigation/types";
import { LEFT_MARGIN } from "../screens/RestaurantSearchScreen";
import { RestaurantInfo } from "../types";
import { Text, View } from "./Themed";

interface Props {
    headerText: string,
    results: RestaurantInfo[]
}

export default function RestaurantList({
    headerText,
    results
}: Props) {
    const navigation = useNavigation<RestaurantStackScreenProps<'RestaurantSearch'>['navigation']>();

    return <View style={styles.container}>
        <View style={styles.headerContainer}>
            <Text style={styles.header}>{headerText}</Text>
            <Text>Results: {results.length}</Text>
        </View>
        <FlatList 
            horizontal
            showsHorizontalScrollIndicator={false}
            data={results}
            keyExtractor={result => result.id}
            renderItem={({item}) => <TouchableOpacity onPress={() => navigation.navigate("RestaurantDetail", { restaurantId: item.id })} style={styles.itemContainer}> 
                <Image style={styles.photo} source={{uri: item.image_url}}/>
                <Text style={styles.name}>{item.name}</Text>
                <Text>{item.rating} stars, {item.review_count} reviews</Text>
            </TouchableOpacity>}/>
    </View>;
}

const withMargin = { 
    marginHorizontal: LEFT_MARGIN
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
    },
    itemContainer: { ...withMargin
    },
    headerContainer: { ...withMargin,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        maxWidth: 300,
        marginBottom: 5,
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        marginEnd: 10
    },
    name: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    photo: {
        width: 250,
        height: 120,
        borderRadius: 4,
        marginBottom: 5,
    }
})