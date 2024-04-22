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
import Header from "./Header";
import { useNavigation } from "@react-navigation/native";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const navigation = useNavigation();

    useEffect(() => {
    const logado = AsyncStorage.getItem("logado")
    console.log(logado)
    if (!logado) {
      alert("Faça o login para acessar o App!")
    }else{
        navigation.navigate("Home")
    }
    },[])


  const login = async () => {
    const dadosUsuario = await AsyncStorage.getItem("usuario");
    const usuario = JSON.parse(dadosUsuario);

    if (usuario && usuario.email === email && usuario.senha === senha) {
      alert("Login realizado com sucesso!");
      AsyncStorage.setItem("logado", "sim");
      navigation.navigate("Home");
    } else {
      alert("Email ou senha incorretos. Por favor, tente novamente.");
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/backgroundimg.jpg")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Bem-vindo, faça o login abaixo.</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.text}>Email</Text>
          <TextInput
            style={styles.input}
            onChangeText={(value) => setEmail(value)}
            value={email}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.text}>Senha</Text>
          <TextInput
            style={styles.input}
            onChangeText={(value) => setSenha(value)}
            value={senha}
            secureTextEntry={true}
          />
        </View>

        <TouchableOpacity onPress={login} style={styles.btn}>
          <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Cadastro")} style={styles.link}>
          <Text style={styles.linkText}>Ainda não tem uma conta? Cadastre-se</Text>
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
