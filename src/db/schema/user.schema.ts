import { Prop,Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "src/interface/user.interface";
import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    name: String,
    token: String,
})

