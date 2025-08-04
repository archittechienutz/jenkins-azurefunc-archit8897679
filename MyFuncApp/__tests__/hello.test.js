const handler = require('../HelloWorld');

describe('Azure Function HelloWorld', () => {
  it('should return default "Hello, world!"', async () => {
    const context = { res: {} };
    const req = { query: {}, body: undefined };
    await handler(req, context);
    expect(context.res.status).toBe(200);
    expect(context.res.body).toBe('Hello, world!');
  });

  it('should return name passed in query', async () => {
    const context = { res: {} };
    const req = { query: { name: 'Archit' }, body: undefined };
    await handler(req, context);
    expect(context.res.status).toBe(200);
    expect(context.res.body).toBe('Hello, Archit!');
  });

  it('should return name passed in body text', async () => {
    const context = { res: {} };
    const req = { query: {}, body: 'Sahil' };
    await handler(req, context);
    expect(context.res.status).toBe(200);
    expect(context.res.body).toBe('Hello, Sahil!');
  });
});
