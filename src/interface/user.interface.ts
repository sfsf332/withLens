import { Prop,Schema} from "@nestjs/mongoose";
import {Document } from 'mongoose'
@Schema()

export class User extends Document {
    @Prop()
    token: string;
    @Prop()
    name: string;
  
    @Prop()
    createdAt: Date;
    @Prop()
    updatedAt: Date;
}