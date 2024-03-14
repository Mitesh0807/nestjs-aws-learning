import { Injectable } from '@nestjs/common';
import { NotifyEmailDto } from './dto/notify-email.dto';
import nodemailer from 'nodemailer';
@Injectable()
export class NotificationsService {
  async notifyEmail(data: NotifyEmailDto) {
    console.log(data, ' in service');
    return data
  }
}
