import { Ionicons } from "@expo/vector-icons";
import { Avatar, Header } from "@rneui/base";
import React from "react";

export default function HeaderComponent() {
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
      leftComponent={<Ionicons name="cart-outline" size={32} color={'#ffffffab'}/>}
    />
  );
}
