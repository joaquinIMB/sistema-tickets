'use client'

import { useState } from 'react';

const FormularioCrearTicket = () => {
  const [ticketData, setTicketData] = useState({
    tituloTicket: '',
    descripcionTicket: '',
    prioridad: '',
    idTicket:'',
    idSector:'',
    idEstado:'',
  });

  const [prioridadDropdownVisible, setPrioridadDropdownVisible] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTicketData({
      ...ticketData,
      [name]: value
    });
  };

  const handlePrioridadClick = () => {
    setPrioridadDropdownVisible(!prioridadDropdownVisible);
  };

  const handlePrioridadSelect = (prioridad) => {
    setTicketData({
      ...ticketData,
      prioridad
    });
    setPrioridadDropdownVisible(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(ticketData);
    setTicketData({
      titulo: '',
      descripcion: '',
      prioridad: 'baja'
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="titulo">Título de ticket:</label>
        <input
          type="text"
          id="titulo"
          name="titulo"
          value={ticketData.titulo}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="descripcion">Descripción de ticket:</label>
        <textarea
          id="descripcion"
          name="descripcion"
          value={ticketData.descripcion}
          onChange={handleInputChange}
          required
        ></textarea>
      </div>
      <div>
        <label>Prioridad:</label>
        <div className="prioridad-dropdown">
          <div className="prioridad-trigger" onClick={handlePrioridadClick}>
            {ticketData.prioridad}
          </div>
          {prioridadDropdownVisible && (
            <div className="prioridad-options">
              <div onClick={() => handlePrioridadSelect('baja')}>Baja</div>
              <div onClick={() => handlePrioridadSelect('media')}>Media</div>
              <div onClick={() => handlePrioridadSelect('alta')}>Alta</div>
            </div>
          )}
        </div>
      </div>
      <button type="submit">Crear Ticket</button>
    </form>
  );
};

export default FormularioCrearTicket;
