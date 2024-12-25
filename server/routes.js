import express from 'express';
import { createPoll, vote, getPolls } from './store.js';
import { addClient, removeClient, broadcast } from './sse.js';

const router = express.Router();

// SSE endpoint
router.get('/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  addClient(res);
  req.on('close', () => removeClient(res));
});

// Create a new poll
router.post('/polls', (req, res) => {
  const { question, options } = req.body;
  const poll = createPoll(question, options);
  broadcast(getPolls());
  res.json({ success: true });
});

// Get all polls
router.get('/polls', (req, res) => {
  res.json(getPolls());
});

// Vote on a poll option
router.post('/vote/:optionId', (req, res) => {
  const optionId = parseInt(req.params.optionId);
  const success = vote(optionId);
  
  if (success) {
    broadcast(getPolls());
    res.json({ success: true });
  } else {
    res.status(404).json({ success: false, error: 'Option not found' });
  }
});

export default router;