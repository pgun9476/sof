import express from 'express';

import FinalRecommendationTable from '../../data/tableau/FinalRecommendationTable';

const router = express.Router();


router.post("/init/data", function (req, res, next) {
  try {
    console.log('/init/data - POST');
    //console.log(JSON.parse(req.body.data));
    //console.log("#####");
    //console.log(tableData);
    //console.log(req.body.name),
    //console.log(JSON.parse(req.body.column)),
    //console.log(req.body.dataCount)
    // @TODO - pass the data in to session

    const model = new FinalRecommendationTable();
    model.data = JSON.parse(req.body.data);
    model.columns = JSON.parse(req.body.column);
    const data = model.getFormattedData();
    const metaData = model.getMetadata();
    const metaDataForSelectedTable = model.getMetaDataForSelectedTable();

    res.status(200);
    res.send({
      metaData,
      metaDataForSelectedTable,
      data,
    });

  } catch (err) {
    next(err);
  }

});

export default router;
