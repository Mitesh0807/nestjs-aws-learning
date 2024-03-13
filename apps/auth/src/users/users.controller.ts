import { Body, Controller, Delete, Get, Param, Patch, Post, Res, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CurrentUser } from '../current-user.decorator';
import { UserDocument } from '@app/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  ) { }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAuthUser(
    @CurrentUser() user: UserDocument,
    @Res({ passthrough: true }) response: Response
  ) {
    console.log(user, " getAuthUser");
    //@ts-ignore
    console.log(response?.locals?.user, " local user");
    return user
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne({ _id: id });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
