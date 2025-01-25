import React, { useRef } from 'react';
import { MediaDropzone } from '../../upload/MediaDropzone';
import { MediaPreview } from '../../upload/MediaPreview';
import { UploadProgress } from '../../upload/UploadProgress';
import { useWizard } from '../WizardContext';

interface UploadStepProps {
  isUploading: boolean;
  uploadProgress: number;
  onUpload: () => Promise<void>;
}

export const UploadStep: React.FC<UploadStepProps> = ({ 
  isUploading, 
  uploadProgress,
  onUpload 
}) => {
  const { 
    file, 
    setFile, 
    preview, 
    setPreview,
    fileType,
    setFileType
  } = useWizard();
  
  const imageRef = useRef<HTMLImageElement>(null);

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setFile(file);
      setFileType(file.type);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const startCamera = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' }
      });
    } catch (error) {
      console.error('Camera access error:', error);
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
        <MediaDropzone onDrop={onDrop} onCameraStart={startCamera} />
      ) : (
        <>
          <MediaPreview
            preview={preview}
            onClear={() => {
              setPreview('');
              setFile(null);
              setFileType('');
            }}
            imageRef={imageRef}
            fileType={fileType}
          />
          {isUploading && (
            <UploadProgress progress={uploadProgress} isUploading={isUploading} />
          )}
        </>
      )}
    </div>
  );
};