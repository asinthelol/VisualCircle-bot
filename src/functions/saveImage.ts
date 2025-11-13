import { config } from 'dotenv';
import fetch from 'node-fetch';
import { prisma } from '../lib/prisma';
import { uploadToS3 } from '../lib/s3';
config();

// Gets the attached image and uploads it to S3
export async function saveImage(interaction) {
  const userImageUrl = await interaction.options.get('image').attachment.url;
  const userImageName = await interaction.options.get('name').value;
  const imageAttachment = await interaction.options.get('image').attachment;
  const imageName = imageAttachment.name;
  const contentType = imageAttachment.contentType || 'image/png';

  // Check if image name already exists
  const imageRecord = await prisma.image.findFirst({
    where: { name: userImageName },
  });

  if (imageRecord) {
    throw new Error('Image name already exists.');
  }

  // Download image from Discord
  const response = await fetch(userImageUrl);
  const imageBuffer = Buffer.from(await response.arrayBuffer());

  // Upload to S3 with unique key
  const s3Key = `images/${Date.now()}-${imageName}`;
  const s3Url = await uploadToS3(s3Key, imageBuffer, contentType);

  // Save metadata to database
  await prisma.image.create({
    data: {
      name: userImageName,
      url: s3Url,
      uploadedAt: new Date(),
    }
  });
}