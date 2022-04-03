import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { BASEURL, HEADERS, SEARCH_ROUTE } from '../apis/yelp';
import RestaurantList from '../components/RestaurantList';
import SearchBar from '../components/SearchBar';

import { Text } from '../components/Themed';
import useSearchResults from '../hooks/useSearchResults';
import { RestaurantStackScreenProps } from '../navigation/types';
import { RestaurantInfo } from '../types';

export const LEFT_MARGIN = 10;

function RestaurantSearchScreen(props: RestaurantStackScreenProps<'RestaurantSearch'>) {
  const { navigation, route } = props;

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, launchSearch] = useSearchResults<string, RestaurantInfo[]>(
    (term: string) => ({
      info: `${BASEURL}${SEARCH_ROUTE}?location="NY"&limit=50&term=${term}`,
      init: {
        method: "get",
        headers: new Headers(HEADERS)
      } 
    }),
    (json: object) => (json as any).businesses  // TODO: actually validate and error sensibly
  );
  useEffect(() => launchSearch('pasta'), []);

  return (
    <>
      <SearchBar 
        searchTerm={searchTerm}
        onSearchTermChanged={setSearchTerm}
        onSubmit={() => launchSearch(searchTerm)}/>
      {
        searchResults === null ? <Text style={styles.text}>Loading...</Text> : 
          typeof(searchResults) === 'string' ? <Text style={styles.text}>Error: {searchResults}</Text> : 
            searchResults.length === 0 ? <Text style={styles.text}>No results found!</Text> : <ScrollView>
              <RestaurantList headerText='Cheap Eats' results={searchResults.filter(it => it.price === '$')}/>
              <RestaurantList headerText='Middling Meals' results={searchResults.filter(it => it.price === '$$')}/>
              <RestaurantList headerText='Dear Dining' results={searchResults.filter(it => it.price === '$$$')}/>
            </ScrollView>
      }
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
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
  text: {
    marginLeft: LEFT_MARGIN
  }
});

export default RestaurantSearchScreen;
