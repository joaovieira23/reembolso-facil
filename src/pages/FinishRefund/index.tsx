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

const FinishRefund: React.FC = () => {
  const [pedingRefunds, setPedingRefunds] = useState<pedingRefundsProps[]>([]);
  const [finishRefund, setFinishRefund] = useState();
  const { addToast } = useToast();

  const handleFinish = useCallback((id) => {
    api.delete(`https://webapireembolsofacil.herokuapp.com/WebApiReembolsoFacil/Refund/Delete/${id}`).then(response => {
      console.log(response.data);
    });

    api.put(`https://webapireembolsofacil.herokuapp.com/WebApiReembolsoFacil/Refund/Finish/${id}`).then(response => {
      setFinishRefund(response.data);
    });


    addToast({
      type: 'success',
      title: 'Reembolso finalizado',
      description: 'O reembolso foi finalizado com sucesso'
    });

  }, [])

  const id = localStorage.getItem('@Reembolso:id');
  useEffect(() => {
    api.get(`https://webapireembolsofacil.herokuapp.com/WebApiReembolsoFacil/Refund/ListApprover/${id}`).then(response => {
      setPedingRefunds(response.data);
    })
  }, [finishRefund]);

  return (
    <Container>
      <h1>Finalizar reembolso</h1>
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
              <Button onClick={() => handleFinish(pedingRefund.id)} className="approved" name="approved">Finalizar</Button>
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

export default FinishRefund;
