import * as request from 'supertest';

import index from '../src/index';

describe('root route test', () => {
  it('GET /', (done) => {
    request(index)
      .get('/')
      .expect(200)
      .expect('Hello world!')
      .end(done);
  });
});
