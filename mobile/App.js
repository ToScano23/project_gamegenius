import { StyleSheet, View } from 'react-native';
import container from './navegacao/navegador';




export default function App() {
  return (
    <View style={styles.container}>
      {container}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
