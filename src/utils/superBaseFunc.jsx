import supabase from '../config/supabase';

// 유저 이미지 url 불러오기
export const getAvartarUrl = (avartatName) => {
  const { data } = supabase.storage.from('avatars').getPublicUrl(avartatName);
  return data;
};

// 유저 이미지 다운
export const downloadAvartar = async (avartatName) => {
  const { data } = await supabase.storage.from('avatars').download(avartatName);
  return data;
};

// 유저 이미지 교체

// 유저 데이터 정보 가져오기
export async function getUserData(id) {
  const { data } = await supabase.from('USERS').select('*').eq('id', id);
  return data;
}

export function blobToFile(theBlob, fileName) {
  // console.log(theBlob instanceof File, theBlob);
  // //A Blob() is almost a File() - it's just missing the two properties below which we will add
  // theBlob.lastModified = new Date().getTime();
  // theBlob.name = fileName;
  // return theBlob;
  try {
    const newFile = new File([theBlob], fileName, { lastModified: new Date().getTime(), type: 'image/png' });
    return newFile;
  } catch (e) {
    console.log(e);
  }
}
