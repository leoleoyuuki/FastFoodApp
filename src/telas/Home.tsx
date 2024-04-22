import { Button, Text } from "@rneui/base";
import { Alert, FlatList, ImageBackground, StyleSheet, View, Image } from "react-native";
import React from "react";
import { useFonts } from 'expo-font';
import { useContext, useEffect, useState } from "react";
import ComidaContext from "../context/ComidaContext";
import { TextInput } from "react-native";
import Header from "./Header";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

export default function Home() {
  const navigation = useNavigation();
  const [carrinho, setCarrinho] = useState([]);

  const loadCarrinho = async () => {
    try {
      const carrinhoData = await AsyncStorage.getItem("carrinho");
      if (carrinhoData) {
        setCarrinho(JSON.parse(carrinhoData));
      }
    } catch (error) {
      console.log("Error loading cart items", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const checkLogin = async () => {
        const logado = await AsyncStorage.getItem("logado");
        if (logado === null) {
          Alert.alert("Faça o login para acessar o App!");
          navigation.navigate("Login");
        } else {
          loadCarrinho();
        }
      };
      checkLogin();
    }, [])
  );

  const { state } = useContext(ComidaContext);
  const dadosComida = state.dadosComida;

  const getComida = ({ item }) => {
    const addCarrinho = (item) => {
      Alert.alert("Adicionar ao Carrinho", `Deseja adicionar ${item.nome} ao carrinho?`, [
        {
          text: "Sim",
          onPress: () => {
            const updatedCarrinho = [...carrinho, item];
            setCarrinho(updatedCarrinho);
            AsyncStorage.setItem("carrinho", JSON.stringify(updatedCarrinho));
          },
        },
        {
          text: "Cancelar",
          style: "cancel",
        },
      ]);
    };

    return (
      <View style={styles.comidaContainer}>
        <Image style={styles.imagem} source={item.imagem} />
        <View style={styles.textContainer}>
          <Text style={styles.nome}>{item.nome}</Text>
          <Text style={styles.descricao}>{item.descricao}</Text>
          <View style={styles.precoContainer}>
            <Text style={styles.preco}>R$ {item.preco}</Text>
            <Button
              icon={<Ionicons name="cart-outline" size={23} color="#fff" />}
              type="clear"
              onPress={() => addCarrinho(item)}
            />
          </View>
        </View>
      </View>
    );
  };

  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../../assets/Poppins-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null; // Se as fontes não estiverem carregadas, retornamos null para evitar renderização com fontes ausentes
  }

  return (
    <ImageBackground source={require("../../assets/backgroundimg.jpg")} style={styles.backgroundImage}>
      <Header />
      <View style={styles.container}>
        <View style={styles.tituloContainer}>
          <Text style={styles.titulo}>Rápida e</Text>
          <Text style={styles.titulo}><Text style={styles.destaque}>Deliciosa</Text> Comida</Text>
        </View>
        <TextInput style={styles.input} placeholder={`Pesquisar... `} />
        <Text style={styles.subtitulo}>Para você que não gosta de esperar...</Text>
        <FlatList
          data={dadosComida}
          horizontal={true}
          ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
          renderItem={getComida}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    padding: 12,
  },
  tituloContainer: {
    paddingTop: 20,
  },
  titulo: {
    fontSize: 36,
    color: "#000000",
    fontWeight: "100",
    paddingLeft: 10,
    lineHeight: 45,
    fontFamily: "Poppins-Regular",
  },
  destaque: {
    color: "#000",
    fontWeight: "700",
  },
  input: {
    backgroundColor: "#ffffff5e",
    borderRadius: 10,
    marginTop: 10,
    padding: 10,
    marginBottom: 30,
  },
  subtitulo: {
    color: "#fff",
    fontWeight: "800",
    textShadowOffset: { width: 0, height: 1 },
    textShadowColor: "#edd0f8ae",
    textShadowRadius: 5,
    marginBottom: 20,
  },
  comidaContainer: {
    backgroundColor: "#ffffff5a",
    flexDirection: "column",
    justifyContent: "space-between",
    width: 230,
    height: 280,
    padding: 10,
    borderRadius: 15,
    alignItems: "center",
    paddingTop: 30,
  },
  imagem: {
    width: 130,
    height: 130,
  },
  textContainer: {
    gap: 5,
  },
  nome: {
    color: "#fff",
  },
  descricao: {
    color: "#fff",
  },
  precoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  preco: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#fff",
  },
});
