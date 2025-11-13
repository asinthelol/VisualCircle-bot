import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
});

const BUCKET_NAME = process.env.S3_BUCKET_NAME || 'visualcircle-bot-images';

export async function uploadToS3(key: string, buffer: Buffer, contentType: string): Promise<string> {
  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    Body: buffer,
    ContentType: contentType,
    ACL: 'public-read', // Make images publicly accessible
  });

  await s3Client.send(command);

  // Return public URL (supports both bucket names and access point aliases)
  const isAccessPointAlias = BUCKET_NAME.includes('--') && BUCKET_NAME.includes('-s3alias');
  if (isAccessPointAlias) {
    return `https://${BUCKET_NAME}.s3-accesspoint.${process.env.AWS_REGION || 'us-east-1'}.amazonaws.com/${key}`;
  }
  return `https://${BUCKET_NAME}.s3.amazonaws.com/${key}`;
}

export async function downloadFromS3(key: string): Promise<Buffer> {
  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  });

  const response = await s3Client.send(command);
  const chunks: Uint8Array[] = [];

  for await (const chunk of response.Body as any) {
    chunks.push(chunk);
  }

  return Buffer.concat(chunks);
}
