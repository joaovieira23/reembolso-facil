import React, { useEffect, useState, useCallback } from 'react';

import { Link } from 'react-router-dom';
import api from '../../services/api';
import { Container, Header } from './styles';
import logoImg from '../../assets/reembolso.svg';
import { useAuth } from '../../hooks/auth';
import Loading from '../../components/Loading';

interface IUserProps {
  Id: number;
  FullName: string;
  Cpf: string;
  Agency: number;
  Account: string;
  flaglevel: number;
}

const Dashboard: React.FC = () => {
  const [users, setUsers] = useState("");
  const [approved, setApproved] = useState(false);
  const [finishRefund, setFinishRefund] = useState(false);
  const [registerUser, setRegisterUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signOut } = useAuth();

  const handleLogout = useCallback(() => {
    signOut();
  }, [])

  useEffect(() => {
    async function loadInfoUser(): Promise<IUserProps | void> {
      const Login = localStorage.getItem('@Reembolso:login');
      const Password = localStorage.getItem('@Reembolso:pass');

      api.get(`http://webapireembolsofacil.herokuapp.com/WebApiReembolsoFacil/User/Authenticate/${Login}/${Password}`)
        .then(response => {

          const { flaglevel } = response.data;

          if (flaglevel === 2 || flaglevel === 6 || flaglevel === 4) {
            setApproved(true);
          }

          if (flaglevel === 2 || flaglevel === 6) {
            setFinishRefund(true);
          }

          if (flaglevel === 3 || flaglevel === 4) {
            setRegisterUser(true);
          }
        })
    }

    loadInfoUser();
    setLoading(true);
  }, [])


  return (
    <>
      { approved ? (
        <Container>
          <div className="container p-0">
            <nav className="navstyle navbar navbar-expand-lg">
              <a className="navbar-brand logo" href="/">
                <img src={logoImg} alt="Logo" />
              </a>
              <div className="collapse navbar-collapse" id="navbarNav">
                <div className="mr-auto"></div>
                <ul className="navbar-nav">
                  <li className="nav-item active list-item">
                    <Link to="requestrefund">Cadastrar Reembolso</Link>
                  </li>

                  <li className="nav-item list-item">
                    <Link to="trackrefund">Consultar Reembolso</Link>
                  </li>
                  {approved && (
                    <li className="nav-item list-item">
                      <Link to="approverefund">Aprovar Reembolso</Link>
                    </li>
                  )}
                  {finishRefund && (
                    <li className="nav-item list-item">
                      <Link to="finishrefund">Finalizar Reembolso</Link>
                    </li>
                  )}
                  {registerUser && (
                    <li className="nav-item list-item">
                      <Link to="registeruser">Registar Usuário</Link>
                    </li>
                  )}
                  <li className="nav-item item">
                    <button type="button" className="logout" onClick={handleLogout}>Sair</button>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
          <header>
            <div className="container text-center">
              <div className="row">
                <div className="col-md-12 col-sm-12">
                  <h1 className="title">Bem vindo ao Reembolso Fácil.</h1>
                  <h6 className="subtitle">
                    Nosso intuito é facilitarmos a burocracia e a demora nas questões de reembolso da sua empresa.
                  </h6>
                  <p>Viagens a trabalho, reuniões externas, colaboradores podendo utilizar o próprio carro para compromissos corporativos e outras diversas situações que pedem locomoção ou refeições extras: o reembolso ainda se faz presente em muitas empresas. Abordando esta problemática, principalmente por conta da burocracia e de todo processo que desorganiza o fluxo de caixa da corporação, trouxemos a facilidade e praticidade do nosso produto.</p>
                  <p>Olá, de acordo com o seu perfil você terá as permissões presentes no nosso menu acima.</p>
                </div>
              </div>
            </div>
          </header>
        </Container>
      ) : <Loading />}
    </>
  )
}


export default Dashboard;
