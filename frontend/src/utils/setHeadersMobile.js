import AsyncStorage from '@react-native-community/async-storage';
export default () => ({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'x-auth-token': AsyncStorage.getItem('@token'),
  },
});
