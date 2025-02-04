import React from 'react';
import { MediaDropzone } from '@/components/upload/MediaDropzone';
import { MediaPreview } from '@/components/upload/MediaPreview';
import { usePost } from '@/components/post/PostContext';
import { Card } from '@/components/ui/card';

interface UploadStepProps {
  onUpload: (file: File) => void;
}

export const UploadStep: React.FC<UploadStepProps> = ({ onUpload }) => {
  const { file, preview, fileType } = usePost();
  const imageRef = React.useRef<HTMLImageElement>(null);

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Upload Your Media</h2>
        <div className="space-y-4">
          {!file && (
            <MediaDropzone
              onDrop={(acceptedFiles) => {
                if (acceptedFiles.length > 0) {
                  onUpload(acceptedFiles[0]);
                }
              }}
            />
          )}

          {file && preview && (
            <MediaPreview
              preview={preview}
              rotation={0}
              onRotate={() => {}}
              imageRef={imageRef}
              fileType={fileType}
            />
          )}
        </div>
      </Card>
    </div>
  );
};