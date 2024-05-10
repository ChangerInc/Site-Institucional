import axios from "axios";

const host = "http://localhost:8080"

const usuario = axios.create({
  baseURL: host+"/usuario"
});

const circulo = axios.create({
  baseURL: host+"/circulo"
});

const arquivosUser = axios.create({
  baseURL: host+"/usuario/arquivos"
});

const arquivosCirculo = axios.create({
  baseURL: host+"/circulo/arquivos"
});

const arquivo = axios.create({
  baseURL: host+"/arquivo"
});

const vertopal = axios.create({
  baseURL: host+"/vertopal"
});

const changer = axios.create({
  baseURL: host+"/changer"
});

export { usuario, circulo , arquivosUser , arquivosCirculo , arquivo , vertopal , changer };