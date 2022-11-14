import { LOGTAIL_KEY } from 'config';
import { Logtail } from 'npm:@logtail/node';
import {
  Context,
  ContextKey,
  Middleware,
  Sync,
} from 'npm:@logtail/types';

type LogLevel = "debug" | "info" | "warn" | "error"
type Message = string;
interface ILogtailLog {
  dt: Date;
  level: LogLevel;
  message: string;
  [key: string]: ContextKey | Context;
}
interface SomeLog extends Partial<typeof Logtail> {
  logged: number;
  synced: number;
  log<TContext extends Context>(message: string, level?: LogLevel, _context?: TContext): Promise<ILogtailLog & TContext>;

  debug(message: Message, context?: Context): Promise<ILogtailLog & Context>
  info(message: Message, context?: Context): Promise<ILogtailLog & Context>
  warn(message: Message, context?: Context): Promise<ILogtailLog & Context>
  error(message: Message, context?: Context): Promise<ILogtailLog & Context>

  setSync(fn: Sync): void
  use(fn: Middleware): void
  remove(fn: Middleware): void
}

type LogReturn<TContext> = ILogtailLog & TContext;
class FakeLogtail implements SomeLog {
  constructor(sourceToken?: string) {
    !sourceToken
  }
  get logged(): number { return 0 }
  get synced(): number { return 0 }
  log<TContext>(message: string, _level: LogLevel, _context: TContext): Promise<LogReturn<TContext>> {
    const level = (_level || 'info') as LogLevel;
    const logReturn: ILogtailLog & TContext = {
      dt: new Date(),
      level: level,
      message: message,
      ..._context
    }

    console.log(`${level}: ${message}`);
    let finalLog: LogReturn<TContext> = logReturn as LogReturn<TContext>;
    finalLog = logReturn as LogReturn<TContext>
    console.log(JSON.stringify(logReturn));
    return new Promise(res => res(finalLog))
  }

  async debug(message: Message, context?: Context): Promise<ILogtailLog & Context> {
    return await this.log(message, 'debug', context || {});
  }

  async info(message: Message, context?: Context): Promise<ILogtailLog & Context> {
    return await this.log(message, 'debug', context || {});
  }

  async warn(message: Message, context?: Context): Promise<ILogtailLog & Context> {
    return await this.log(message, 'debug', context || {});
  }

  async error(message: Message, context?: Context): Promise<ILogtailLog & Context> {
    return await this.log(message, 'debug', context || {});
  }

  setSync(fn: Sync): void { ((x: Sync) => !x)(fn); }
  use(fn: Middleware): void { ((x: Middleware) => !x)(fn); }
  remove<T>(fn: T): void { ((x: T) => !x)(fn); }
}

let logtail: SomeLog;
if (LOGTAIL_KEY.length) {
  logtail = new Logtail(LOGTAIL_KEY);
}
else {
  logtail = new FakeLogtail();
}
export { logtail as log };