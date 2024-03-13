import axios from "axios";

const usuario = axios.create({
  baseURL: "http://localhost:8080/usuario"
});

const circulo = axios.create({
  baseURL: "http://localhost:8080/circulo"
});

const arquivosUser = axios.create({
  baseURL: "http://localhost:8080/usuario/arquivos"
});

const arquivosCirculo = axios.create({
  baseURL: "http://localhost:8080/circulo/arquivos"
});

const arquivo = axios.create({
  baseURL: "http://localhost:8080/arquivo"
});

const vertopal = axios.create({
  baseURL: "http://localhost:8080/vertopal"
});

const changer = axios.create({
  baseURL: "http://localhost:8080/changer"
});

export { usuario, circulo , arquivosUser , arquivosCirculo , arquivo , vertopal , changer };