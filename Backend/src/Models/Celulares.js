import mongoose, {Schema, model} from 'mongoose';

const CelularesSchema = new Schema({
    nombre:{
        type: String,
    },
    idMarca:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Marcas",
    },
    modelo:{
        type: String,
    },
    almacenamiento:{
        type: String,
    },
    color:{
        type: String,
    },
    precio:{
        type: Number,
    },
    condicion:{
        type: String,
    },
    stock:{
        type: Number,
    },
    descripcion:{
        type: String,
    },
    imagen:{
        type: String,
    },
    estado:{
        type: String,
    },
    fechaAgregado:{
        type: Date
    },
    public_id:{
        type: String,
    }
},{
    timestamps: true,
    strict: false
}
)

export default model('Celulares', CelularesSchema);