// next JS get request

import type { NextApiRequest, NextApiResponse } from 'next';
const articles = [
  {
    id: 1,
    title: 'First Article',
    description: 'This is the first article',
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(articles);
}
