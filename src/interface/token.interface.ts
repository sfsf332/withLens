
import { Prop,Schema} from "@nestjs/mongoose";
import {Document } from 'mongoose'

interface Owner {
  
    token: string;
    
    hasLens:boolean;
}
@Schema()

export class Token extends Document {
    has(x: any): unknown {
        throw new Error('Method not implemented.');
    }
    @Prop()
    name: string;
    @Prop()
    address: string;
  
    @Prop()
    ownerList: Array<Owner>;
   
}
