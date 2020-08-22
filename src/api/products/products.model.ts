import { Schema } from 'mongoose';

export const ProductSchema = new Schema({

    index: String,
    title: String,
    descripction: String,
    create: { tyep: Date },

}, { timestamps: true })