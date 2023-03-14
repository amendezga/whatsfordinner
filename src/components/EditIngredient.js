import React, { useState } from 'react';
import Modal from 'react-modal';

const EditIngredient = ({isOpen, onRequestClose, onSave, data}) => {
  const [name, setName] = useState(data.name);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({name});
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
    >
      <h2>Edit Ingredient</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <button type="submit">Save</button>
      </form>
    </Modal>
  );
};

export default EditIngredient;
