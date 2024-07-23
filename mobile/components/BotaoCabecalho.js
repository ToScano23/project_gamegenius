import React from "react"
import { Ionicons } from "@expo/vector-icons"
import { HeaderButton } from "react-navigation-header-buttons"

const BotaoCabecalho=(props)=>{
    return(
        <HeaderButton
            {...props}
            IconComponent={Ionicons}
            iconSize={23}
            color={'black'}
        />
    )
}
export default BotaoCabecalho