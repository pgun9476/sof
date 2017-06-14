import express from 'express';
const router = express.Router();

import tableau from './tableau';
import common from './common';

router.use("/api/tableau", tableau);
router.use("/api/common", common);

export default router;
