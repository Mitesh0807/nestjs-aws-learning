import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DatabaseModule, UserDocument, UserSchema } from '@app/common';
import { UsersRepository } from './users.reposiory';

@Module({
  imports: [DatabaseModule, DatabaseModule.forFeature([{ name: UserDocument.name, schema: UserSchema }])],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService]
})
export class UsersModule { }
