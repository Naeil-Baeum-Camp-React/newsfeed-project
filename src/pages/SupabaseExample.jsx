import supabase from '../config/supabase.js';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

let number = 0;

function SupabaseExample() {

  const [update, setUpdate] = useState('');
  const [deleteId, setDeleteId] = useState('');

  const hadle = (type) => {
    switch (type) {
      case 'createEx':
        createEx();
        break;
      case 'updateEx':
        updateEx();
        break;
      case 'selectEx':
        selectEx();
        break;
      case 'deleteEx':
        deleteEx();
        break;
    }
  };

  const selectEx = async () => {
    const { data, error } = await supabase.from("NACAMP_SAMPLE").select("*");
    if (error) {
      console.log("error => ", error);
    } else {
      console.log("data => ", data);
    }
  };


  const createEx = async () => {
    const { data, error } = await supabase
      .from('NACAMP_SAMPLE')
      .insert([
        {
          id: uuidv4(),
          name: 't1',
          password: 't2',
        },
      ])
      .select();


    if (error) {
      console.log('error => ', error);
    } else {
      alert('데이터가 정상적으로 입력됐습니다.');
      console.log('data => ', data);
    }
  };


  const updateEx = async () => {
    const { error } = await supabase
      .from("NACAMP_SAMPLE")
      .update({
        name : `업데이트 ${number++} 번째`
      })
      .eq("id", update);

    if (error) {
      console.log("error => ", error);
    }
  };


  const deleteEx = async () => {
    const { error } = await supabase
      .from("NACAMP_SAMPLE")
      .delete()
      .eq("id", deleteId);

    if (error) {
      console.log("error => ", error);
    }
  };


  return (
    <div>
      <button onClick={() => hadle("selectEx")}>조회</button>
      <button onClick={() => hadle("createEx")}>추가</button>
      <div style={{ display: 'flex' }}>
        <button onClick={() => hadle("updateEx")}>업데이트</button>
        <input value={update} onChange={(e) => setUpdate(e.target.value)} />
      </div>
      <div style={{ display: 'flex' }}>
        <button onClick={() => hadle("deleteEx")}>삭제</button>
        <input value={deleteId} onChange={(e) => setDeleteId(e.target.value)} />
      </div>
    </div>
  );
}

export default SupabaseExample;