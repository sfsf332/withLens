import { Controller, Get, Post ,Request,Query,Body} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('用户模块')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post('/createUser')
  @ApiTags('创建用户')
  async createUser(@Body() req){
    return await this.usersService.create(req)
  }
  @Get('getUserList')
  @ApiTags('获取用户列表')
  async getUserList() {
    return await this.usersService.findAll()
  }
  // @Get('getNftOwers')
  // async getNftOwners(@Body() req){
  //   return await this.usersService.getNftOwners(req)
  // }
}

