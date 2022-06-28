import { HttpStatus } from '@nestjs/common';

export class ResponseDto {
  constructor(statusCode: HttpStatus, data: any) {
    this.statusCode = statusCode;
    this.data = data;
  }
  public readonly statusCode!: HttpStatus;
  public readonly data: any;
}
