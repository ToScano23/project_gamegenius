import { StyleSheet, Text, View } from 'react-native';
import Form from './components/Form/Form';
import Resposta from './components/Resposta';
import Header from './components/Header';
import Cartao from './components/Cartao/Cartao';
import ConsultaTela from './telas/ConsultaTela';




export default function App() {
  return (
    <View style={styles.container}>
      <ConsultaTela/>
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
