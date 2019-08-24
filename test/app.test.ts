import { expect } from 'chai';
import * as request from 'supertest';
import index from '../src/index';

describe('Route test', () => {
  const req = request(index);

  it('GET /', () => {
    return req
      .get('/')
      .expect(200)
      .expect('Hello world!');
  });
});
