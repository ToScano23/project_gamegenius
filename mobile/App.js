import { StyleSheet, Text, View } from 'react-native';
import Form from './components/Form/Form';
import Resposta from './components/Resposta';



export default function App() {
  return (
    <View style={styles.container}>
      <Form />
      <Resposta />
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
