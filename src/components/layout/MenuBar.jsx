import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function MenuBar() {
  const [activeMenuName, setActiveMenu] = useState(localStorage.getItem('activeMenuName') ? localStorage.getItem('activeMenuName') : '전체게시글');
  const navigate = useNavigate();

  const onClickHandler = (path, menuName) => {
    localStorage.setItem('activeMenuName', menuName);
    setActiveMenu(menuName);
    navigate(path);
  };

  return (
    <MenuWrapper>
      {
        Array.from(MenuMap).map((menuMap) => {
          const menuName = menuMap[0];
          const path = menuMap[1];
          return (
            <Menu key={menuName}
                  $activeMenuName={activeMenuName}
                  $menuName={menuName}
                  onClick={() => onClickHandler(path, menuName)}>
              <MenuName>
                {menuName}
              </MenuName>
            </Menu>
          );
        })
      }
    </MenuWrapper>
  );
}

const MenuMap = new Map(
  Object.entries(
    {
      // 메뉴명 : path
      '전체게시글': '/blog/userId',
      '게시글작성': '/',
      '나의이웃': '/',
      '모든블라블라': '/',
      '슈파베이스 테스트': '/supabase',
    },
  ),
);

const MenuWrapper = styled.div`
    position: absolute;
    width: 71px;
    left: 1017px;
    top: 125px;
    height: 100%;
`;

const Menu = styled.div`
    box-sizing: border-box;

    margin-top: 5px;
    width: 71px;
    height: 30px;
    left: 1017px;
    top: 125px;

    background: ${props => props.$activeMenuName === props.$menuName ? `#FF6077` : 'white'};
    border: 1px solid #FF9EAA;
    box-shadow: 5px 3px 3px rgba(0, 0, 0, 0.25);
    border-radius: 0px 10px 10px 0px;

    &:hover {
        cursor : pointer;
        transform: scale(1.05);
        transition: all 0.3s ease;
    }
`;

const MenuName = styled.p`
    /* 전체 게시글 */
    position: absolute;
    width: 100%;
    height: 10px;

    left: 10px;


    font-family: 'Inter';
    font-style: normal;
    font-weight: 100;
    font-size: 10px;
    line-height: 12px;

    color: black;
`;

export default MenuBar;
