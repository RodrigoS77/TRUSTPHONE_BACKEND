import TecnicosModel from "../Models/Tecnicos.js";

const TecnicosController = {};

// GET
TecnicosController.getTecnicos = async (req, res) => {
    try {
        const tecnicos = await TecnicosModel.find();
        res.status(200).json(tecnicos);
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// GET BY ID
TecnicosController.getTecnicoById = async (req, res) => {
    try {
        const tecnico = await TecnicosModel.findById(req.params.id);

        if (!tecnico) {
            return res.status(404).json({ message: "Técnico no encontrado" });
        }

        res.status(200).json(tecnico);
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// INSERT
TecnicosController.insertTecnico = async (req, res) => {
    try {
        const {
            nombre,
            apellido,
            correo,
            telefono,
            experiencia,
            estado,
            fechaContratacion
        } = req.body;

        const newTecnico = new TecnicosModel({
            nombre,
            apellido,
            correo,
            telefono,
            experiencia,
            estado,
            fechaContratacion
        });

        await newTecnico.save();

        res.status(201).json({
            message: "Técnico creado correctamente"
        });
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// UPDATE
TecnicosController.updateTecnico = async (req, res) => {
    try {
        const {
            nombre,
            apellido,
            correo,
            telefono,
            experiencia,
            estado,
            fechaContratacion
        } = req.body;

        const tecnicoFound = await TecnicosModel.findById(req.params.id);

        if (!tecnicoFound) {
            return res.status(404).json({ message: "Técnico no encontrado" });
        }

        await TecnicosModel.findByIdAndUpdate(
            req.params.id,
            {
                nombre,
                apellido,
                correo,
                telefono,
                experiencia,
                estado,
                fechaContratacion
            },
            { new: true }
        );

        res.status(200).json({
            message: "Técnico actualizado correctamente"
        });
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// DELETE
TecnicosController.deleteTecnico = async (req, res) => {
    try {
        const tecnicoFound = await TecnicosModel.findById(req.params.id);

        if (!tecnicoFound) {
            return res.status(404).json({ message: "Técnico no encontrado" });
        }

        await TecnicosModel.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Técnico eliminado correctamente"
        });
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export default TecnicosController;