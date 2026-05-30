import MarcasModel from "../Models/Marcas.js";

const MarcasController = {}

MarcasController.getMarcas = async (req, res) => {
    const marcas = await MarcasModel.find();
    res.json(marcas);
}

MarcasController.insertMarcas = async (req, res) => {
    const {name} = req.body;
    const newMarcas = new BrachesModel({name});
    await newMarcas.save();
    res.json({message: 'Marca creada correctamente'});
}

MarcasController.updateMarcas = async (req, res) => {
    const {name} = req.body;
    await MarcasModel.findByIdAndUpdate(
        req.params.id,
        {
            name
        },
        {new: true}
    );
    res.json({message: 'Marca actualizada correctamente'});
}

MarcasController.deleteMarcas = async (req, res) => {
    await MarcasModel.findByIdAndDelete(req.params.id);
    res.json({message: 'Marca eliminada correctamente'});
}

//BUSCAR SOLO 1 POR ID
MarcasController.getMarcasById = async (req, res) => {
    try {
        const marcas = await MarcasModel.findById(req.params.id);
        if (!marcas) {
            return res.status(404).json({message: 'Marca no encontrada'});
        }

        return res.status(200).json(marcas);
    } catch (error) {
        console.log("error"+ error);
        return res.status(500).json({message: 'Error Interno de Servidor'});
    }
}

//BUSCAR POR NOMBRE
MarcasController.getMarcasPorNombre = async (req, res) => {
    try {
        const {name} = req.body;

        const products = await MarcasModel.find({
            name: { $regex: name, $options: 'i' }
        })

        if (!marcas) {
           return res.status(404).json({message: 'Marca no encontrada'}); 
        }

        return res.status(200).json(marcas);
    } catch (error) {
        console.log("error"+ error);
        return res.status(500).json({message: 'Error Interno de Servidor'});
    }
}

export default MarcasController;