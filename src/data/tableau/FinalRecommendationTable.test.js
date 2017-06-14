/* eslint-env mocha */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import { expect } from 'chai';

import columns from '../../../test/fixtures/final.recommendation.table.columns';
import tableData from '../../../test/fixtures/final.recommendation.table.data';

import FinalRecommendationTable from './FinalRecommendationTable';

describe('FinalRecommendationTable', () => {
  it('should Render data for Kendo Grid', () => {

    let model = new FinalRecommendationTable();
    model.data = tableData;
    model.columns = columns;
    const data = model.getFormattedData();
    const config = model.getMetadata();
    const metaDataInSelectTable = model.getMetaDataForSelectedTable();
    //console.log(config);
    //console.log(data);
    console.log(metaDataInSelectTable);
    //expect(true).to.be.true;
  });

});
