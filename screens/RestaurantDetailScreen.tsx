import { useEffect } from 'react';
import { FlatList, Image, StyleSheet } from 'react-native';
import { BASEURL, DETAIL_ROUTE, HEADERS } from '../apis/yelp';

import { Text, View } from '../components/Themed';
import useSearchResults from '../hooks/useSearchResults';
import { RestaurantStackScreenProps } from '../navigation/types';
import { RestaurantDetailedInfo } from '../types';

function RestaurantDetailScreen({navigation, route}: RestaurantStackScreenProps<'RestaurantDetail'>) {
  const { restaurantId } = route.params;

  const [searchResults, launchSearch] = useSearchResults<string, RestaurantDetailedInfo>(
    (id: string) => ({
      info: `${BASEURL}${DETAIL_ROUTE(id)}`,
      init: {
        method: "get",
        headers: new Headers(HEADERS)
      } 
    }),
    (json: object) => (json as any)  // TODO: actually validate and error sensibly
  );
  useEffect(() => launchSearch(restaurantId), []);

  return (
    <View style={styles.container}>
    { searchResults === null ? <Text style={styles.text}>Loading...</Text> : 
      typeof(searchResults) === 'string' ? <Text style={styles.text}>Error: {searchResults}</Text> : 
        searchResults.photos.length === 0 ? <Text style={styles.text}>No photos found!</Text> : 
          <FlatList             
            data={searchResults.photos}
            keyExtractor={result => result}
            renderItem={({item}) => <Image style={styles.photo} source={{uri: item}}/>}/>
    }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  text: {},
  photo: {
    width: 300,
    height: 200,
    marginVertical: 5,
  }
});

export default RestaurantDetailScreen;
