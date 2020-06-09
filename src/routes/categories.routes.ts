import { Router } from 'express';

const categories = Router();

categories.post('/', async (request, response) => {
  const { id, title } = request.body;
});
