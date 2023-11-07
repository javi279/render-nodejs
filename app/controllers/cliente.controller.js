const db = require("../models");
const Cliente = db.cliente;
const Op = db.Sequelize.Op;

// Create and Save a new Hall
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Contenido no puede estar vacio!"
    });
    return;
  }

  // Create a Cliente
  const cliente = {
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    edad: req.body.edad,
    status: 1
  };

  // Save Cliente in the database
  Cliente.create(cliente)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Algun error ocurrio al crear cliente."
      });
    });
};

// Encontrar un Cliente with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Cliente.findAll({ 
    where: {
      id: id,
      status: 1
    }})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al recuperar cliente con su id=" + id
      });
    });
};

// Update a Cliente by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  const cliente_update = {
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    edad: req.body.edad,
  };

  Cliente.update(cliente_update, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Cliente se actualizo correctamente."
        });
      } else {
        res.send({
          message: `No se puede actualizar con id=${id}. Talvez Cliente no fue encontrado or req.cuerpo esta vacio!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al actualizar con id=" + id
      });
    });
};

// Delete a Cliente con el id especifico en el request
exports.delete = (req, res) => {
  const id = req.params.id;

  // Cliente.destroy({
  //   where: { id: id }
  // })
  Cliente.update({status: 0}, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Cliente fue eliminado correctamente!"
        });
      } else {
        res.send({
          message: `Cannot delete Cliente with id=${id}. Talvez Cliente no se encuentra!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "No se puede eliminar cliente con el id=" + id
      });
    });
};