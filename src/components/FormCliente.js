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

const Form = ({ getClientes, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const clientes = ref.current;

      clientes.cliente_name.value = onEdit.clienteName;
      clientes.cliente_cpf.value = onEdit.clienteCPF;
      clientes.cliente_telefone.value = onEdit.clienteTelefone;
      clientes.cliente_email.value = onEdit.clienteEmail;
      clientes.cliente_cep.value = onEdit.clienteCep;
      clientes.cliente_logadouro.value = onEdit.clienteLogadouro;
      clientes.cliente_numero.value = onEdit.clienteNumero;
      clientes.cliente_complemento.value = onEdit.clienteComplemento;
      clientes.cliente_bairro.value = onEdit.clienteBairro;
      clientes.cliente_municipio.value = onEdit.clienteMunicipio;
      clientes.cliente_estado.value = onEdit.clienteEstado;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const clientes = ref.current;

    if (
      !clientes.cliente_name.value ||
      !clientes.cliente_cpf.value ||
      !clientes.cliente_telefone.value ||
      !clientes.cliente_email.value ||
      !clientes.cliente_cep.value ||
      !clientes.cliente_logadouro.value ||
      !clientes.cliente_numero.value ||
      !clientes.cliente_complemento.value ||
      !clientes.cliente_bairro.value ||
      !clientes.cliente_municipio.value ||
      !clientes.cliente_estado.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
      await axios
        .put("http://localhost:3001/cliente/" + onEdit.id, {
          clienteName: cliente.cliente_name.value,
          clienteCPF: cliente.cliente_cpf.value,
          clienteTelefone: cliente.cliente_telefone.value,
          clienteEmail: cliente.cliente_email.value,
          clienteCep: cliente.cliente_cep.value,
          clienteLogadouro: cliente.cliente_logadouro.value,
          clienteNumero: cliente.cliente_numero.value,
          clienteComplemento: cliente.cliente_complemento.value,
          clienteBairro: cliente.cliente_bairro.value,
          clienteMunicipio: cliente.cliente_municipio.value,
          clienteEstado: cliente.cliente_estado.value,
        })
        .then(({ data }) => toast.success("Cadastro Atualizado"))
        .catch(({ data }) => toast.error("Cliente Não Atualizado"));
    } else {
      await axios
        .post("http://localhost:3001/cliente", {
          clienteName: cliente.cliente_name.value,
          clienteCPF: cliente.cliente_cpf.value,
          clienteTelefone: cliente.cliente_telefone.value,
          clienteEmail: cliente.cliente_email.value,
          clienteCep: cliente.cliente_cep.value,
          clienteLogadouro: cliente.cliente_logadouro.value,
          clienteNumero: cliente.cliente_numero.value,
          clienteComplemento: cliente.cliente_complemento.value,
          clienteBairro: cliente.cliente_bairro.value,
          clienteMunicipio: cliente.cliente_municipio.value,
          clienteEstado: cliente.cliente_estado.value,
        })
        .then(({ data }) => toast.success("Cadastro Criado"))
        .catch(({ data }) => toast.error("Cadastro Criado"));
    }

    cliente.cliente_name.value = "";
    cliente.cliente_cpf.value = "";
    cliente.cliente_telefone.value = "";
    cliente.cliente_email.value = "";
    cliente.cliente_cep.value = "";
    cliente.cliente_logadouro.value = "";
    cliente.cliente_numero.value = "";
    cliente.cliente_complemento.value = "";
    cliente.cliente_bairro.value = "";
    cliente.cliente_municipio.value = "";
    cliente.cliente_estado.value = "";

    setOnEdit(null);
    getClientes();
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Nome</Label>
        <Input name="cliente_name" />
      </InputArea>
      <InputArea>
        <Label>CPF</Label>
        <Input name="cliente_cpf"/>
      </InputArea>
      <InputArea>
        <Label>Telefone</Label>
        <Input name="cliente_telefone" />
      </InputArea>
      <InputArea>
        <Label>E-mail</Label>
        <Input name="cliente_email" />
      </InputArea>
      <InputArea>
        <Label>CEP</Label>
        <Input name="cliente_cep" />
      </InputArea>
      <InputArea>
        <Label>Logadouro</Label>
        <Input name="cliente_logadouro" />
      </InputArea>
      <InputArea>
        <Label>Nº</Label>
        <Input name="cliente_numero" />
      </InputArea>
      <InputArea>
        <Label>Complemento</Label>
        <Input name="cliente_complemento" />
      </InputArea>
      <InputArea>
        <Label>Bairro</Label>
        <Input name="cliente_bairro" />
      </InputArea>
      <InputArea>
        <Label>Municipio</Label>
        <Input name="cliente_municipio" />
      </InputArea>
      <InputArea>
        <Label>Estado</Label>
        <Input name="cliente_estado" />
      </InputArea>
      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default Form;