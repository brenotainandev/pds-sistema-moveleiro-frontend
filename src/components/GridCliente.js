import React from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

const Table = styled.table`
  width: 100%;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  max-width: 1120px;
  margin: 20px auto;
  word-break: break-all;
`;

export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr``;

export const Th = styled.th`
  text-align: start;
  border-bottom: inset;
  padding-bottom: 5px;
  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

export const Td = styled.td`
  padding-top: 15px;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width : "auto")};
  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

const Grid = ({ clientes, setClientes, setOnEdit }) => {
  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const handleDelete = async (id) => {
    await axios
      .delete("http://localhost:3001/cliente/" + id)
      .then(({ data }) => {
        const newArray = clientes.filter((user) => user.id !== id);

        setClientes(newArray);
        toast.success("Cliente Deletado");
      })
      .catch(({ data }) => toast.error("Cliente Não Deletado"));

    setOnEdit(null);
  };

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Nome</Th>
          <Th>CPF</Th>
          <Th>Telefone</Th>
          <Th>Email</Th>
          <Th>CEP</Th>
          <Th>Logadouro</Th>
          <Th>Numero</Th>
          <Th>Complemento</Th>
          <Th>Bairro</Th>
          <Th>Municipio</Th>
          <Th>Estado</Th>
        </Tr>
      </Thead>
      <Tbody>
        {clientes.map((item, i) => (
          <Tr key={i}>
            <Td width="10%">{item.clienteName}</Td>
            <Td width="20%">{item.clienteCPF}</Td>
            <Td width="20%">{item.clienteTelefone}</Td>
            <Td width="20%">{item.clienteEmail}</Td>
            <Td width="20%">{item.clienteCep}</Td>
            <Td width="20%">{item.clienteLogadouro}</Td>
            <Td width="20%">{item.clienteNumero}</Td>
            <Td width="20%">{item.clienteComplemento}</Td>
            <Td width="20%">{item.clienteBairro}</Td>
            <Td width="20%">{item.clienteMunicipio}</Td>
            <Td width="20%">{item.clienteEstado}</Td>
            <Td alignCenter width="5%">
              <FaEdit onClick={() => handleEdit(item)} />
            </Td>
            <Td alignCenter width="5%">
              <FaTrash onClick={() => handleDelete(item.id)} />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default Grid;