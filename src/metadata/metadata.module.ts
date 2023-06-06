
import { MetadataController } from './metadata.controller';
import { MetadataService } from './metadata.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { MetadataSchema } from 'src/db/schema/metadata.scheme';

@Module({
  imports:[MongooseModule.forFeature([{ name: 'Metadata', schema: MetadataSchema }])],
  controllers: [MetadataController],
  providers: [MetadataService],
  exports: [MetadataService],
 
})
export class MetadataModule {}