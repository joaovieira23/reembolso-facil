import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import Button from '../../components/Button';

import { useToast } from '../../hooks/toast';

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

const ApproveRefund: React.FC = () => {
  const [pedingRefunds, setPedingRefunds] = useState<pedingRefundsProps[]>([]);
  const [deleteRefund, setDeleteRefund] = useState(false);
  const { addToast } = useToast();

  const handleApproved = useCallback((id) => {
    console.log(id);
    api.put(`https://webapireembolsofacil.herokuapp.com/WebApiReembolsoFacil/Refund/Approve/${id}`).then(response => {
      console.log(response);
    });

    api.delete(`https://webapireembolsofacil.herokuapp.com/WebApiReembolsoFacil/Refund/Delete/${id}`).then(response => {
      console.log(response);
    })

    addToast({
      type: 'success',
      title: 'Reembolso aprovado',
      description: 'O reembolso foi aprovado com sucesso'
    });

  }, [])

  const handleDeny = useCallback((id) => {
    api.delete(`https://webapireembolsofacil.herokuapp.com/WebApiReembolsoFacil/Refund/Delete/${id}`).then(response => {
      setDeleteRefund(true);
    })
  }, [deleteRefund])

  const id = localStorage.getItem('@Reembolso:id');
  useEffect(() => {
    api.get(`https://webapireembolsofacil.herokuapp.com/WebApiReembolsoFacil/Refund/ListApprover/${id}`).then(response => {
      setPedingRefunds(response.data);
    })
  }, [pedingRefunds]);

  return (
    <Container>
      <h1>Reembolsos pendentes</h1>
      { pedingRefunds && (
        pedingRefunds.map(pedingRefund => (
          <div>
            <div className="pedingrefund">
              <p>CNPJ: {pedingRefund.cnpj}</p>
              <p>Localização: {pedingRefund.location}</p>
              <p>Descrição: {pedingRefund.description}</p>
              <p>Justificativa: {pedingRefund.justification}</p>
              <p>Valor: {pedingRefund.value}</p>
            </div>
            <div className="buttons">
              <Button onClick={() => handleApproved(pedingRefund.id)} className="approved" name="approved">Aprovar</Button>
              <Button onClick={() => handleDeny(pedingRefund.id)} className="deny" name="deny">Negar</Button>
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

export default ApproveRefund;
