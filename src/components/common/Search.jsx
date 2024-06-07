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
      <SearchButton type={'submit'}> 검색 </SearchButton>
      <SearchButton type={'button'} onClick={onReset}>
        {' '}
        초기화{' '}
      </SearchButton>
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
    border-color: #ff6077; /* Change this to the desired color */
    outline: none;
  }
`;

const SearchButton = styled.button`
  box-sizing: border-box;
  margin-left: 10px;
  width: 80px;
  height: 35px;
  background: #ffffff;
  border: 2px solid #e0e0e0;
  border-radius: 20px;

  &:hover {
    cursor: pointer;
    transform: scale(1.05);
    transition: all 0.3s ease;
    border-color: royalblue;
  }
`;

export default Search;
