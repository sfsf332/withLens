import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { UsersModule } from './users/users.module';
import { ScheduleModule } from '@nestjs/schedule';
import { PlayerModule } from './player/player.module';
import { ItemModule } from './item/item.module';
import { TasksService } from './schedule/task.service';
import { MetadataModule } from './metadata/metadata.module';

@Module({
  imports: [DbModule, UsersModule,ScheduleModule.forRoot(), PlayerModule, ItemModule, MetadataModule,],
  controllers: [AppController],
  providers: [AppService,TasksService],
})
export class AppModule { }
