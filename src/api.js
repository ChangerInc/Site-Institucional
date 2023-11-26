import axios from "axios";

const usuario = axios.create({
  baseURL: "http://localhost:8080/usuario"
});

const vertopal = axios.create({
  baseURL: "http://localhost:8080/vertopal"
});

const circulo = axios.create({
  baseURL: "http://localhost:8080/circulo"
});

const historico = axios.create({
  baseURL: "http://localhost:8080/historico-conversao"
});

const changer = axios.create({
  baseURL: "http://localhost:8080/changer"
});

export { usuario, vertopal , circulo, historico, changer };