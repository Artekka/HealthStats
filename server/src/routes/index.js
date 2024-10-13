const express = require('express');
const router = express.Router();

const lipidProfilesRoutes = require('./lipidProfiles');
const runningMetricsRoutes = require('./runningMetrics');
const bodyCompositionRoutes = require('./bodyComposition');

router.use('/lipid-profiles', lipidProfilesRoutes);
router.use('/running-metrics', runningMetricsRoutes);
router.use('/body-composition', bodyCompositionRoutes);

module.exports = router;