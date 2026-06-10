import RevisionCelularesModel from "../Models/RevisionCelulares.js";

const RevisionCelularesController = {};

// GET
RevisionCelularesController.getRevisiones = async (req, res) => {
    try {
        const revisiones = await RevisionCelularesModel.find()
            .populate("idCelular")
            .populate("idTecnico");

        res.status(200).json(revisiones);
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// GET BY ID
RevisionCelularesController.getRevisionById = async (req, res) => {
    try {
        const revision = await RevisionCelularesModel.findById(req.params.id)
            .populate("idCelular")
            .populate("idTecnico");

        if (!revision) {
            return res.status(404).json({ message: "Revisión no encontrada" });
        }

        res.status(200).json(revision);
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// INSERT
RevisionCelularesController.insertRevision = async (req, res) => {
    try {
        const {
            idCelular,
            idTecnico,
            saludBateria,
            estadoPantalla,
            estadoCamara,
            estadoBotones,
            fechaRevision,
            estado
        } = req.body;

        const newRevision = new RevisionCelularesModel({
            idCelular,
            idTecnico,
            saludBateria,
            estadoPantalla,
            estadoCamara,
            estadoBotones,
            fechaRevision,
            estado
        });

        await newRevision.save();

        res.status(201).json({
            message: "Revisión creada correctamente"
        });
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// UPDATE
RevisionCelularesController.updateRevision = async (req, res) => {
    try {
        const {
            idCelular,
            idTecnico,
            saludBateria,
            estadoPantalla,
            estadoCamara,
            estadoBotones,
            fechaRevision,
            estado
        } = req.body;

        const revisionFound = await RevisionCelularesModel.findById(req.params.id);

        if (!revisionFound) {
            return res.status(404).json({ message: "Revisión no encontrada" });
        }

        await RevisionCelularesModel.findByIdAndUpdate(
            req.params.id,
            {
                idCelular,
                idTecnico,
                saludBateria,
                estadoPantalla,
                estadoCamara,
                estadoBotones,
                fechaRevision,
                estado
            },
            { new: true }
        );

        res.status(200).json({
            message: "Revisión actualizada correctamente"
        });
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// DELETE
RevisionCelularesController.deleteRevision = async (req, res) => {
    try {
        const revisionFound = await RevisionCelularesModel.findById(req.params.id);

        if (!revisionFound) {
            return res.status(404).json({ message: "Revisión no encontrada" });
        }

        await RevisionCelularesModel.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Revisión eliminada correctamente"
        });
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export default RevisionCelularesController;