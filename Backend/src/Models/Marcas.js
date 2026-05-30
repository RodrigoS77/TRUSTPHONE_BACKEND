import {Schema, model} from 'mongoose';

const MarcasSchema = new Schema({
    name: {
        type: String
    }
},{
    timestamps: true,
    strict: false
})

export default model('Marcas', MarcasSchema);