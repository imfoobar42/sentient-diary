import express from 'express';
import { exec } from 'child_process';
import path from 'path';

const app = express();
const PORT = 3001;

app.use(express.json());

// Serve static HTML UI from the root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../ui.html'));
});

// Simulation endpoint
app.post('/simulate', (req, res) => {
  const input = req.body.input;

  exec(`INPUT="${input}" npm run simulate:first`, (error, stdout, stderr) => {
    if (error) {
      console.error(stderr);
      return res.status(500).send({ error: 'Simulation failed' });
    }

    const match = stdout.match(/"response_text":"(.*?)"/);
    const response = match ? match[1] : 'No response found';
    res.send({ response });
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
