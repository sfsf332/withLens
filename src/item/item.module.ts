import { Module } from '@nestjs/common';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TokenSchema } from 'src/db/schema/token.schema';
import { MetadataModule } from 'src/metadata/metadata.module';

@Module({
  imports:[MongooseModule.forFeature([{ name: 'Token', schema: TokenSchema }]),MetadataModule],
  controllers: [ItemController],
  providers: [ItemService],
  exports: [ItemService],
})
export class ItemModule {}