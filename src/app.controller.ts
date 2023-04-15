import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

const Authorization =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1XzE2ODE1NTQ1NzIxMjJfZTZiMTY3IiwidXNlcklkIjoxMjU4MTUxNjcsIm5pY2tOYW1lIjoidV8xNjgxNTU0NTcyMTIyX2U2YjE2NyIsInBob25lIjoiMTMwNjYyNjYzNjYiLCJwd2RVcGRhdGVUaW1lIjoiMjAyMy0wNC0xNSAxODozMTowMSIsImxhc3RMb2dpblRpbWUiOiIyMDIzLTA0LTE1IDE4OjMxOjMyIiwicmVtZW1iZXJNZSI6ZmFsc2UsInN5c3RlbVZlcnNpb24iOiIxIiwicGxhdGZvcm0iOiI3ODgxIiwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTY4MjE1OTQ5Mn0.7ClRWe5hbu5GKlroTprtfJMp5yf98DB-f2FE2QwcVGo';
const goodsId = '201612521056418';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post('purchase')
  async purchase(): Promise<string> {
    return this.appService.purchase(goodsId, Authorization);
  }
}
