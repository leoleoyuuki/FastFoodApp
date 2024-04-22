import { Text, Button } from "@rneui/base";
import { useEffect, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  useEffect(() => {
    
    const logado =  AsyncStorage.getItem("logado")
    console.log(logado)
    if (!logado) {
      alert("Faça o login para acessar o App!")
    }else{
        navigation.navigate("Home")
    }
    },[])


  const navigation = useNavigation();

  const cadastrar = async (item) => {

    const dadosUsuario = await AsyncStorage.getItem("usuario");

    console.log(nome, email, senha);
    const usuario = {
      nome: nome,
      email: email,
      senha: senha,
    };
    if (dadosUsuario && dadosUsuario.includes(usuario.email)) {
        alert("Usuário já cadastrado! Tente com outro email ou faça o login.");
    } else {
      AsyncStorage.setItem("usuario", JSON.stringify(usuario));
      alert("Usuário cadastrado com sucesso!");
      AsyncStorage.setItem("logado", "sim");
      navigation.navigate("Home");
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/backgroundimg.jpg")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Bem-vindo, Cadastre-se abaixo.</Text>

        <View style={styles.inputContainer} >
          <Text style={styles.text}>Nome</Text>
          <TextInput
            style={styles.input}
            onChangeText={(value) => setNome(value)}
            value={nome}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.text}>Email</Text>
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={email}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.text}>Senha</Text>
          <TextInput
            style={styles.input}
            onChangeText={setSenha}
            value={senha}
            secureTextEntry={true}

          />
        </View>

        <TouchableOpacity onPress={cadastrar} style={styles.btn}>
          <Text style={styles.btnText}>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Login")} style={styles.link}>
          <Text style={styles.linkText}>Já possui uma conta? Faça o login</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 100,
    padding: 20,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  title: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
    width: "100%",
  },
  text: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "500",
    marginBottom: 5,
    textAlign: "left",
  },
  input: {
    borderWidth: 1,
    color: "#fff",
    width: "100%",
    borderColor: "#fff",
    borderRadius: 10,
    padding: 5,
  },
  btn: {
    backgroundColor: "#fff",
    width: "80%",
    height: 50,
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  btnText: {
    color: "#bf83cf",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "400",
  },
  link: {
    marginBottom: 20,
  },
  linkText: {
    color: "#c35edf",
    fontSize: 16,
  },
});
