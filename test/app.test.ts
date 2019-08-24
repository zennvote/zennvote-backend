import { expect } from 'chai';
import * as request from 'supertest';
import index from '../src/index';

describe('app.test', () => {
  const req = request(index);

  it('GET /', async () => {
    const res = await req.get('/').expect(200);
    expect(res.text).to.equal('Hello world!');
  });
});
