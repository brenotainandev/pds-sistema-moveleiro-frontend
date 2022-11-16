import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;

const Form = ({ getProducts, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const products = ref.current;

      products.product_code.value = onEdit.productCode;
      products.product_name.value = onEdit.productName;
      products.product_description.value = onEdit.productDescription;
      products.product_color.value = onEdit.productColor;
      products.product_price.value = onEdit.productPrice;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const products = ref.current;

    if (
      !products.product_code.value ||
      !products.product_name.value ||
      !products.product_description.value ||
      !products.product_color.value ||
      !products.product_price.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
      await axios
        .put("http://localhost:3001/product/" + onEdit.id, {
          productCode: products.product_code.value,
          productName: products.product_name.value,
          productDescription: products.product_description.value,
          productColor: products.product_color.value,
          productPrice: products.product_price.value,
        })
        .then(({ data }) => toast.success("Produto Atualizado"))
        .catch(({ data }) => toast.error("Produto Não Atualizado"));
    } else {
      await axios
        .post("http://localhost:3001/product", {
          productCode: products.product_code.value,
          productName: products.product_name.value,
          productDescription: products.product_description.value,
          productColor: products.product_color.value,
          productPrice: products.product_price.value,
        })
        .then(({ data }) => toast.success("Produto Criado"))
        .catch(({ data }) => toast.error("Produto Criado"));
    }

    products.product_code.value = "";
    products.product_name.value = "";
    products.product_description.value = "";
    products.product_color.value = "";
    products.product_price.value = "";

    setOnEdit(null);
    getProducts();
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Codigo</Label>
        <Input name="product_code" />
      </InputArea>
      <InputArea>
        <Label>Nome</Label>
        <Input name="product_name"/>
      </InputArea>
      <InputArea>
        <Label>Descrição</Label>
        <Input name="product_description" />
      </InputArea>
      <InputArea>
        <Label>Cor</Label>
        <Input name="product_color" />
      </InputArea>
      <InputArea>
        <Label>Preço</Label>
        <Input name="product_price" />
      </InputArea>
      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default Form;