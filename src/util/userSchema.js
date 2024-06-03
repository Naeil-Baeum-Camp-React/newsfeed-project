import { z } from 'zod';

export const userSchema = z
  .object({
    email: z.string().email({ message: '이메일 형식을 확인해주세요.' }),
    password: z
      .string()
      .length(6, { message: '비밀번호를 6자 이상 입력해주세요.' })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}|;':"<>,./?])[A-Za-z0-9!@#$%^&*()_+{}|;':"<>,./?]$/,
        {
          message: '영문, 숫자, 특수문자 중 두가지 이상 포함해야 합니다.',
        }
      )
      .max(20, { message: '비밀번호는 20자 이하로 입력해주세요.' }),
    password2: z
      .string()
      .length(6, { message: '비밀번호를 6자 이상 입력해주세요.' })
      .max(20, { message: '비밀번호는 20자 이하로 입력해주세요.' }),
  })
  .refine((data) => data.password === data.password2, {
    message: '비밀번호가 일치하지 않습니다.',
  });

export const userResolver = (formValues) => {
  const { success, error } = userSchema.safeParse(formValues);
  return success ? {} : error.flatten().fieldErrors;
};
