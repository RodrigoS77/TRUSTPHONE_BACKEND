import mongoose, {Schema, model} from 'mongoose';

const RevisionCelularesSchema = new Schema({
    idCelular: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Celulares",
    },
    idTecnico:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tecnicos",
    },
    saludBateria: {
        type: String
    },
    estadoPantalla: {
        type: String
    },
    estadoCamara:{
        type: String
    },
    estadoBotones:{
        type: String
    },
    fechaRevision:{
        type: Date
    },
    estado:{
        type: String
    }
},{
    timestamps: true,
    strict: false
})

export default model('RevisionCelulares', RevisionCelularesSchema);