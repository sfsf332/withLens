import { Prop,Schema, SchemaFactory } from "@nestjs/mongoose";
import { Token } from "src/interface/token.interface";
import * as mongoose from 'mongoose';

export const TokenSchema = new mongoose.Schema({
    name: String,
    address: String,
    ownerList: Array,
})

