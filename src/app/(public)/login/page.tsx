"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  signInSchema,
  SignInFormData,
  forgotPasswordSchema,
  ForgotPasswordFormData,
} from "../../schemas/validationForm";
import Image from "next/image";
import { ButtonAvtr } from "@/components/myComponents/ButtonAvtr";
import { InputAvtr } from "@/components/myComponents/InputAvtr";
import { BackButton } from "@/components/myComponents/BackButton";
import { useAuth } from "@/context/Auth";

export default function AuthPage() {
  const { signIn, forgotPassword } = useAuth();
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");
  const [stayConnected, setStayConncted] = useState(false);

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

  const {
    register: registerForgotPassword,
    handleSubmit: handleForgotPasswordSubmit,
    formState: { errors: errorsForgotPassword },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      emailForgot: "",
    },
  });

  async function onSubmitSignIn(data: SignInFormData) {
    const signInUser = await signIn(data.email, data.password, stayConnected);

    if (signInUser) {
      setValidationMessage(signInUser);
    }
  }

  async function onSubmitForgetPass(data: ForgotPasswordFormData) {
    const forgotPass = await forgotPassword(data.emailForgot);

    if (forgotPass) {
      setValidationMessage(forgotPass);
    }
  }

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
            {isForgotPassword ? (
              <div>
                <div className="flex flex-row justify-between items-center gap-4 mt-2 mb-2">
                  <div className="">
                    <BackButton onClick={() => setIsForgotPassword(false)} />
                  </div>
                  <div className="mb-3 mt-4 text-blue text-sm h-5">
                    <span>{validationMessage}</span>
                  </div>
                  <div>
                    <span></span>
                  </div>
                </div>
                <form onSubmit={handleForgotPasswordSubmit(onSubmitForgetPass)}>
                  <div className="flex flex-col gap-3">
                    <InputAvtr
                      type="email"
                      placeholder="E-mail"
                      errorMessage={errorsForgotPassword.emailForgot?.message}
                      {...registerForgotPassword("emailForgot")}
                    />
                    <ButtonAvtr type="submit" text="ENVIAR" />
                  </div>
                </form>
              </div>
            ) : (
              <>
                <div className="mb-3 mt-4 text-blue text-sm h-5">
                  <span>{validationMessage}</span>
                </div>
                <form onSubmit={handleSubmit(onSubmitSignIn)}>
                  <div className="flex flex-col gap-3">
                    <InputAvtr
                      type="email"
                      errorMessage={errors.email?.message}
                      {...register("email")}
                      placeholder="Login"
                    />
                    <InputAvtr
                      type="password"
                      errorMessage={errors.password?.message}
                      {...register("password")}
                      placeholder="Senha"
                    />
                    <ButtonAvtr type="submit" text="ENTRAR" />
                  </div>
                </form>
                <div className="flex flex-row justify-between w-75 mt-2">
                  <div className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      className="cursor-pointer"
                      id="stayConnected"
                      onChange={(e) => setStayConncted(e.target.checked)}
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
