import React, { useContext, useEffect, useState } from "react";
import { Alert, FlatList, ImageBackground, StyleSheet, Text, TextInput, View } from "react-native";
import { Button, Icon } from "@rneui/base";
import UsuarioContext from "../context/UsuarioContext";
import Header from "./Header";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function CarrinhoPage(props) {
  const { state } = useContext(UsuarioContext);
  const dadosUsuario = state.dadosUsuario;
  const [carrinho, setCarrinho] = useState(dadosUsuario);

  const alterarDescricao = (index, novaDescricao) => {
    const novoCarrinho = [...carrinho];
    novoCarrinho[index].descricao = novaDescricao;
    setCarrinho(novoCarrinho);
    AsyncStorage.setItem("carrinho", JSON.stringify(novoCarrinho));
  };


  const navigation = useNavigation();


 



  const loadCarrinho = async () => {
    try {
      const carrinhoData = await AsyncStorage.getItem("carrinho");
      if (carrinhoData) {
        setCarrinho(JSON.parse(carrinhoData));
        console.log(carrinhoData)
      }
    } catch (error) {
      console.log("Error loading cart items", error);
    }
  };
  useEffect(() => {
    const focusListener = navigation.addListener('focus', () => {
      // Aqui você pode colocar a lógica que deseja executar quando a tela for focada
      console.log('Tela do carrinho foi focada');
      // Exemplo de recarregar os dados do carrinho
      loadCarrinho();
    });

    // Retorno da função de limpeza do listener
    return () => {
      focusListener();
    };
  }, []);


  const removerItemDoCarrinho = (index) => {
    Alert.alert(
      "Remover Item",
      `Deseja remover ${carrinho[index].nome} do carrinho?`,
      [
        {
          text: "Sim",
          onPress: () => {
            const novoCarrinho = [...carrinho];
            novoCarrinho.splice(index, 1);
            setCarrinho(novoCarrinho);
            AsyncStorage.setItem("carrinho", JSON.stringify(novoCarrinho));
          },
        },
        {
          text: "Cancelar",
          style: "cancel",
        },
      ]
    );
  };

  const renderItemDoCarrinho = ({ item, index }) => {
    return (
      <View style={styles.itemContainer}>
        <Text>{item.nome}</Text>
        <TextInput
          style={styles.descricaoInput}
          value={item.descricao}
          onChangeText={(novaDescricao) => alterarDescricao(index, novaDescricao)}
        />
        <Text>R$ {item.preco}</Text>
        <Button
          icon={<Ionicons name="trash-outline" />}
          type="clear"
          onPress={() => removerItemDoCarrinho(index)}
        />
      </View>
    );
  };

  return (
    <ImageBackground
      source={require("../../assets/backgroundimg.jpg")}
      style={styles.backgroundImage}
    >
      <Header />
      <View style={styles.container}>
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar..."
        />

        <FlatList
          data={carrinho}
          renderItem={renderItemDoCarrinho}
          keyExtractor={(item) => item.id.toString()}
        />

        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total do Carrinho:</Text>
          <Text style={styles.totalValue}>
            R$ {carrinho.reduce((total, item) => total + item.preco, 0)}
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    padding: 12,
  },
  searchInput: {
    backgroundColor: "#ffffff5e",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffff5a",
    borderRadius: 15,
    padding: 10,
    marginBottom: 10,
  },
  descricaoInput: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: "#ffffff5e",
    borderRadius: 10,
    padding: 5,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});
