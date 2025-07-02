import { createNestServer } from '../src/main';

export default async function handler(req, res) {
  const expressApp = await createNestServer();

  expressApp(req, res);
}
