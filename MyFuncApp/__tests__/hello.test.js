const request = require('supertest');
const express = require('express');
const func = require('../HelloWorld');

const app = express();

app.get('/', async (req, res) => {
  const context = { log: console.log, res: {} };
  await func.httpTrigger.handler(req, context);
  res.status(context.res.status || 200).send(context.res.body);
});

describe('Azure Function HelloWorld', () => {
  it('should return default "Hello, world!"', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.text).toBe('Hello, world!');
  });

  it('should return name passed in query', async () => {
    const res = await request(app).get('/?name=Archit');
    expect(res.status).toBe(200);
    expect(res.text).toBe('Hello, Archit!');
  });

  it('should return name passed in body text', async () => {
    const res = await request(app).post('/').send('Sahil');
    expect(res.status).toBe(200);
    expect(res.text).toBe('Hello, Sahil!');
  });
});
