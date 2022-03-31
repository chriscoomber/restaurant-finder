import { Button, StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import { RestaurantStackScreenProps, RootStackScreenProps } from '../navigation/types';

function RestaurantSearchScreen(props: RestaurantStackScreenProps<'RestaurantSearch'>) {
  const { navigation, route } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search</Text>
      <Button title="Go to detail" onPress={() => navigation.navigate("RestaurantDetail", { restaurantId: "The Eatery" })}  />
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
});

export default RestaurantSearchScreen;
