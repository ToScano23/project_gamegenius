import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ConsultaTela from '../telas/ConsultaTela'
import RelatoriosTela from '../telas/RelatoriosTela'
import Cores from '../constantes/Cores'


const Stack = createNativeStackNavigator()

const container = (
    <NavigationContainer>
        <Stack.Navigator 
            initialRouteName="ConsultaTela"
            screenOptions={{
                headerStyle: {backgroundColor:Cores.primary},
                headerTintColor: '#1c1c3f'
            }}
        >
            <Stack.Screen name="RelatoriosTela" component={RelatoriosTela}/>
            <Stack.Screen name="ConsultaTela" 
                component={ConsultaTela}
            />
        </Stack.Navigator>
    </NavigationContainer>
)
export default container