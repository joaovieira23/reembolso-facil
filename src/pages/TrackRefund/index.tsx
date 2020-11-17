import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import Button from '../../components/Button';

import { Container } from './styles';

interface pedingRefundsProps {
  id: number;
  description: string;
  location: string;
  justification: string;
  cnpj: string;
  value: number;
  status: number;
}

const TrackRefund: React.FC = () => {
  const [pedingRefunds, setPedingRefunds] = useState<pedingRefundsProps[]>([]);

  const handleApproved = useCallback((id) => {
    console.log(id);
    api.put(`https://webapireembolsofacil.herokuapp.com/WebApiReembolsoFacil/Refund/Approve/${id}`).then(response => {
      console.log(response);
    });

    api.delete(`https://webapireembolsofacil.herokuapp.com/WebApiReembolsoFacil/Refund/Delete/${id}`).then(response => {
      console.log(response);
    })
  }, [])

  const handleDeny = useCallback((id) => {
    api.delete(`https://webapireembolsofacil.herokuapp.com/WebApiReembolsoFacil/Refund/Delete/${id}`).then(response => {
      console.log(response);
    })
  }, [])

  const id = localStorage.getItem('@Reembolso:id');
  useEffect(() => {
    api.get(`https://webapireembolsofacil.herokuapp.com/WebApiReembolsoFacil/Refund/List/${id}`).then(response => {
      setPedingRefunds(response.data);
    })
  }, []);

  return (
    <Container>
      <h1 className="titleRefund">Reembolsos Pendetes</h1>
      { pedingRefunds && (
        pedingRefunds.map(pedingRefund => (
          <div>
            <div className="pedingrefund">
              <p><strong>CNPJ:</strong> {pedingRefund.cnpj}</p>
              <p><strong>Localização:</strong> {pedingRefund.location}</p>
              <p><strong>Descrição:</strong> {pedingRefund.description}</p>
              <p><strong>Justificativa:</strong> {pedingRefund.justification}</p>
              <p><strong>Valor:</strong> {pedingRefund.value}</p>
            </div>
          </div>
        ))
      )}
      <Link to="dashboard">
        <Button className="back" name="back">Voltar</Button>
      </Link>
    </Container>
  );
}

export default TrackRefund;
