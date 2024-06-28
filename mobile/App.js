import { StyleSheet, View } from 'react-native';
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
