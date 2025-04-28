import React from "react";

import { useAuth } from "@/context/Auth";

export function Home(){
    const { isLoading } = useAuth();
    
    if(isLoading) {
        return <p>Carregando... Colocar skeleton</p>
    }

    return (
        <div>
            <p>Home</p>
        </div>
    )
}