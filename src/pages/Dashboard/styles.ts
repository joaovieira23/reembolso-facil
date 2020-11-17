import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  font-family: Poppins;
  margin-left: 40px;

  a { color: inherit; }

  a:hover {
    color: #548;
    text-decoration: none;
  }

  .title {
  padding-top: 95px;
  font-style: normal;
  font-weight: bold;
  font-size: 36px;
  line-height: 140%;
  color: #ffffff;
}

.item {
  position: absolute;
  right: 10px;
  margin-top: 35px;
  list-style-type: none;
}

.logout {
  background: #77dd77;
  height: 56px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  color: #312e38;
  width: 100%;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.2, '#77dd77')};
  }
}

.subtitle {
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 30px;
  padding-bottom: 44.47px;
  color: #ffffff;
}

.list-item {
  list-style-type: none;
  margin: 0;
  padding: 0;
}


.nav-link {
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 140%;
  text-transform: uppercase;
  color: #ffffff;
}

.list-item {
  padding: 50px 20px 0 25px;
}

.logo img {
  width: 80px;
  margin: 10px 0 0 0px;
}

  h1 {
    font-style: normal;
    font-weight: bold;
    font-size: 36px;
    line-height: 140%;
    color: #ffffff;
  }

  .infoDashboard {
    padding-left: 370px;

    .subtitleDash {
      padding-bottom: 40px;
      font-size: 20px;
    }

    h2 {
      font-size: 22px;
      padding-bottom: 12px;
      padding-top: 12px;
    }
  }
`;

export const Header = styled.div`
  height: 150px;

  a {
    width: 250px;
    margin-top: 40px;
    text-decoration: none;

    margin-left: 170px;
    border: none;

    font-size: 20px;
    font-family: Poppins;
    font-weight: bold;
    background: #D3D3D3;
    border-radius: 8px;

    padding: 17px;

    &:hover {
      background: ${shade(0.2, '#77dd77')};
    }
  }
`;
