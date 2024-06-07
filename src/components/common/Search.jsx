import { useState } from 'react';
import styled from 'styled-components';

function Search({ search }) {
  const [keyword, seyKeyword] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    search(keyword);
  };

  const onReset = () => {
    search('');
  };

  return (
    <form onSubmit={onSubmit}>
      <SearchBar value={keyword} onChange={(e) => seyKeyword(e.target.value)}></SearchBar>
      <SearchReal type={'submit'}>검색</SearchReal>
      <SearchButton type={'button'} onClick={onReset}>
        {' '}
        초기화{' '}
      </SearchButton>
      <BottonService>
        <BottomButton>블라블라 검색</BottomButton>
        <BottomButton>Today is sunny day</BottomButton>
      </BottonService>
    </form>
  );
}

const SearchBar = styled.input`
  box-sizing: border-box;
  padding: 0 20px;
  width: 400px;
  height: 35px;
  background: #ffffff;
  border: 2px solid #e0e0e0;
  border-radius: 20px;

  &:focus {
    border-color: #ffb8c3; /* Change this to the desired color */
    outline: none;
  }
`;

const SearchButton = styled.button`
  font-weight: 600;
  box-sizing: border-box;
  margin-left: 10px;
  width: 80px;
  height: 35px;
  background: #ffffff;
  border: 2px solid #ffb8c3;
  border-radius: 20px;

  &:hover {
    cursor: pointer;
    transform: scale(1.05);
    transition: all 0.3s ease;
    color: #ff6077;
    border: 2px solid #ff6077;
  }
`;
const SearchReal = styled(SearchButton)`
  background-color: #ffb8c3;
  &:hover {
    background-color: #ff6077;
    color: white;
  }
`;

const BottonService = styled.div`
  margin-left: 65px;
  margin-top: 10px;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  display: flex;
  gap: 10px;
`;
const BottomButton = styled.div`
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f8f9fa;
  border: 1px solid #f8f9fa;
  border-radius: 4px;
  color: #3c4043;
  padding: 0 16px;
  line-height: 27px;
  height: 36px;
  min-width: 54px;
  text-align: center;
  cursor: pointer;
  user-select: none;
  &:hover {
    border: 1px solid #bcbcbc;
  }
`;
export default Search;
