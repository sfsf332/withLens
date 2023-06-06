import { Prop,Schema, SchemaFactory } from "@nestjs/mongoose";
import { Metadata } from "src/interface/metadata.interface";
import * as mongoose from 'mongoose';

export const MetadataSchema = new mongoose.Schema({
    name: String,
    image: String,
    type: String,
    nftName: String,
    thumbnail: String,
})

