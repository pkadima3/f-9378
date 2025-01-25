import React from 'react';
import { MediaDropzone } from '../../upload/MediaDropzone';
import { MediaPreview } from '../../upload/MediaPreview';
import { UploadProgress } from '../../upload/UploadProgress';
import { useWizard } from '../WizardContext';
import { usePost } from '../../post/PostContext';

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
  
  const handleClear = () => {
    setFile(null);
    setPreview('');
    setFileType('');
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
        <MediaDropzone onDrop={(files) => {
          if (files[0]) {
            onUpload(files[0]);
          }
        }} onCameraStart={() => {}} />
      ) : (
        <>
          <MediaPreview
            preview={preview}
            onClear={handleClear}
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