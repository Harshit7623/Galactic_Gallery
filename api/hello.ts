import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "GET") {
    res.status(200).json({ message: "Hello from API!" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
