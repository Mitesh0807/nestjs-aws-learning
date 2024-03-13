import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsRepository } from './reservations.repository';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly reservationsRepository: ReservationsRepository
  ) { }
  create(createReservationDto: CreateReservationDto, userId: string) {
    return this.reservationsRepository.create({
      ...createReservationDto,
      timeStamp: new Date(),
      userId: userId
    });
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
