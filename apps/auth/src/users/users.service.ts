import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.reposiory';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository
  ) { }
  createUser(createUserDto: CreateUserDto) {
    return this.usersRepository.create(createUserDto);
  }

  findAll() {
    return this.usersRepository.find({});
  }

  findOne(_id: string) {
    return this.usersRepository.findOne({ _id });
  }

  update(_id: string, updateUserDto: any) {
    return this.usersRepository.updateOne({ _id }, {
      $set: {
        ...updateUserDto
      }
    })
  }

  remove(_id: string) {
    return this.usersRepository.findOneAndDelete({ _id })
  }

}
