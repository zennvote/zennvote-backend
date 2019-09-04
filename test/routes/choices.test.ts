import * as request from 'supertest';
import { should, expect } from 'chai';

import index from '../../src/index';

should();

describe('choices route test', () => {
  const newChoices = ['플루', 'ofStar', '요자쿠라'];
  const unitChoices = ['PoP tarts - RED ZONE', 'Atelier 113 - Cafe Parade', '하모니즈 - Dreaming!'];
  const growChoices = ['만두스테이크', '서로', '윱찌', '컴프즈P', '희몽이', '골더', '프시p', '워라', '물거품'];

  describe('Normal cases', () => {
    it('GET /new', (done) => {
      request(index)
        .get('/api/choices/new')
        .expect(200)
        .end((err, res) => {
          const { body } = res;

          expect(body).to.has.length(3);
          expect(body).to.have.members(newChoices);
          done();
        });
    });

    it('GET /unit', (done) => {
      request(index)
        .get('/api/choices/unit')
        .expect(200)
        .end((err, res) => {
          const { body } = res;

          expect(body).to.has.length(3);
          expect(body).to.have.members(unitChoices);
          done();
        });
    });

    it('GET /grow', (done) => {
      request(index)
        .get('/api/choices/grow')
        .expect(200)
        .end((err, res) => {
          const { body } = res;

          expect(body).to.has.length(133);
          expect(body).to.contains.members(growChoices);
          done();
        });
    });
  });
});
