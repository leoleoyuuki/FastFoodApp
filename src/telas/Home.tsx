import { Avatar, Button, color, Icon, ListItem, Text } from "@rneui/base";
import {
  Alert,
  FlatList,
  ImageBackground,
  StyleSheet,
  View,
  Image,
} from "react-native";
import { useFonts } from 'expo-font';
import { useContext, useEffect, useState } from "react";
import UsuarioContext from "../context/UsuarioContext";
import { TextInput } from "react-native";
import Header from "./Header";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default (props) => {
  const { state } = useContext(UsuarioContext);
  const dadosUsuario = state.dadosUsuario;
  const [carrinho,setCarrinho] = useState([])

  const navigation = useNavigation();

  const loadCarrinho = async () => {
    try {
      setCarrinho([])
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
      console.log('Tela Home');
      // Exemplo de recarregar os dados do carrinho
      loadCarrinho();
    });

    // Retorno da função de limpeza do listener
    return () => {
      focusListener();
    };
  }, []);

  
  const getComida = ({ item }) => {

    const addCarrinho = (item) => {
      Alert.alert("Adicionar ao Carrinho", `Deseja adicionar ${item.nome} ao carrinho?`, [
        {
          text: "Sim",
          onPress: () => {
            const updatedCarrinho = [...carrinho, item];
            setCarrinho(updatedCarrinho)
            console.log("Item adicionado ao carrinho:", item);
            AsyncStorage.setItem("carrinho",JSON.stringify(updatedCarrinho))

          },
        },
        {
          text: "Cancelar",
          style: "cancel",
        },
      ]);
    };

    return (
      <View
        style={{
          backgroundColor: "#ffffff5a",
          flexDirection: "column",
          justifyContent: "space-between",
          width: 230,
          height: 280,
          padding: 10,
          borderRadius: 15,
          alignItems: "center",
          paddingTop: 30,
        }}
      >
        <Image style={{ width: 130, height: 130 }} source={item.imagem} />

        <View>
          <View style={{ gap: 5 }}>
            <Text style={{color: "#fff"}}>{item.nome}</Text>
            <Text style={{color: "#fff"}}>{item.descricao}</Text>
          </View>

          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>

            <Text style={{ fontSize: 19, fontWeight: "bold", color: "#fff" }}>R$ {item.preco}</Text>


            <View style={{ flexDirection: "row", justifyContent: "center" }} >
            
              <Button
                style={{ backgroundColor: "#fff", padding:2 }}
                icon={<Ionicons name="cart-outline" size={23} color="#fff" />}
                type="clear"
                onPress={()=>addCarrinho(item)}
              />
              
            </View>
          </View>
        </View>
      </View>
    );
  };

  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../../assets/Poppins-Regular.ttf'),
  });

  return (
    <ImageBackground
      source={require("../../assets/backgroundimg.jpg")}
      style={styles.backgroundImage}
    >

    <Header />

      <View style={{padding:12}}>
        <View style={{ paddingTop: 20}} >
          <Text style={styles.title} >Rápida e</Text>
          <Text style={styles.title}><Text style={{color:"#000", fontWeight: "700"}}>Deliciosa</Text> Comida</Text>
          
        </View>

          <TextInput
          style={{backgroundColor:"#ffffff5e",borderRadius:10,marginTop:10,padding:10, marginBottom: 30}}
          placeholder={`Pesquisar... `} />


          <View style={{marginBottom: 20}} >
            <Text style={{color: "#fff", fontWeight: "800",textShadowOffset: { width: 0, height: 1   } , textShadowColor: "#edd0f8ae", textShadowRadius: 5 }}>Para você que não gosta de esperar... </Text>
          </View>

        <FlatList
          data={dadosUsuario}
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
  title: {
    fontSize: 36,
    color: "#000000",
    fontWeight: "100",
    paddingLeft: 10,
    lineHeight: 45,
    fontFamily: "Poppins-Regular",
  },
});
