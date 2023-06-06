import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Token } from 'src/interface/token.interface';
// import Moralis from 'moralis';
// import { EvmChain } from '@moralisweb3/evm-utils';
import { Network, Alchemy } from "alchemy-sdk";
import { MetadataService } from 'src/metadata/metadata.service';
const settings = {
    apiKey: "HyL-ZQJvN-EVa3sgbE3Q1MPXlvjSdfiY",
    network: Network.MATIC_MAINNET,
};
const alchemy = new Alchemy(settings);
@Injectable()
export class ItemService {
   
    constructor(
        @InjectModel('Token') private readonly tokenModel: Model<Token>,
    ) { }
    public async getItems(): Promise<any> {
        return await this.tokenModel.find({ name: 'Lens Protocol' }).exec();
    }
    public async getNftUser(address: string): Promise<any> {
        let nftUser = await this.tokenModel.find({ address: address }).exec();
        return nftUser
    }
    public async getNftBothUser(name: string): Promise<any> {
        let nftUser = await this.tokenModel.find({ nftName: name }).exec();
        return nftUser
    }
    public async findAll(): Promise<Token[]> {
        return await this.tokenModel.find().exec();
    }
    public async findlens(): Promise<any> {
        return await this.tokenModel.find({ name: 'Lens Protocol' }).exec()
    }
    public async setLensUsers(): Promise<any> {

        const address = "0xdb46d1dc155634fbc732f92e853b10b288ad5a1d";
        // Get owners 
        let { owners, pageKey } = await alchemy.nft.getOwnersForContract(address);
        if (pageKey) {

            const opt = {
                pageKey: pageKey
            }
            let { owners: ownerExtra } = await alchemy.nft.getOwnersForContract(address, opt);
            owners = owners.concat(ownerExtra)
            let tokens = {
                name: 'Lens Protocol',
                address: '0xdb46d1dc155634fbc732f92e853b10b288ad5a1d',
                ownerList: owners
            }
            const createdTokenList = new this.tokenModel(tokens)

            createdTokenList.save()
            return owners.length
        } else {
            let tokens = {
                name: 'Lens Protocol',
                address: '0xdb46d1dc155634fbc732f92e853b10b288ad5a1d',
                ownerList: owners
            }
            const createdTokenList = new this.tokenModel(tokens)

            createdTokenList.save()
            return owners.length
        }




    }
    public async set(nftAddress: string): Promise<any> {
        const settings = {
            apiKey: "HyL-ZQJvN-EVa3sgbE3Q1MPXlvjSdfiY",
            network: Network.ETH_MAINNET,
        };
        const [lens] = await this.findlens()
        console.log(`lens user:${lens.ownerList.length}`)
        const alchemy = new Alchemy(settings);
        const { owners } = await alchemy.nft.getOwnersForContract(nftAddress)
       
        console.log(`nftUser:${owners.length}`)
        const bothUser = new Array([...owners].filter(x=>lens.ownerList.includes(x)))
        // let groups =  await Promise.all(bothUser[0].map(async item => {
        //     let group ={}
        //     let ownerOpt = {
        //         contractAddresses: ['0xdb46d1dc155634fbc732f92e853b10b288ad5a1d']
        //     }
        //     group =  await alchemy.nft.getNftsForOwner(item,ownerOpt)
        //     return group
        //   }))
        let tokens = {
            name: nftAddress,
            address: nftAddress,
            ownerList: bothUser[0]
        }
        console.log(bothUser[0].length)
        const createdTokenList = new this.tokenModel(tokens)
        createdTokenList.save()
        return bothUser[0]
        // return owners

    }
   
}