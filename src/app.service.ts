import { Injectable } from '@nestjs/common';
import { name, version } from '../package.json';

@Injectable()
export class AppService {
  getHealth(): object {
    return {
      status: 'ok',
      app_name: name,
      app_version: version,
    };
  }
}
