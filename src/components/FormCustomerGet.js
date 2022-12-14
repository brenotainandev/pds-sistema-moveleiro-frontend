import axios from "axios";
import React, { useEffect, useRef} from "react";
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
  width: 800px;
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

const Form = ({ setCustomer}) => {
  const ref = useRef();


  const getAllCustomer = async () => {
    try {
      const res = await axios.get("http://localhost:3001/customer");
      setCustomer(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  const handleSubmitPesquisa = async (e) => {
    e.preventDefault();

    const customers = ref.current;

    if (
      !customers.customer_name.value
    ) {
      return toast.warn("Se o campo permaner vazio, será retornado todos os clientes!") && getAllCustomer();
    }


    try {
      const res = await axios.post("http://localhost:3001/customer/name", {
        customerName: customers.customer_name.value,
      });

      const newArray = res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1));

      console.log(newArray);
      if(newArray.length === 0){
        toast.error("Cliente Não Encontrado")
      }
      setCustomer(newArray);

    } catch (error) {
      toast.error("Cliente Não Encontrado");
    }

    customers.customer_name.value = "";
  };

  useEffect(() => {}, [setCustomer]);

  return (
    <>
      <FormContainer ref={ref} onSubmit={handleSubmitPesquisa}>
        <InputArea>
          <Label>Nome do Cliente</Label>
          <Input name="customer_name" />
        </InputArea>
        <Button type="submit">PESQUISAR</Button>
      </FormContainer>
    </>

  );
};

export default Form;