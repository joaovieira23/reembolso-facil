import { Form } from '@unform/web';
import React, { useRef, useCallback, useEffect } from 'react';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { Link } from 'react-router-dom';

import { useToast } from '../../hooks/toast';

import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErrors';

import { Container } from './styles';
import api from '../../services/api';

interface ICreateUserProps {
  FullName: string;
  Cpf: string;
  Agency: number;
  Account: string;
  Bank: number;
  Login: string;
  Senha: string;
}

const RegisterUser: React.FC = () => {
  const [selectValue, setSelectValue] = React.useState("1");
  const [selectValueDP, setSelectValueDP] = React.useState("1");
  const [bankValue, setBankValue] = React.useState(0);

  const bank = [
    {
      desc_bank: "Banco do Brasil S.A.",
      id: 1
    },
    {
      desc_bank: "SANTANDER",
      id: 33
    },
    {
      desc_bank: "Xp Investimentos S.A",
      id: 102
    },
    {
      desc_bank: "Caixa Econômica Federal",
      id: 104
    },
    {
      desc_bank: "Pernambucanas Financ S.A",
      id: 174
    },
    {
      desc_bank: "Banco Bradesco S.A.",
      id: 237
    },
    {
      desc_bank: "Banco ABC Brasil S.A.\t",
      id: 246
    },
    {
      desc_bank: "Banco C6 S.A – C6 Bank",
      id: 336
    },
    {
      desc_bank: "BANCO ITAU",
      id: 341
    },
    {
      desc_bank: "Banco Cooperativo Sicredi S.A.",
      id: 748
    }
  ]

  const Departament = [
    {
      id: 1,
      description: "TI",
    },
    {
      id: 2,
      description: "FINANCEIRO",
    },
    {
      id: 3,
      description: "RH"
    }
  ]

  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: ICreateUserProps) => {
      try {
        formRef.current?.setErrors({});

        const { FullName, Cpf, Agency, Account, Bank, Login, Senha } = data;
        const Id = localStorage.getItem('@Reembolso:id')
        await api.post('https://webapireembolsofacil.herokuapp.com/WebApiReembolsoFacil/User/Create', {
          FullName,
          Cpf,
          Agency,
          flaglevel: 1,
          Account,
          Departament: selectValueDP,
          Bank: selectValue,
          Approver: 1,
          Login,
          Senha,
        })

        if (Senha === "") {
          throw new Error;
        }
        else {
          addToast({
            type: 'success',
            title: 'Usuário criado com sucesso',
            description: 'O usuário foi cadastrado'
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
      {console.log(bank)}
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1 className="title">Cadastrar Usuário</h1>
        <Input name="FullName" placeholder="Nome completo" />
        <Input name="Cpf" placeholder="CPF" />
        <Input name="Agency" placeholder="Agência" />
        <Input name="Account" placeholder="Conta" />
        <select className="select" name="type" onChange={e => setSelectValueDP(e.target.value)}>
          {Departament.map((item, index) => (
            <option key={item.id} value={item.id}>{item.description}</option>
          ))}
        </select>
        <select className="select" name="type" onChange={e => setSelectValue(e.target.value)}>
          {bank.map((item, index) => (
            <option key={item.id} value={item.id}>{item.desc_bank}</option>
          ))}
        </select>
        <Input name="Login" placeholder="Login" />
        <Input type="password" name="Senha" placeholder="Senha" />
        <Button type="submit">Cadastrar</Button>
        <Link to="dashboard">
          <Button className="back">Voltar</Button>
        </Link>
      </Form>
    </Container>
  );
};

export default RegisterUser;
