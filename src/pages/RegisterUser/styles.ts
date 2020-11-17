import styled from 'styled-components';

export const Container = styled.div`
  padding: 40px 0px 40px 530px;
  form, input {
    width: 300px;
  }

  .select {
    /* -webkit-appearance: none; */
    /* -moz-appearance: none; */
    /* appearance: none; */
    padding: 12px;

    width: 300px;
    height: 47px;
    border-radius: 8px;
    margin: 12px 0px;
    background: #232129;
    border: none;
    color: #666360;
    font-size: 18px;
    color: #fff;
    font-family: sans-serif !important;

    option {
      color: white;
    }

  }

  .back {
    background: #B0C4DE;
  }

  .title {
    padding-bottom: 12px;
    font-size: 26px;
  }
`;
