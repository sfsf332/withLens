import { Prop,Schema} from "@nestjs/mongoose";
import {Document } from 'mongoose'
@Schema()

export class Metadata extends Document {
    @Prop()
    nftName:string;
    @Prop()
    name: string;
    @Prop()
    tokenId: string;
    @Prop()
    image: string;
    @Prop()
    thumbnail:string;
}