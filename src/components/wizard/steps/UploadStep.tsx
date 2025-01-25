import React, { useState } from 'react';
import { MediaDropzone } from '../../upload/MediaDropzone';
import { MediaPreview } from '../../upload/MediaPreview';
import { UploadProgress } from '../../upload/UploadProgress';
import { useWizard } from '../WizardContext';
import { usePost } from '../../post/PostContext';
import { Crop } from 'react-image-crop';
import { toast } from '@/components/ui/use-toast';

interface UploadStepProps {
  isUploading: boolean;
  uploadProgress: number;
  onUpload: (file: File) => void;
}

export const UploadStep: React.FC<UploadStepProps> = ({ 
  isUploading, 
  uploadProgress,
  onUpload 
}) => {
  const { preview, fileType } = useWizard();
  const { file, setFile, setPreview, setFileType } = usePost();
  const [rotation, setRotation] = useState(0);
  const [crop, setCrop] = useState<Crop>();
  const imageRef = React.useRef<HTMLImageElement>(null);
  
  const handleClear = () => {
    setFile(null);
    setPreview('');
    setFileType('');
    setRotation(0);
    setCrop(undefined);
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const handleDrop = (files: File[]) => {
    if (files.length > 0) {
      const selectedFile = files[0];
      
      if (!selectedFile.type.startsWith('image/') && !selectedFile.type.startsWith('video/')) {
        toast({
          title: "Invalid file type",
          description: "Please upload an image or video file",
          variant: "destructive"
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setPreview(reader.result);
          setFileType(selectedFile.type);
          setFile(selectedFile);
          onUpload(selectedFile);
        }
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm">
          1
        </div>
        <h2 className="text-xl font-semibold">Upload Media</h2>
      </div>

      {!preview ? (
        <MediaDropzone 
          onDrop={handleDrop} 
          onCameraStart={() => {
            // Handle camera start if needed
          }} 
        />
      ) : (
        <>
          <MediaPreview
            preview={preview}
            onClear={handleClear}
            fileType={fileType}
            crop={crop}
            onCropChange={setCrop}
            rotation={rotation}
            onRotate={handleRotate}
            imageRef={imageRef}
          />
          {isUploading && (
            <UploadProgress progress={uploadProgress} isUploading={isUploading} />
          )}
        </>
      )}
    </div>
  );
};