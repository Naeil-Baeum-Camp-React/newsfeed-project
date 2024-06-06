import supabase from '../config/supabase';

// 스토리지
// 유저 이미지 url 불러오기
export const getAvartarUrl = (avartarName) => {
  const { data } = supabase.storage.from('avatars').getPublicUrl(avartarName);
  return data.publicUrl;
};
// 유저 이미지 파일 업로드
export const uploadAvartar = async (name, path) => {
  const uploadUserResult = await supabase.storage.from('avatars').upload(name, path);
  console.log(uploadUserResult);
  return uploadUserResult;
};
// 유저 이미지 파일 수정
export const updateAvartar = async (name, path) => {
  console.log(name, path);
  const updateUserResult = await supabase.storage.from('avatars').update(name, path);
  console.log(updateUserResult);
  return updateUserResult;
};

// 데이터베이스
// 유저 데이터 정보 가져오기
export async function getUserData(id) {
  const { data } = await supabase.from('USERS').select('*').eq('id', id);
  return data;
}
// 유저 데이터 저장
export async function uploadUserDate({ profile_image, blog_name, nickname }) {
  const { data, error } = await supabase
    .from('USERS')
    .insert({
      profile_image,
      blog_name,
      nickname,
    })
    .select();
  return { data, error };
}
// 유저 데이터 업데이트
export async function updateUserDate({ profile_image, blog_name, nickname, id }) {
  const { error } = await supabase.from('USERS').update({ profile_image, blog_name, nickname }).eq('id', id);

  return error;
}

export function blobToFile(theBlob, fileName) {
  try {
    const newFile = new File([theBlob], fileName, { lastModified: new Date().getTime(), type: 'image/png' });
    return newFile;
  } catch (e) {
    console.log(e);
  }
}
