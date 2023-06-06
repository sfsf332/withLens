import { Prop,Schema, SchemaFactory } from "@nestjs/mongoose";
import { Token } from "src/interface/token.interface";
import * as mongoose from 'mongoose';

export const HloderSchema = new mongoose.Schema({
    name: String,
    address: String,
    ownerList: Array,
})

