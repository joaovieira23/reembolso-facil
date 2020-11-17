import { Form } from '@unform/web';
import React, { useRef, useCallback } from 'react';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { Link } from 'react-router-dom';

import { useToast } from '../../hooks/toast';

import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErrors';

import { Container } from './styles';
import api from '../../services/api';

interface ICreateRefundProps {
  justification: string;
  type: string;
  value: number;
  cnpj: string;
  address: string;
  local: string;
}

const RequestRefund: React.FC = () => {
  const [selectValue, setSelectValue] = React.useState("1");
  const list = [
    { id: 1, name: 'Alimentação' },
    { id: 2, name: 'Transporte' },
    { id: 3, name: 'Outros' }
  ];

  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: ICreateRefundProps) => {
      try {
        formRef.current?.setErrors({});

        const { address, cnpj, justification, type, value, local } = data;
        const Id = localStorage.getItem('@Reembolso:id')
        const response = api.post('https://webapireembolsofacil.herokuapp.com/WebApiReembolsoFacil/Refund/Create', {
          type_refund: selectValue,
          users: Id,
          value,
          location: address,
          description: local,
          status: 1,
          justification,
          flowPhase: "1",
          approver: 1,
          cnpj
        })

        if (address === "") {
          throw new Error;
        }
        else {
          addToast({
            type: 'success',
            title: 'Reembolso criado com sucesso',
            description: 'O reembolso foi cadastrado'
          });
        }


      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na criação do reembolso',
          description:
            'Verifique os dados informados.',
        });
      }
    },
    [addToast],
  );

  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1 className="title">Cadastrar Reembolso</h1>
        <Input name="justification" placeholder="Justificativa" />
        <select className="select" name="type" onChange={e => setSelectValue(e.target.value)}>
          {list.map((item, index) => (
            <option key={item.id} value={item.id}>{item.name}</option>
          ))}
        </select>
        <Input name="value" placeholder="Valor" />
        <Input name="cnpj" placeholder="CNPJ" />
        <Input name="address" placeholder="Endereço" />
        <Input name="local" placeholder="Local" />
        <Button type="submit">Cadastrar</Button>
        <Link to="dashboard">
          <Button className="back">Voltar</Button>
        </Link>
      </Form>
    </Container>
  );
};

export default RequestRefund;
