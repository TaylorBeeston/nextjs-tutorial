import { NextApiHandler } from 'next';

type HelloResponse = {
  text: string;
};

const hello: NextApiHandler<HelloResponse> = (_, res) => {
  res.status(200).json({ text: 'Hello' });
};

export default hello;
