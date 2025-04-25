"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  signInSchema,
  SignInFormData,
  forgotPasswordSchema,
  ForgotPasswordFormData,
} from "./schemas/validationForm";
import Image from "next/image";
import {ButtonAvtr} from './../components/myComponents/ButtonAvtr'

function AuthPage() {
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

  return (
    <div className="bg-[url('/bg_login.png')] bg-cover bg-center w-screen h-screen">
      <div className="w-full h-full flex justify-end">
        <div className="w-[37%] h-screen flex justify-center items-center flex-col -mt-20">
          <Image
            src="/avantar_voce_a_frente_branco.png"
            alt="logo"
            width={300}
            height={300}
          />
          <div className="mb-3 text-blue text-sm"><span>Mensagem de Validação aqui</span></div>
          <form onSubmit={handleSubmit(() => console.log("enviado"))}>
            <ButtonAvtr
            type="submit"
            text='ENTRAR'
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;