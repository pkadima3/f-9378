import React from 'react';
import { MediaDropzone } from '@/components/upload/MediaDropzone';
import { MediaPreview } from '@/components/upload/MediaPreview';
import { UploadProgress } from '@/components/upload/UploadProgress';
import { usePost } from '@/components/post/PostContext';
import { Card } from '@/components/ui/card';

export const UploadStep = () => {
  const { file, setFile, preview, setPreview, setFileType } = usePost();

  const handleDrop = (acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        setFileType(selectedFile.type);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Upload Your Media</h2>
        <div className="space-y-4">
          {!file && (
            <MediaDropzone
              onDrop={handleDrop}
            />
          )}

          {file && preview && (
            <MediaPreview
              preview={preview}
              rotation={0}
              onRotate={() => {}}
              imageRef={React.useRef<HTMLImageElement>(null)}
            />
          )}
        </div>
      </Card>
    </div>
  );
};