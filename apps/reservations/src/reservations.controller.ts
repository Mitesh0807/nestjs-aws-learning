import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, Res, Inject } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { JwtAuthGuard, UserDto, CurrentUser, PAYMENTS_SERVICE } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';


@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService,
    @Inject(PAYMENTS_SERVICE) private readonly paymentsService: ClientProxy
  ) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createReservationDto: CreateReservationDto,
    @CurrentUser() user: UserDto,
  ) {
    return this.reservationsService.create(createReservationDto, user);
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(
    @CurrentUser() user: UserDto,
  ) {
    return this.reservationsService.findAll(user._id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.reservationsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateReservationDto: UpdateReservationDto) {
    return this.reservationsService.update(id, updateReservationDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.reservationsService.remove(id);
  }
}
