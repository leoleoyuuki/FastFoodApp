import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Button, Icon } from "@rneui/base";
import ResumoCarrinho from "./src/telas/ResumoCarrinho";
import Home from "./src/telas/Home";
import { ComidaProvider } from "./src/context/ComidaContext";
import { StatusBar } from "expo-status-bar";
import Carrinho from "./src/telas/Carrinho";
import { Ionicons } from "@expo/vector-icons";
import Cadastro from "./src/telas/Cadastro";
import Login from "./src/telas/Login";
import Membros from "./src/telas/Membros";

const { Navigator, Screen } = createBottomTabNavigator();

export default function App() {
  return (
    <ComidaProvider>
      <NavigationContainer>
        <Navigator
          initialRouteName="Cadastro"
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
            name="Cadastro"
            component={Cadastro}
            options={() => ({
              title: "Cadastro",
              headerShown: false,
              tabBarButton: () => null, // Ocultar completamente o botão da tabBar

            })}
          />
          
          <Screen
            name="Login"
            component={Login}
            options={() => ({
              title: "Login",
              headerShown: false,
              tabBarButton: () => null, // Ocultar completamente o botão da tabBar

            })}
          />
          
          <Screen
            name="Home"
            component={Home}
            options={({ navigation }) => {
              return {
                title: "Home",
                headerShown: false,
                tabBarLabel: "Home",
                tabBarIcon: ({ color, size }) => (
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
                headerShown: false,
                tabBarLabel: "Carrinho",
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="cart-outline" color={color} size={size} />
                ),
                headerRight: () => (
                  <Button
                    type="clear"
                    icon={
                      <Ionicons name="cart-outline" color="white" size={30} />
                    }
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
                headerShown: false,
                tabBarLabel: "Resumo Carrinho",
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="cash-outline" color={color} size={size} />
                ),
                headerRight: () => (
                  <Button
                    type="clear"
                    icon={
                      <Ionicons name="cart-outline" color="white" size={30} />
                    }
                    onPress={() => navigation.navigate("ResumoCarrinho")}
                  />
                ),
              };
            }}
          />
          <Screen
            name="Membros"
            component={Membros}
            options={() => ({
              title: "Membros",
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="people" color={color} size={size} />
              )
            })}
          />
        </Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </ComidaProvider>
  );
}
