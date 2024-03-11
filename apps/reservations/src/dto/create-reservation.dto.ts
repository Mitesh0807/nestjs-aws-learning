import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreateReservationDto {
  @IsDate({ message: "startDate must be a date" })
  @Type(() => Date)
  startDate: Date;
  @IsDate({ message: "endDate must be a date" })
  @Type(() => Date)
  endDate: Date;
  @IsString({ message: "placeId must be a string" })
  @IsNotEmpty({ message: "placeId cannot be empty" })
  placeId: string;
  @IsString({ message: "invoiceId must be a string" })
  @IsNotEmpty({ message: "invoiceId cannot be empty" })
  invoiceId: string
}
