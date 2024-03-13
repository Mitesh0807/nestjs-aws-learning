import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, Res } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { JwtAuthGuard, UserDto, CurrentUser } from '@app/common';


@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createReservationDto: CreateReservationDto,
    @CurrentUser() user: UserDto,
    @Res({ passthrough: true }) response: Response
  ) {
    return this.reservationsService.create(createReservationDto, user._id);
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(
    @CurrentUser() user: UserDto,
    @Res({ passthrough: true }) response: Response
  ) {
    return this.reservationsService.findAll(user._id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservationsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReservationDto: UpdateReservationDto) {
    return this.reservationsService.update(id, updateReservationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservationsService.remove(id);
  }
}
