import styled from 'styled-components';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../../contexts/login.context.jsx';

function MenuBar() {
  const [activeMenuName, setActiveMenu] = useState('전체 게시글');
  const navigate = useNavigate();
  const { userData } = useUser();
  const { userId : paramUserId} = useParams();

  useEffect(() => {
    navigate(menuMap.get(activeMenuName));
  }, [activeMenuName]);

  const onClickHandler = (path, menuName) => {
    setActiveMenu(menuName);
  };

  const menuMap = useMemo(() => {
    const isVisit = paramUserId === userData.userId;

    const commonEntries = {
      '내 팔로잉 리스트': `/${userData.userId}/following`,
      '블로그 목록': `/${userData.userId}/blogs`,
    };

    const visitEntries = {
      '전체 게시글': `/${userData.userId}/blog/posts`,
    };

    const postEntries = isVisit ?  { '게시글 작성': `/${userData.userId}/blog/posts/create` } : {} ;

    return new Map([...Object.entries(visitEntries), ...Object.entries(postEntries), ...Object.entries(commonEntries)]);
  }, [paramUserId, userData.userId]);

  return (
    <MenuWrapper>
      {Array.from(menuMap).map((menu) => {
        const menuName = menu[0];
        const path = menu[1];
        return (
          <Menu
            key={menuName}
            $activeMenuName={activeMenuName}
            $menuName={menuName}
            onClick={() => onClickHandler(path, menuName)}
          >
            <MenuName>{menuName}</MenuName>
          </Menu>
        );
      })}
    </MenuWrapper>
  );
}

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
  width: 78px;
  height: 30px;
  left: 1017px;
  top: 125px;

  background: ${(props) => (props.$activeMenuName === props.$menuName ? `#FF6077` : 'white')};
  border: 1px solid #ff9eaa;
  box-shadow: 5px 3px 3px rgba(0, 0, 0, 0.25);
  border-radius: 0px 10px 10px 0px;

  &:hover {
    cursor: pointer;
    transform: scale(1.05);
    transition: all 0.3s ease;
  }
`;

const MenuName = styled.p`
  /* 전체 게시글 */

  width: 100%;
  height: 10px;
  margin-top: 7px;

  font-family: 'Inter';
  font-style: normal;
  font-weight: 100;
  font-size: 10px;
  line-height: 12px;
  text-align: center;
  color: black;
`;

export default MenuBar;
