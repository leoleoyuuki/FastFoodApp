import React,{createContext} from "react";
import dadosUsuario from "../dados/dadosUsuario";

const UsuarioContext = createContext({});

export const UsuarioProvider = props=>{
    
    return(
        <UsuarioContext.Provider value={{
            state: {dadosUsuario}
            
        }}>
        {props.children}
        </UsuarioContext.Provider>

    )
}

export default UsuarioContext