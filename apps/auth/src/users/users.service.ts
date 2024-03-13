import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.reposiory';
import * as bcrypt from 'bcryptjs';
import { UserDocument } from '@app/common';
import { FilterQuery } from 'mongoose';
import { PinoLogger } from 'nestjs-pino';
@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository
  ) { }
  async createUser(createUserDto: CreateUserDto) {
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10)
    return this.usersRepository.create(createUserDto);
  }

  findAll() {
    return this.usersRepository.find({});
  }

  findOne(query: FilterQuery<UserDocument>) {
    console.log(query, "query")
    return this.usersRepository.findOne(query);
  }

  update(_id: string, updateUserDto: any) {
    return this.usersRepository.updateOne({ _id }, {
      $set: {
        ...updateUserDto
      }
    })
  }

 async  remove(_id: string) {
    return this.usersRepository.findOneAndDelete({ _id })
  }

  async validateUser(email: string, password: string) {
    try {
      const user = await this.usersRepository.findOne({ email: email });
      PinoLogger.bind(user, " User validated");
      if (!user) {
        throw new NotFoundException(' User not found!');
      }
      if (!bcrypt.compareSync(password, user.password)) {
        throw new UnauthorizedException('Invalid credentials');
      }
      PinoLogger.bind(this, " User validated");
      return user;
    } catch (error) {
    }
  }
}
