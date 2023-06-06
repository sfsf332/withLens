
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Token } from 'src/interface/token.interface';
import { CreateTokenDto } from './dto/create-token.dto';

@Injectable()
export class TokenService {
  
    constructor(
        @InjectModel('Token') private readonly TokenModel: Model<Token>) { }
    // public createUser(user: CreateUserDto) {
    //     return new this.userModel(user).save()
    // }
    public async create(CreateUserDto: CreateTokenDto): Promise<Token> {
        const createdNFT = new this.TokenModel(CreateTokenDto);
        console.log(CreateUserDto)
        return await createdNFT.save();
    }
    public async findAll(): Promise<Token[]> {
        return await this.TokenModel.find().exec();
    }
}
