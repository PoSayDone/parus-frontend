"use server";

import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";

export const uploadFile = async (file: File): Promise<string> => {
	try {
		const bytes = await file.arrayBuffer();
		const buffer = Buffer.from(bytes);

		const fileExtension = file.name.split(".").pop();
		const uniqueFileName = `${uuidv4()}.${fileExtension}`;

		if (process.env.S3_BUCKET) {
			return await uploadToS3(buffer, uniqueFileName, file.type);
		} else {
			return await saveToLocal(buffer, uniqueFileName);
		}
	} catch (error) {
		console.error("Error uploading file:", error);
		throw new Error("Failed to upload file");
	}
};

const saveToLocal = async (
	buffer: Buffer,
	filename: string,
): Promise<string> => {
	const path = join(process.cwd(), "public", "uploads", filename);
	await writeFile(path, buffer);
	return `/uploads/${filename}`;
};

const uploadToS3 = async (
	buffer: Buffer,
	filename: string,
	mimeType: string,
): Promise<string> => {
	const isCustomProvider = !!process.env.S3_ENDPOINT;

	const s3Client = new S3Client({
		region: process.env.S3_REGION || "us-east-1",
		...(isCustomProvider && {
			endpoint: process.env.S3_ENDPOINT,
			forcePathStyle: process.env.S3_FORCE_PATH_STYLE === "true",
		}),
		credentials: {
			accessKeyId:
				process.env.S3_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID!,
			secretAccessKey:
				process.env.S3_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY!,
		},
	});

	const command = new PutObjectCommand({
		Bucket: process.env.S3_BUCKET!,
		Key: `uploads/${filename}`,
		Body: buffer,
		ContentType: mimeType,
	});

	await s3Client.send(command);

	if (isCustomProvider) {
		if (process.env.S3_PUBLIC_URL) {
			return `${process.env.S3_PUBLIC_URL}/uploads/${filename}`;
		}
		const endpoint = process.env.S3_ENDPOINT.replace(/\/$/, "");
		return `${endpoint}/${process.env.S3_BUCKET}/uploads/${filename}`;
	} else {
		return `https://${process.env.S3_BUCKET}.s3.${process.env.S3_REGION || "us-east-1"}.amazonaws.com/uploads/${filename}`;
	}
};
