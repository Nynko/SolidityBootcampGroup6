import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test')
  async test() {
    return {result: await this.appService.test()};
  }

  @Get('recent-votes')
  async recentVotes() {
    return {result: await this.appService.getRecentVotes()};
  }


}
