import { View, Text, StyleSheet } from 'react-native';

const NotFoundPage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>404 : Page not found</Text>
      <Text style={styles.subHeader}>
        This page could not be found: maybe it doesn't exist, or you must be logged in to see it, or it is otherwise not available to you.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default NotFoundPage;
