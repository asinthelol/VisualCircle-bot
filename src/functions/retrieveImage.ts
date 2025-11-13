import { prisma } from '../lib/prisma';
import fs from 'fs';

// Retrieves an image by its name from the database and reads the file from disk.

export async function retrieveImage(name: string): Promise<Buffer | null> {
  const imageRecord = await prisma.image.findFirst({
    where: { name },
  });

  if (!imageRecord) {
    return null;
  }

  const imageBuffer = await fs.promises.readFile(imageRecord.url);
  return imageBuffer;
}