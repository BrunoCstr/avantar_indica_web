import { z } from 'zod';

// Validação do Formulário de Login
export const signInSchema = z.object({
  email: z.string().email("Formato de e-mail inválido!"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres!"),
})

export type SignInFormData = z.infer<typeof signInSchema>;


// Validação do Formulário de Esqueci minha senha
export const forgotPasswordSchema = z.object({
  emailForgot: z.string().email("Formato de e-mail inválido!"),
})

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;


// Validação de edição do usuário
export const editUserSchema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres!"),
  email: z.string().email("Formato de e-mail inválido!"),
  phone: z.string().min(10, "O telefone deve ter pelo menos 10 caracteres!"),
  pixKey: z.string().min(5, "A chave pix deve ter pelo menos 5 caracteres!"),
  rule: z.string().min(1, "Selecione uma regra!"),
})
export type EditUserFormData = z.infer<typeof editUserSchema>;


// Validação da edição de indicação
export const editIndicationSchema = z.object({
  product: z.string().min(3, "O produto deve ter pelo menos 3 caracteres!"),
  phone: z.string().min(10, "O telefone deve ter pelo menos 10 caracteres!"),
  status: z.string().min(5, "O status deve ter pelo menos 5 caracteres!"),
  sgcorID: z.string().min(5, "O ID de produção deve ter pelo menos 5 caracteres!").optional(),
})
export type EditIndicationFormData = z.infer<typeof editIndicationSchema>;
