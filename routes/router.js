const express = require('express');
const router = express.Router();
const app = require('../services');

router.post("/common_start", app);
router.post("/openQuiz", app);
router.post("/answerQuiz", app);
router.post("/quiz_sound", app);
router.post("/repeat_answerstate", app);
router.post("/default_finished", app);

module.exports = router;