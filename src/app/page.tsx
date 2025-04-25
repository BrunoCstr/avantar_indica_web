"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  signInSchema,
  SignInFormData,
  forgotPasswordSchema,
  ForgotPasswordFormData,
} from "./schemas/validationForm";
import Image from "next/image";
import { ButtonAvtr } from "./../components/myComponents/ButtonAvtr";
import { InputAvtr } from "@/components/myComponents/InputAvtr";

function AuthPage() {
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  console.log(isForgotPassword);

  return (
    <div
      className={`${
        isForgotPassword
          ? `bg-[url('/bg_forgotPassword.png')]`
          : `bg-[url('/bg_login.png')]`
      } bg-cover bg-center w-screen h-screen`}
    >
      <div className="w-full h-full flex justify-center">
        {/* Criei uma div para separar duas partes da tela, a parte aonde tem a foto e a parte roxa do form */}
        <div className="w-4/4"></div>
        <div className="w-[58.5%] flex justify-center items-center">
          <div className="h-screen flex justify-center items-center flex-col">
            <Image
              src="/avantar_seguros_planos_de_saude_branco.png"
              alt="logo"
              width={300}
              height={300}
            />
            <div className="mb-3 mt-4 text-blue text-sm h-5">
              <span>{validationMessage}</span>
            </div>
            {isForgotPassword ? (
              <div>
                <span>Vasco</span>
              </div>
            ) : (
              <>
                <form onSubmit={handleSubmit(() => console.log("enviado"))}>
                  <div className="flex flex-col gap-3">
                    <InputAvtr type="email" placeholder="Login" />
                    <InputAvtr type="password" placeholder="Senha" />
                    <ButtonAvtr type="submit" text="ENTRAR" />
                  </div>
                </form>
                <div className="flex flex-row justify-between w-full mt-2">
                  <div className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      className="cursor-pointer"
                      id="stayConnected"
                    />
                    <label
                      className="font-regular text-xs text-white"
                      htmlFor="stayConnected"
                    >
                      Permanecer conectado
                    </label>
                  </div>
                  <div>
                    <span
                      onClick={() => setIsForgotPassword(true)}
                      className="font-regular text-xs text-white cursor-pointer"
                    >
                      {/* Colocar botão para voltar pra tela de login */}
                      Esqueci minha senha
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
