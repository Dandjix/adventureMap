import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const HomePage = () => {
  return (
    <View style={styles.container}>
      <Button mode="contained" onPress={() => console.log('Button Pressed')}>
        Home button
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomePage;
