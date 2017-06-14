import express from 'express';
import { pick } from 'lodash';
import config from '../../config';

const router = express.Router();

/**
 * Return configs for client
 */
router.get('/client-config', (req, res, next) => {
  try {
    const fConfig = pick(config, ['tableau']);
    res.status(200);
    res.send({ ...fConfig });
  } catch (err) {
    next(err);
  }
});

export default router;
