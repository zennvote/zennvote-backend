import rewire = require('rewire');
import { should, expect } from 'chai';

import {} from '../../src/utils/sheet';

should();

describe('sheet util test', () => {
  const spreadSheetId = '1UDclsflzIvc1eXy-Uzr_fwFewUxKm3VLq4bSfHF6Hxs';
  const getValues = rewire('../../src/utils/sheet').__get__('getValues');

  it('Get single value from sheet', async () => {
    const [[result]] = await getValues(spreadSheetId, '시트1!A1');

    expect(result).to.equal('testA1');
  });

  it('Get multiple value from sheet', async () => {
    const values = await getValues(spreadSheetId, '시트1!A2:B3');

    expect(values[0]).have.members(['testA2', 'testB2']);
    expect(values[1]).have.members(['testA3', 'testB3']);
  });
});
