"use client";

import React from "react";

import { useAuth } from "@/context/Auth";

export default function Dashboard(){
    const { isLoading } = useAuth();
    
    if(isLoading) {
        return <p>Carregando... Colocar skeleton</p>
    }

    return (
        <div>
            <p>Dashboard Home</p>
        </div>
    )
}