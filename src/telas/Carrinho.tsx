import React, { useState, useEffect, useContext } from "react";
import { View, Text, TextInput, ImageBackground, StyleSheet, FlatList, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ComidaContext from "../context/ComidaContext";
import Header from "./Header";
import { Button } from "@rneui/base";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

export default function CarrinhoPage() {
  const { state } = useContext(ComidaContext);
  const dadosComida = state.dadosComida;
  const [carrinho, setCarrinho] = useState([]);
  const navigation = useNavigation();


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

  const addToCart = async (item) => {
    try {
      const updatedCarrinho = [...carrinho, item];
      setCarrinho(updatedCarrinho);
      await AsyncStorage.setItem("carrinho", JSON.stringify(updatedCarrinho));
      Alert.alert("Adicionar ao Carrinho", `Deseja adicionar ${item.nome} ao carrinho?`);
    } catch (error) {
      console.log("Error adding item to cart", error);
    }
  };

  const removeFromCart = async (index) => {
    try {
      const updatedCarrinho = [...carrinho];
      updatedCarrinho.splice(index, 1);
      setCarrinho(updatedCarrinho);
      await AsyncStorage.setItem("carrinho", JSON.stringify(updatedCarrinho));
    } catch (error) {
      console.log("Error removing item from cart", error);
    }
  };




  const renderItemDoCarrinho = ({ item, index }) => {
    return (
        <View style={styles.item}>
        <ImageBackground style={styles.image} source={item.imagem}>
          <View style={styles.overlay} />
        </ImageBackground>
        <View style={styles.itemDetails}>
          <Text style={styles.itemName}>{item.nome}</Text>
          <Text style={styles.itemDescription}>{item.descricao}</Text>
          <Text style={styles.itemPrice}>R$ {item.preco}</Text>
          <Button size="sm" title="Remover" onPress={() => removeFromCart(index)} />
          <View style={{width: 10, height: 3, backgroundColor: '#ffffff0f'}} />
        <Button size="sm" title="editar" onPress={() => navigation.navigate('ResumoCarrinho')} />
        </View>
      </View>
    );
  };
  const renderItemDoCardapio = ({ item }) => {
    return (
      <View style={styles.item}>
        <ImageBackground style={styles.image} source={item.imagem}>
          <View style={styles.overlay} />
        </ImageBackground>
        <View style={styles.itemDetails}>
          <Text style={styles.itemName}>{item.nome}</Text>
          <Text style={styles.itemDescription}>{item.descricao}</Text>
          <Text style={styles.itemPrice}>R$ {item.preco}</Text>
          <Button
            style={styles.addToCartButton}
            icon={<Ionicons name="cart-outline" size={23} color="#fff" />}
            title="Add Carrinho"
            size="sm"
            onPress={() => addToCart(item)}
          />
        </View>
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
      <View style={{ paddingTop: 20}} >
          <Text style={styles.title} >Rápida e</Text>
          <Text style={styles.title}><Text style={{color:"#000", fontWeight: "700"}}>Deliciosa</Text> Comida</Text>
          
        </View>

        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar..."
        />

        <View style={styles.cardapioContainer}>
          <Text style={styles.cardapioTitle}>Cardápio:</Text>
          <FlatList
            data={dadosComida}
            horizontal={true}
            ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
            renderItem={renderItemDoCardapio}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>

        <View style={styles.cartContainer}>
          <Text style={styles.cartTitle}>Itens do Carrinho:</Text>
          <FlatList
            horizontal={true}
            data={carrinho}
            ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItemDoCarrinho}
          />
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
  header: {
    paddingTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 36,
    color: "#000000",
    fontWeight: "100",
    fontFamily: "Poppins-Regular",
  },
  searchInput: {
    backgroundColor: "#ffffff5e",
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    marginBottom: 30,
  },
  cardapioContainer: {
    marginTop: 20,
  },
  cardapioTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    width: 340,
    backgroundColor: "#ffffff5a",
    borderRadius: 15,
    padding: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 10,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 10,
  },
  itemName: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#fff",
  },
  itemDescription: {
    color: "#fff",
  },
  itemPrice: {
    fontWeight: "bold",
    marginTop: 5,
    color: "#fff",
  },
  addToCartButton: {
    marginLeft: "auto",
  },
  cartContainer: {
    marginTop: 20,
  },
  cartTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
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
});
