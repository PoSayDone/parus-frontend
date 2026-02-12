"use client";

import { uploadFile } from "@/lib/data/uploads";
import { type ChangeEvent, useState } from "react";

type ImageUploadFieldProps = {
  id: string;
  name: string;
  value?: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
};

export default function ImageUploadField({
  id,
  name,
  value,
  onChange,
  readOnly,
}: ImageUploadFieldProps) {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const url = await uploadFile(file);
      onChange(url);
    } catch (error) {
      console.error("Failed to upload image:", error);
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {value ? (
        <div className="relative overflow-hidden rounded-md border border-border">
          <img src={value} alt={name} className="w-full h-32 object-cover" />
        </div>
      ) : null}

      <input
        id={id}
        type="file"
        accept="image/*"
        disabled={readOnly || uploading}
        onChange={handleFileChange}
        className="text-sm file:mr-2 file:rounded-md file:border file:border-border file:bg-background file:px-3 file:py-1 file:text-sm file:cursor-pointer"
      />

      {value ? (
        <button
          type="button"
          onClick={() => onChange("")}
          disabled={readOnly || uploading}
          className="text-xs text-muted-foreground underline w-fit"
        >
          Удалить изображение
        </button>
      ) : null}
    </div>
  );
}
