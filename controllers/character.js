// Ejemplo de userController.js
const Character = require("../models/character");

exports.getCharacters = async (req, res) => {
  try {
    let filter = {};
    // Consulta la base de datos para obtener todos los personajes
    if (req.query.isDefault) {
      filter = { ...filter, isDefault: true };
    }
    const characters = await Character.find(filter);

    res.status(200).json(characters);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los personajes." });
  }
};

exports.createCharacter = async (req, res) => {
  try {
    // Obtén los datos del personaje desde el cuerpo de la solicitud
    const { nombre, rostro, parteSuperior, parteInferior, zapatos, isDefault } =
      req.body;
    const userData = req.user.id;

    // Crea una nueva instancia de Character
    const nuevoPersonaje = new Character({
      nombre: nombre,
      rostro: rostro,
      parteSuperior: parteSuperior,
      parteInferior: parteInferior,
      zapatos: zapatos,
      createdBy: userData,
      isDefault: isDefault,
    });

    // Guarda el personaje en la base de datos
    const personajeCreado = await nuevoPersonaje.save();

    res.status(201).json(personajeCreado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear el personaje." });
  }
};

exports.getLastCharacters = async (req, res) => {
  try {
    // Consulta la base de datos para obtener todos los personajes
    const characters = await Character.find()
      .sort({ createdAt: -1 }) // Ordenar por fecha de creación en orden descendente
      .limit(Number(req.query.size)); // Limitar a los últimos n resultados;

    res.status(200).json(characters);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los personajes." });
  }
};

exports.getCharactersByUserId = async (req, res) => {
  try {
    const userId = req.user.id;

    // Realiza una consulta a la base de datos para obtener los personajes creados por el usuario
    const characters = await Character.find({ createdBy: userId });

    res.status(200).json(characters);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los personajes." });
  }
};

exports.updateCharacter = async (req, res) => {
  try {
    const characterId = req.params.id; // Obtiene el ID del personaje desde los parámetros de la URL
    const updates = req.body; // Obtiene los datos de actualización desde el cuerpo de la solicitud
    updates.updatedBy = req.user.id; //Agrego el userId

    // Realiza la actualización del personaje en la base de datos
    const updatedCharacter = await Character.findByIdAndUpdate(
      characterId,
      updates,
      { new: true } // Opción "new" para devolver el documento actualizado
    );

    if (!updatedCharacter) {
      return res.status(404).json({ message: "Personaje no encontrado." });
    }

    res.status(200).json(updatedCharacter);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar el personajes." });
  }
};
