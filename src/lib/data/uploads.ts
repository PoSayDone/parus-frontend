"use server";

import { writeFile } from "fs/promises";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";

// This function handles file uploads by saving them to the public directory
export const uploadFileToS3 = async (file: File): Promise<string> => {
	try {
		// Convert the file to a buffer
		const bytes = await file.arrayBuffer();
		const buffer = Buffer.from(bytes);

		// Generate a unique filename
		const fileExtension = file.name.split('.').pop();
		const uniqueFileName = `${uuidv4()}.${fileExtension}`;
		
		// Define the path where the file will be saved
		const path = join(process.cwd(), "public", "uploads", uniqueFileName);

		// Save the file
		await writeFile(path, buffer);

		// Return the URL where the file can be accessed
		return `/uploads/${uniqueFileName}`;
	} catch (error) {
		console.error("Error uploading file:", error);
		throw new Error("Failed to upload file");
	}
};
