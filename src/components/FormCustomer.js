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
  padding: 10px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 300px;
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

const Form = ({ getCustomer, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const customers = ref.current;

      customers.customer_name.value = onEdit.customerName;
      customers.cpf.value = onEdit.cpf;
      customers.phone.value = onEdit.phone;
      customers.email.value = onEdit.email;
      customers.cep.value = onEdit.cep;
      customers.street.value = onEdit.street;
      customers.house_number.value = onEdit.houseNumber;
      customers.complement.value = onEdit.complement;
      customers.district.value = onEdit.district;
      customers.state.value = onEdit.state;
      customers.city.value = onEdit.city;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const customers = ref.current;

    if (
      !customers.customer_name.value||
      !customers.cpf.value ||
      !customers.phone.value ||
      !customers.email.value ||
      !customers.cep.value ||
      !customers.street.value ||
      !customers.house_number.value ||
      !customers.complement.value ||
      !customers.district.value ||
      !customers.state.value ||
      !customers.city.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
      await axios
        .put("http://localhost:3001/customer/" + onEdit.id, {
          customerName: customers.customer_name.value,
          cpf: customers.cpf.value,
          phone: customers.phone.value,
          email: customers.email.value,
          cep: customers.cep.value,
          street: customers.street.value,
          houseNumber: customers.house_number.value,
          complement: customers.complement.value,
          district: customers.district.value,
          state: customers.state.value,
          city: customers.city.value,
        })
        .then(({ data }) => toast.success("Criente Atualizado"))
        .catch(({ data }) => toast.error("Criente Não Atualizado"));
    } else {
      await axios
        .post("http://localhost:3001/customer", {
          customerName: customers.customer_name.value,
          cpf: customers.cpf.value,
          phone: customers.phone.value,
          email: customers.email.value,
          cep: customers.cep.value,
          street: customers.street.value,
          houseNumber: customers.house_number.value,
          complement: customers.complement.value,
          district: customers.district.value,
          state: customers.state.value,
          city: customers.city.value,
        })
        .then(({ data }) => toast.success("Criente Criado"))
        .catch(({ data }) => toast.error("Criente Não Criado"));
    }

    customers.customer_name.value = "";
    customers.cpf.value = "";
    customers.phone.value = "";
    customers.email.value = "";
    customers.cep.value = "";
    customers.street.value = "";
    customers.house_number.value = "";
    customers.complement.value = "";
    customers.district.value = "";
    customers.state.value = "";
    customers.city.value = "";

    setOnEdit(null);
    getCustomer();
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Nome</Label>
        <Input name="customer_name" />
      </InputArea>
      <InputArea>
        <Label>CPF</Label>
        <Input name="cpf"/>
      </InputArea>
      <InputArea>
        <Label>Telefone</Label>
        <Input name="phone" />
      </InputArea>
      <InputArea>
        <Label>Email</Label>
        <Input name="email" />
      </InputArea>
      <InputArea>
        <Label>Cep</Label>
        <Input name="cep" />
      </InputArea>
      <InputArea>
        <Label>Logradouro</Label>
        <Input name="street" />
      </InputArea>
      <InputArea>
        <Label>Número</Label>
        <Input name="house_number" />
      </InputArea>
      <InputArea>
        <Label>Complemento</Label>
        <Input name="complement" />
      </InputArea>
      <InputArea>
        <Label>Bairro</Label>
        <Input name="district" />
      </InputArea>
      <InputArea>
        <Label>Cidade</Label>
        <Input name="city" />
      </InputArea>
      <InputArea>
        <Label>Estado</Label>
        <Input name="state" />
      </InputArea>
      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default Form;