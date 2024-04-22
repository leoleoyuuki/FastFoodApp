import { Ionicons } from "@expo/vector-icons";
import { Avatar, Header } from "@rneui/base";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HeaderComponent() {
  const navigation = useNavigation();

  const logout = () => {
    AsyncStorage.removeItem("logado")
    alert("Você foi deslogado com sucesso!")
    navigation.navigate("Login")
  }

  return (
    <Header
      backgroundColor="transparent"
      rightComponent={
        <Avatar
          source={require("../../assets/perfil.png")}
          rounded
          size={"small"}
        />
      }
      leftComponent={
        <Ionicons
          name="log-out"
          onPress={logout}
          size={32}
          color={"#ffffffab"}
        />
      }
    />
  );
}
