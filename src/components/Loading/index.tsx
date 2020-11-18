import React from 'react';
import ReactLoading from 'react-loading';

import { Container } from './styles';

const Spin: React.FC = () => {
  return (
    <Container>
      <ReactLoading type="cubes" color="#FFF" height={567} width={275} />
    </Container>
  );
}

export default Spin;
