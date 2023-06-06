import { Controller, Get, Post ,Request,Query,Body, Inject} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateTokenDto } from './dto/create-token.dto';
import { TokenService } from './token.service';

@Controller('nft')
@ApiTags('Nft模块')
export class TokenController {
  constructor(private readonly TokenService: TokenService) {}

  @Post('/creatNftCollection')
  @ApiTags('创建NFT集合数据')
  async create(@Body() req){
    return await this.TokenService.create(req)
  }
  @Get('getNftCollection')
  @ApiTags('获取Nft集合数据')
  async getNftCollection() {
    return await this.TokenService.findAll()
  }
}

