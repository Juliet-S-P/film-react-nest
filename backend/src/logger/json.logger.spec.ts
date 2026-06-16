import { JsonLogger } from './json.logger';

describe('JsonLogger', () => {
  let logger: JsonLogger;

  beforeEach(() => {
    logger = new JsonLogger();
  });

  it('should write log message as JSON', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation();

    logger.log('hello');

    expect(spy).toHaveBeenCalledWith(
      JSON.stringify({
        level: 'log',

        message: 'hello',

        optionalParams: [],
      }),
    );

    spy.mockRestore();
  });

  it('should write error message as JSON', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();

    logger.error('error');

    expect(spy).toHaveBeenCalled();

    spy.mockRestore();
  });
});
