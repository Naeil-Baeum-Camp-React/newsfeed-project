import validator from 'validator';
import { z } from 'zod';

const passwordPattern = new RegExp(
  /([a-zA-Z]+[0-9]+)|([a-zA-Z]+[?.,;:|*~`!^-_+<>@#$%&='"]+)|([0-9]+[?.,;:|*~`!^-_+<>@#$%&='"]+)/g
);

export const joinSmsSchema = z
  .object({
    phoneNumber: z.string(),
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
  .refine((data) => validator.isMobilePhone(data.phoneNumber, 'ko-KR'), {
    path: ['phoneNumber'],
    message: '핸드폰 번호를 확인해주세요.',
  })
  .refine((data) => data.password === data.password2, {
    path: ['password2'],
    message: '비밀번호가 같지 않습니다.',
  });

export const loginSmsSchema = z
  .object({
    phoneNumber: z.string(),
    password: z
      .string()
      .min(6, { message: '비밀번호를 6자 이상 입력해주세요.' })
      .regex(passwordPattern, {
        message: '영문, 숫자, 특수문자 중 두가지 이상 포함해야 합니다.',
      })
      .max(20, { message: '비밀번호는 20자 이하로 입력해주세요.' }),
  })
  .refine((data) => validator.isMobilePhone(data.phoneNumber, 'ko-KR'), {
    path: ['phoneNumber'],
    message: '핸드폰 번호를 확인해주세요.',
  });
