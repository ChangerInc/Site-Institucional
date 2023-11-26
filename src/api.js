import axios from "axios";

const usuario = axios.create({
  baseURL: "http://localhost:8080/usuario"
});

const vertopal = axios.create({
  baseURL: "http://localhost:8080/vertopal"
});

const grupoApi = axios.create({
  baseURL: "http://localhost:8080/circulo"
});


export { usuario, vertopal, grupoApi };