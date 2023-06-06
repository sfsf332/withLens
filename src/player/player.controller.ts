import { Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { PlayerService } from './player.service';

@Controller('player')
export class PlayerController {
  @Inject(PlayerService)
  private readonly service: PlayerService;

  @Get('findLens')
  public findLens(): Promise<any> {
    return this.service.findlens();
  }
  @Get('find')
  public findAll(): Promise<any> {
    return this.service.findAll();
  }
  @Get('settoken/:address')
  public set(@Param('address') address: string): Promise<any> {
    return this.service.set(address);
  }
  @Get('setLensUser')
  public setLensUser(): Promise<any> {
    return this.service.setLensUser();
  }
  @Get('getNftUser/:address')
  public getNftUser(@Param('address') address: string): Promise<any> {
    return this.service.getNftUser(address);
  }
  @Get('getNftUserList/:name/?:page/?:limit')
  public getNftUserList(@Param('name') name: string,@Param('page') page: number,@Param('limit') limit: number): Promise<any> {
    return this.service.getNftBothUser(name,page,limit);
  }
}