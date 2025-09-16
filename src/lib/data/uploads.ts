"use server";

import { writeFile } from "fs/promises";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// This function handles file uploads by saving them to the public directory in development
// and to S3 in production
export const uploadFile = async (file: File): Promise<string> => {
  try {
    // Convert the file to a buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate a unique filename
    const fileExtension = file.name.split('.').pop();
    const uniqueFileName = `${uuidv4()}.${fileExtension}`;

    // Check if we're in production or development
    if (process.env.NODE_ENV === "production" && process.env.AWS_S3_BUCKET) {
      // Production: Upload to S3
      return await uploadToS3(buffer, uniqueFileName, file.type);
    } else {
      // Development: Save to public directory
      return await saveToLocal(buffer, uniqueFileName);
    }
  } catch (error) {
    console.error("Error uploading file:", error);
    throw new Error("Failed to upload file");
  }
};

// Save file to local public directory (development)
const saveToLocal = async (buffer: Buffer, filename: string): Promise<string> => {
  const path = join(process.cwd(), "public", "uploads", filename);
  await writeFile(path, buffer);
  return `/uploads/${filename}`;
};

// Upload file to S3 (production)
const uploadToS3 = async (buffer: Buffer, filename: string, mimeType: string): Promise<string> => {
  const s3Client = new S3Client({
    region: process.env.AWS_REGION || "us-east-1",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
    }
  });

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET!,
    Key: `uploads/${filename}`,
    Body: buffer,
    ContentType: mimeType,
  });

  await s3Client.send(command);
  
  // Return the public URL of the uploaded file
  return `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION || "us-east-1"}.amazonaws.com/uploads/${filename}`;
};
