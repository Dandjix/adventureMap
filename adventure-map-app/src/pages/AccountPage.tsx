import { View, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-paper';
import IUser from '../models/User';
import NotFoundPage from './NotFoundPage';

const AccountPage = ({ user }: { user?: IUser }) => {
  if (!user) {
    return <NotFoundPage />;
  }

  return (
    <View style={styles.container}>
      <Avatar.Text size={64} label={user.username[0].toUpperCase()} />
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

export default AccountPage;
