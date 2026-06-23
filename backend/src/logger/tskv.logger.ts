import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class TskvLogger implements LoggerService {
  private format(level: string, message: any, optionalParams: any[] = []) {
    const fields: Record<string, string> = {
      level,
      message: String(message),
    };

    optionalParams.forEach((p, i) => {
      fields[`param${i + 1}`] = String(p);
    });

    return Object.entries(fields)
      .map(([k, v]) => `${k}=${v}`)
      .join('\t');
  }

  log(message: any, ...optionalParams: any[]) {
    console.log(this.format('log', message, optionalParams));
  }

  error(message: any, ...optionalParams: any[]) {
    console.error(this.format('error', message, optionalParams));
  }

  warn(message: any, ...optionalParams: any[]) {
    console.warn(this.format('warn', message, optionalParams));
  }

  debug(message: any, ...optionalParams: any[]) {
    console.debug(this.format('debug', message, optionalParams));
  }

  verbose(message: any, ...optionalParams: any[]) {
    console.log(this.format('verbose', message, optionalParams));
  }
}