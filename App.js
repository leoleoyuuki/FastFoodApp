import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Button, Icon, Text } from "@rneui/base";
import ResumoCarrinho from "./src/telas/ResumoCarrinho";
import TelaLista from "./src/telas/Home";
import { UsuarioProvider } from "./src/context/UsuarioContext";
import { ImageBackground } from "react-native";
import { StatusBar } from "expo-status-bar";
import Carrinho from "./src/telas/Carrinho";
import { Ionicons } from "@expo/vector-icons";

const { Navigator, Screen } = createBottomTabNavigator();

export default function App() {
  return (
    <UsuarioProvider>
      <NavigationContainer>
        <Navigator
          initialRouteName="TelaList"
          screenOptions={{
            headerShown: false,
            tabBarStyle: {
              backgroundColor: "#000000",
              opacity: 0.7,
              padding: 0,
              margin: 0,

            },
          }}
        >
          <Screen
            name="Home"
            component={TelaLista}
            
            options={({ navigation }) => {
              return {
                title:'Home',
                headerShown:false,
                tabBarLabel:'Home',
                tabBarIcon:({color, size}) => (
                    <Ionicons name="home-outline" color={color} size={size} />
                ),
                headerRight: () => (
                  <Button
                    type="clear"
                    icon={<Icon name="add" color="white" size={30} />}
                    onPress={() => navigation.navigate("TelaForm")}
                  />
                ),
              };
            }}
          />
          <Screen
            name="Carrinho"
            component={Carrinho}
            options={({ navigation }) => {
              return {
                title: "Carrinho: ",
                headerShown:false,
                tabBarLabel:'Carrinho',
                tabBarIcon:({color, size}) => (
                    <Ionicons name="cart-outline" color={color} size={size} />
                ),
                headerRight: () => (
                  <Button
                    type="clear"
                    icon={<Ionicons name="cart-outline" color="white" size={30} />}
                    onPress={() => navigation.navigate("Carrinho")}
                  />
                ),
              };
            }}
          />
          <Screen
            name="ResumoCarrinho"
            component={ResumoCarrinho}
            options={({ navigation }) => {
              return {
                title: "Resumo Carrinho: ",
                headerShown:false,
                tabBarLabel:'Resumo Carrinho',
                tabBarIcon:({color, size}) => (
                    <Ionicons name="cash-outline" color={color} size={size} />
                ),
                headerRight: () => (
                  <Button
                    type="clear"
                    icon={<Ionicons name="cart-outline" color="white" size={30} />}
                    onPress={() => navigation.navigate("ResumoCarrinho")}
                  />
                ),
              };
            }}
          />
        </Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </UsuarioProvider>
    
  );
}
