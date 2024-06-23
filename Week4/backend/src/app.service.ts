import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  getHello(): string {
    return 'Hello World!';
  }

  test() {
    return "It works!"
   }

  async getRecentVotes(){
    // Data is stored in a file
    const fs = require('fs'); 
    const fileExists = fs.existsSync("data/lastVotes.json");
    console.log(fileExists);
    
    if(!fileExists){
      return [];
    }else {
    return JSON.parse(fs.readFileSync("data/lastVotes.json"))
    }
  }
}
