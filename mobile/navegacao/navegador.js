import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ConsultaTela from '../telas/ConsultaTela'
import RelatoriosTela from '../telas/RelatoriosTela'


const Stack = createNativeStackNavigator()

const container = (
    <NavigationContainer>
        <Stack.Navigator 
            initialRouteName="ConsultaTela"
            screenOptions={{
                headerStyle: '#1c1c3f',
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