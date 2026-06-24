import { TskvLogger } from './tskv.logger';

describe('TskvLogger', () => {
  let logger: TskvLogger;

  beforeEach(() => {
    logger = new TskvLogger();
  });

  it('should format log message in TSKV', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation();

    logger.log('hello');

    expect(spy).toHaveBeenCalledWith('level=log\tmessage=hello');

    spy.mockRestore();
  });

  it('should add params to TSKV', () => {
  const spy = jest.spyOn(console, 'log').mockImplementation();

  logger.log('hello', 'world');

  expect(spy).toHaveBeenCalledWith(
    'level=log\tmessage=hello\tparam1=world',
  );

  spy.mockRestore();
});
});
