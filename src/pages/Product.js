import GlobalStyle from "../styles/global";
import styled from "styled-components";
import Form from "../components/Form"
import Grid from "../components/Grid";
import FormProduct from "../components/FormProduct";
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

function Product() {
  const [products, setProducts] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3001/product");
      setProducts(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, [setProducts]);

  return (
    <>
      <Container>
        <Title>PRODUTOS</Title>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getProducts={getProducts}/>
        <FormProduct setProducts={setProducts}/>
        <Grid setOnEdit={setOnEdit} products={products} setProducts={setProducts}/>
      </Container>
      <ToastContainer autoClose={3000} position={toast.POSITION.TOP_CENTER} />
      <GlobalStyle />
    </>
  );
}

export default Product;
