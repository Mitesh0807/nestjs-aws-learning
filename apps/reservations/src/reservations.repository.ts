import { Injectable } from "@nestjs/common";
import { AstractRepository } from "@app/common";
import { ReservationDocument } from "./reservations/models/reservation.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
@Injectable()
export class ReservationsRepository extends AstractRepository<ReservationDocument> {

  constructor(
    @InjectModel(ReservationDocument.name) reservationModel: Model<ReservationDocument>
  ) {
    super(reservationModel);
  }

}


