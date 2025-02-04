import React, { useRef, useState } from 'react';
import { MediaDropzone } from '@/components/upload/MediaDropzone';
import { MediaPreview } from '@/components/upload/MediaPreview';
import { UploadProgress } from '@/components/upload/UploadProgress';
import { PostUploader } from '@/components/post/PostUploader';
import { Card } from '@/components/ui/card';

export const UploadStep = ({ setStep, setPostId }: { setStep: (step: number) => void; setPostId: (id: string) => void }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [rotation, setRotation] = useState(0);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Upload Your Media</h2>
        <div className="space-y-4">
          <MediaDropzone
            onFileSelect={handleFileSelect}
            accept={{
              'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
              'video/*': ['.mp4', '.mov', '.avi']
            }}
          />

          {file && (
            <>
              <MediaPreview
                file={file}
                rotation={rotation}
                onRotate={handleRotate}
                imageRef={imageRef}
              />
              <UploadProgress progress={uploadProgress} isUploading={isUploading} />
              <PostUploader
                file={file}
                imageRef={imageRef}
                setPostId={setPostId}
                setStep={setStep}
              />
            </>
          )}
        </div>
      </Card>
    </div>
  );
};