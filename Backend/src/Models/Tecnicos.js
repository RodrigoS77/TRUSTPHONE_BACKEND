import {Schema, model} from 'mongoose';

const TecnicosSchema = new Schema({
    nombre: {
        type: String
    },
    apellido: {
        type: String
    },
    correo: {
        type: String
    },
    telefono: {
        type: String
    },
    experiencia:{
        type: String
    },
    estado:{
        type: String
    },
    fechaContratacion:{
        type: Date
    }
},{
    timestamps: true,
    strict: false
})

export default model('Tecnicos', TecnicosSchema);