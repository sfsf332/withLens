import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/interface/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
const sdk = require('api')('@alchemy-docs/v1.0#5pjs22lbwifycf');

@Injectable()
export class UsersService {
   

    constructor( @InjectModel('User') private readonly userModel: Model<User>) { 
        // this.getNftOwners('0xdb46d1dc155634fbc732f92e853b10b288ad5a1d')
    }
    async create(CreateUserDto: CreateUserDto): Promise<User> {
        const createdUser = new this.userModel(CreateUserDto);
        console.log(CreateUserDto)
        return await createdUser.save();
    }
    // async getNftOwners(nftAddress:string): Promise<User> {
    //     sdk.server('https://eth-mainnet.g.alchemy.com/nft/v2');
    //     sdk.getOwnersForCollection({
    //         contractAddress: nftAddress,
    //         withTokenBalances: 'false',
    //         apiKey: 'HyL-ZQJvN-EVa3sgbE3Q1MPXlvjSdfiY'
    //     })
    //     .then(({ data }) => console.log(data))
    //     .catch(err => console.error(err));
    //     const createdUser = new this.userModel(CreateTokenDto);
       
    //     return await createdUser.save();
    // }
    async findAll(): Promise<User[]> {
        return await this.userModel.find().exec();
    }
    
}
