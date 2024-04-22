import React,{createContext} from "react";
import dadosComida from "../dados/dadosComida";

const ComidaContext = createContext({});

export const ComidaProvider = props=>{
    
    return(
        <ComidaContext.Provider value={{
            state: {dadosComida}
            
        }}>
        {props.children}
        </ComidaContext.Provider>

    )
}

export default ComidaContext