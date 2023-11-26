import CardCirculo from '../components/CardCirculo';
import Navbar from '../components/Header';
import Footer from '../components/Footer';
import './styles-pages/circulos.css';
import React, { useEffect, useState } from 'react';
import { grupoApi } from '../api';

const Grupos = () => {
  const [grupos, setGrupos] = useState([]);

  useEffect(() => {
    grupoApi.get('/')
      .then(response => {
        setGrupos(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar grupos:", error);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="containerCirculo">
        <div className='containerCards'>
          {grupos.map(grupo => (
            <CardCirculo key={grupo.id} grupo={grupo} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Grupos