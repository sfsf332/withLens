
import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TokenSchema } from '../db/schema/token.schema';


@Module({
  imports: [MongooseModule.forFeature([{ name: 'token', schema: TokenSchema }])],

  controllers: [TokenController],
  providers: [TokenService],
  exports:[TokenModule]
})
export class TokenModule {}
