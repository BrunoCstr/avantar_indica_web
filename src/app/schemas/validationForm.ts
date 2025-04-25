import { z } from 'zod';

// Validação do Formulário de Login
export const signInSchema = z.object({
  email: z.string().email("Formato de e-mail inválido!"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres!")
})

export type SignInFormData = z.infer<typeof signInSchema>;


// Validação do Formulário de Esqueci minha senha
export const forgotPasswordSchema = z.object({
  email: z.string().email("Formato de e-mail inválido!"),
})

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
