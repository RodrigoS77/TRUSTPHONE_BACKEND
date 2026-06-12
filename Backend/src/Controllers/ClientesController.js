import ClientesModel from "../Models/Clientes.js";
import { v2 as cloudinary } from "cloudinary";

const ClientesController = {};

// OBTENER TODOS LOS CLIENTES
ClientesController.getAllClientes = async (req, res) => {
    try {

        const clientes = await ClientesModel.find();

        return res.status(200).json(clientes);

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Error Interno Del Servidor"
        });
    }
};

// ELIMINAR CLIENTE
ClientesController.deleleteCliente = async (req, res) => {
    try {

        const cliente = await ClientesModel.findById(req.params.id);

        if (!cliente) {
            return res.status(404).json({
                message: "Cliente no encontrado"
            });
        }

        // Eliminar imagen de Cloudinary si existe
        if (cliente.public_id) {
            await cloudinary.uploader.destroy(cliente.public_id);
        }

        await ClientesModel.findByIdAndDelete(req.params.id);

        return res.status(200).json({
            message: "Cliente eliminado correctamente"
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Error Interno Del Servidor"
        });
    }
};

// ACTUALIZAR CLIENTE
ClientesController.updateCliente = async (req, res) => {
    try {

        let {
            nombre,
            Apellido,
            correo,
            contrasena,
            telefono,
            estado,
            fechaRegistro,
            isVerified,
            loginAttemps,
            timeOut
        } = req.body;

        nombre = nombre?.trim();
        correo = correo?.trim();

        if (nombre && (nombre.length < 3 || nombre.length > 20)) {
            return res.status(400).json({
                message: "Nombre inválido"
            });
        }

        const cliente = await ClientesModel.findById(req.params.id);

        if (!cliente) {
            return res.status(404).json({
                message: "Cliente no encontrado"
            });
        }

        let fotoPerfil = cliente.fotoPerfil;
        let public_id = cliente.public_id;

        // Si se envía una nueva imagen
        if (req.file) {

            // Eliminar imagen anterior de Cloudinary
            if (cliente.public_id) {
                await cloudinary.uploader.destroy(cliente.public_id);
            }

            fotoPerfil = req.file.path;
            public_id = req.file.filename;
        }

        const updatedCliente = await ClientesModel.findByIdAndUpdate(
            req.params.id,
            {
                nombre,
                Apellido,
                correo,
                contrasena,
                telefono,
                estado,
                fechaRegistro,
                fotoPerfil,
                public_id,
                isVerified,
                loginAttemps,
                timeOut
            },
            {
                new: true
            }
        );

        return res.status(200).json({
            message: "Cliente actualizado correctamente",
            cliente: updatedCliente
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Error Interno Del Servidor"
        });
    }
};

export default ClientesController;