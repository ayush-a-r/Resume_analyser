import express from 'express';
import fetch from 'node-fetch';
import multer from 'multer';
const upload = multer();
const router = express.Router();

// hit FastAPI → /api/compare
router.post('/compare', upload.none(), async (req, res) => {
  const { resume_text, job_description } = req.body;
  const r = await fetch('http://localhost:8000/api/compare', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ resume_text, job_description })
  });
  res.json(await r.json());
});

// PDF annotate
router.post('/annotate', upload.single('file'), async (req, res) => {
  const jd = req.body.jd || '';
  const form = new FormData();
  form.append('file', req.file.buffer, { filename: req.file.originalname });
  form.append('jd', jd);
  const r = await fetch('http://localhost:8000/api/annotate', {
    method: 'POST',
    body: form
  });
  // tunnel the resulting PDF back
  res.setHeader('Content-Type', 'application/pdf');
  r.body.pipe(res);
});

export default router;