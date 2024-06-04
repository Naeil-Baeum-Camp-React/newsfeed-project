import { joinSchema, loginSchema } from './emailSchema';

// 이메일 회원가입
export const joinResolver = (formValues) => {
  const { success, error } = joinSchema.safeParse(formValues);
  return success ? {} : error.flatten().fieldErrors;
};
// 이메일 로그인
export const loginResolver = (formValues) => {
  const { success, error } = loginSchema.safeParse(formValues);
  return success ? {} : error.flatten().fieldErrors;
};
