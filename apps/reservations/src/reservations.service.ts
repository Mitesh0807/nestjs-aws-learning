import { Inject, Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsRepository } from './reservations.repository';
import { PAYMENTS_SERVICE, UserDto } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly reservationsRepository: ReservationsRepository,
    @Inject(PAYMENTS_SERVICE) private readonly paymentsService: ClientProxy,
  ) { }
  // create(createReservationDto: CreateReservationDto, userId: string) {
  //   return this.reservationsRepository.create({
  //     ...createReservationDto,
  //     timeStamp: new Date(),
  //     userId: userId
  //   });
  // }

  async create(
    createReservationDto: CreateReservationDto,
    { email, _id: userId }: UserDto,
  ) {
    return this.paymentsService
      .send('create_charge', {
        ...createReservationDto.charge,
        email,
      })
      .pipe(
        map((res: any) => {
          return this.reservationsRepository.create({
            ...createReservationDto,
            invoiceId: res.id,
            timeStamp: new Date(),
            userId,
          });
        }),
      );
  }

  findAll(userId: string) {
    return this.reservationsRepository.find({ userId });
  }

  findOne(_id: string) {
    return this.reservationsRepository.findOne({ _id });
  }

  update(_id: string, updateReservationDto: UpdateReservationDto) {
    return this.reservationsRepository.updateOne({ _id }, {
      $set: {
        ...updateReservationDto
      }
    })
  }

  remove(_id: string) {
    return this.reservationsRepository.findOneAndDelete({ _id })
  }
}
