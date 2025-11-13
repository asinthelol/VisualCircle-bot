import { prisma } from '../lib/prisma';
import { downloadFromS3 } from '../lib/s3';
import fetch from 'node-fetch';

// Retrieves an image by its name from the database and downloads from S3

export async function retrieveImage(name: string): Promise<Buffer | null> {
  const imageRecord = await prisma.image.findFirst({
    where: { name },
  });

  if (!imageRecord) {
    return null;
  }

  // If URL is an S3 URL, download from S3
  // Otherwise fall back to downloading from the URL directly
  if (imageRecord.url.includes('s3.amazonaws.com')) {
    const s3Key = imageRecord.url.split('.com/')[1];
    return await downloadFromS3(s3Key);
  } else {
    // Legacy support for old file paths or direct URLs
    const response = await fetch(imageRecord.url);
    return Buffer.from(await response.arrayBuffer());
  }
}