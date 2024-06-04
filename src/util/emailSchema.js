import { z } from 'zod';

const passwordPattern = new RegExp(
  /([a-zA-Z]+[0-9]+)|([a-zA-Z]+[?.,;:|*~`!^-_+<>@#$%&='"]+)|([0-9]+[?.,;:|*~`!^-_+<>@#$%&='"]+)/g
);
// 이메일 회원가입
export const joinSchema = z
  .object({
    email: z.string().email({ message: '이메일 형식을 확인해주세요.' }),
    password: z
      .string()
      .min(6, { message: '비밀번호를 6자 이상 입력해주세요.' })
      .regex(passwordPattern, {
        message: '영문, 숫자, 특수문자 중 두가지 이상 포함해야 합니다.',
      })
      .max(20, { message: '비밀번호는 20자 이하로 입력해주세요.' }),
    password2: z
      .string()
      .min(6, { message: '비밀번호를 6자 이상 입력해주세요.' })
      .max(20, { message: '비밀번호는 20자 이하로 입력해주세요.' }),
  })
  .refine((data) => data.password === data.password2, {
    path: ['password2'],
    message: '비밀번호가 같지 않습니다.',
  });
export const loginSchema = z.object({
  email: z.string().email({ message: '이메일 형식을 확인해주세요.' }),
  password: z
    .string()
    .min(6, { message: '비밀번호를 6자 이상 입력해주세요.' })
    .regex(passwordPattern, {
      message: '영문, 숫자, 특수문자 중 두가지 이상 포함해야 합니다.',
    })
    .max(20, { message: '비밀번호는 20자 이하로 입력해주세요.' }),
});
