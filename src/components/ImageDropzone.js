import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaUpload } from 'react-icons/fa';

export default function ImageDropzone({ onImageUpload }) {
  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles.length > 0) {
      onImageUpload(acceptedFiles[0]);
    }
  }, [onImageUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    maxFiles: 1
  });

  return (
    <div 
      {...getRootProps()} 
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
        ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-500'}`}
    >
      <input {...getInputProps()} />
      <FaUpload className="mx-auto text-3xl mb-4 text-gray-400" />
      {isDragActive ? (
        <p className="text-blue-500">Drop the image here...</p>
      ) : (
        <div>
          <p className="mb-2">Drag & drop an image here, or click to select</p>
          <p className="text-sm text-gray-500">Supports JPG, PNG and GIF</p>
        </div>
      )}
    </div>
  );
} 