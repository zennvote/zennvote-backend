import * as request from 'supertest';
import { should, expect } from 'chai';

import index from '../../src/index';

should();

describe('choices route test', () => {
  describe('Normal cases', () => {
    it('GET /new', (done) => {
      request(index)
        .get('/api/vote')
        .expect(200)
        .end((err, res) => {
        });
    });
  });
});
