import GlobalStyle from "../styles/global";
import styled from "styled-components";
import Form from "../components/FormCustomer"
import Grid from "../components/GridFormCustomer";
import FormCustomerGet from "../components/FormCustomerGet";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Navbar from "../components/Navbar";
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

function Product() {
  const [customers, setCustomer] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getCustomer = async () => {
    try {
      const res = await axios.get("http://localhost:3001/customer");
      setCustomer(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getCustomer();
  }, [setCustomer]);

  return (
    <>
      <Navbar />
      <Container>
        <Title>CLIENTES</Title>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getCustomer={getCustomer}/>
        <FormCustomerGet setCustomer={setCustomer}/>
        <Grid setOnEdit={setOnEdit} customers={customers} setCustomer={setCustomer}/>
      </Container>
      <ToastContainer autoClose={3000} position={toast.POSITION.TOP_CENTER} />
      <GlobalStyle />
    </>
  );
}

export default Product;
