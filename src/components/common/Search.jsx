import styled from 'styled-components';
import { useState } from 'react';

function Search({search}) {
  const [keyword, seyKeyword] = useState('');

  const onSubmit =(e) => {
    e.preventDefault()
    search(keyword);
  }

  const onReset = () => {
    search("");
  }

  return (
    <form onSubmit={onSubmit}>
      <SearchBar value={keyword} onChange={(e) => seyKeyword(e.target.value)}></SearchBar>
      <SearchButton type={'submit'}> 검색 </SearchButton>
      <SearchButton type={'button'} onClick={onReset}> 초기화 </SearchButton>
    </form>
  );
}

const SearchBar = styled.input`
    box-sizing: border-box;
    width: 205px;
    height: 35px;
    background: #FFFFFF;
    border: 2px solid #E0E0E0;
    border-radius: 20px;

`

const SearchButton = styled.button`
    box-sizing: border-box;
    margin-left: 10px;
    width: 80px;
    height: 35px;
    background: #FFFFFF;
    border: 2px solid #E0E0E0;
    border-radius: 20px;
`

export default Search;