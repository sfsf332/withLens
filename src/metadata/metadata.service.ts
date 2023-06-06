import { ConsoleLogger, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Metadata } from 'src/interface/metadata.interface';
// import Moralis from 'moralis';
// import { EvmChain } from '@moralisweb3/evm-utils';
import { Network, Alchemy } from "alchemy-sdk";
const settings = {
    apiKey: "HyL-ZQJvN-EVa3sgbE3Q1MPXlvjSdfiY",
    network: Network.MATIC_MAINNET,
};
const alchemy = new Alchemy(settings);
@Injectable()
export class MetadataService {
   
    constructor(
        @InjectModel('Metadata') private readonly MetadataModel: Model<Metadata>
    ) { }
    // public async getItems(): Promise<any> {
    //     return await this.MetadataModel.find({ name: 'Lens Protocol' }).exec();
    // }
    public async setMetadata(medadata: any): Promise<any> {
        const createdNftUserMetadata = new this.MetadataModel(medadata)
        createdNftUserMetadata.save()
        
        return medadata
    }
    
    public async getNftBothUser(name: string,page:number,limit:number): Promise<any> {
        const skip = (page||1 - 1) * limit||10
        const medadata = await this.MetadataModel.find({'nftName':name}).skip(skip).limit(limit||10).exec();
        // const createdNftUserMetadata = new this.MetadataModel(medadata)
        // createdNftUserMetadata.save()
        
        return medadata
    }
    
}