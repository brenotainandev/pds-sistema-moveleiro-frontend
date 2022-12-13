import GlobalStyle from "../styles/global";
import styled from "styled-components";
import Form from "../components/FormCliente.js";
import Grid from "../components/GridCliente.js";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Container = styled.div`
  width: 100%;
  max-width: 95%;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h2``;

function App() {
  const [clientes, setClientes] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getClientes = async () => {
    try {
      const res = await axios.get("http://localhost:3001/customer");
      setClientes(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getClientes();
  }, [setClientes]);

  return (
    <>
      <Container>
        <Title>CLIENTES</Title>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getClientes={getClientes} />
        <Grid setOnEdit={setOnEdit} clientes={clientes} setClientes={setClientes}/>
      </Container>
      <ToastContainer autoClose={3000} position={toast.POSITION.TOP_CENTER} />
      <GlobalStyle />
    </>
  );
}

export default App;