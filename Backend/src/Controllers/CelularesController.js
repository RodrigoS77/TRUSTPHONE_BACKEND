import celularesModel from "../Models/Celulares.js";
import { v2 as cloudinary } from "cloudinary";
import { config } from "../../config.js";

const CelularesController = {};

// GET ALL
CelularesController.getAllCelulares = async (req, res) => {
  try {
    const celulares = await celularesModel
      .find()
      .populate("idMarca");

    res.status(200).json(celulares);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// INSERT
CelularesController.insertCelular = async (req, res) => {
  try {
    const {
      nombre,
      idMarca,
      modelo,
      almacenamiento,
      color,
      precio,
      condicion,
      stock,
      descripcion,
      estado,
    } = req.body;

    const newCelular = new celularesModel({
      nombre,
      idMarca,
      modelo,
      almacenamiento,
      color,
      precio,
      condicion,
      stock,
      descripcion,
      estado,
      fechaAgregado: new Date(),
      imagen: req.file?.path,
      public_id: req.file?.filename,
    });

    await newCelular.save();

    res.status(200).json({
      message: "Celular guardado correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// DELETE
CelularesController.deleteCelular = async (req, res) => {
  try {
    const celularFound = await celularesModel.findById(req.params.id);

    if (!celularFound) {
      return res.status(404).json({
        message: "Celular no encontrado",
      });
    }

    // Eliminar imagen de Cloudinary
    if (celularFound.public_id) {
      await cloudinary.uploader.destroy(celularFound.public_id);
    }

    await celularesModel.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Celular eliminado correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// UPDATE
CelularesController.updateCelular = async (req, res) => {
  try {
    const {
      nombre,
      idMarca,
      modelo,
      almacenamiento,
      color,
      precio,
      condicion,
      stock,
      descripcion,
      estado,
    } = req.body;

    const celularFound = await celularesModel.findById(req.params.id);

    if (!celularFound) {
      return res.status(404).json({
        message: "Celular no encontrado",
      });
    }

    const updatedData = {
      nombre,
      idMarca,
      modelo,
      almacenamiento,
      color,
      precio,
      condicion,
      stock,
      descripcion,
      estado,
    };

    // Si viene una nueva imagen
    if (req.file) {
      if (celularFound.public_id) {
        await cloudinary.uploader.destroy(celularFound.public_id);
      }

      updatedData.imagen = req.file.path;
      updatedData.public_id = req.file.filename;
    }

    await celularesModel.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    res.status(200).json({
      message: "Celular actualizado correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// GET BY ID
CelularesController.getCelularById = async (req, res) => {
  try {
    const celular = await celularesModel
      .findById(req.params.id)
      .populate("idMarca");

    if (!celular) {
      return res.status(404).json({
        message: "Celular no encontrado",
      });
    }

    res.status(200).json(celular);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export default CelularesController;
