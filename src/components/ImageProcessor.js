import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload, FiDownload, FiLoader } from 'react-icons/fi';

export default function ImageProcessor({ title, description, operation }) {
  const [image, setImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onDrop = useCallback(async (acceptedFiles) => {
    setError(null);
    
    if (acceptedFiles.length === 0) {
      return;
    }
    
    const file = acceptedFiles[0];
    
    // Check if the file is an image
    if (!file.type.startsWith('image/')) {
      setError("Please upload an image file (JPEG, PNG, etc.)");
      return;
    }
    
    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError("File is too large. Maximum size is 10MB.");
      return;
    }
    
    // Preview the original image
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage({
        src: e.target.result,
        file: file
      });
      setProcessedImage(null); // Clear any previously processed image
    };
    reader.readAsDataURL(file);
  }, []);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    }
  });
  
  const handleProcess = async () => {
    if (!image) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Create form data to send to the API
      const formData = new FormData();
      formData.append('image', image.file);
      formData.append('operation', operation);
      
      // Call the API
      const response = await fetch('/api/image-process', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Processing failed');
      }
      
      // Get the processed image as a blob
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      
      setProcessedImage(url);
    } catch (err) {
      console.error("Processing error:", err);
      setError(err.message || "An error occurred while processing the image. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  const handleDownload = () => {
    if (!processedImage) return;
    
    const link = document.createElement('a');
    link.href = processedImage;
    link.download = `processed-${operation}-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-3 text-center">{title}</h1>
      <p className="text-gray-600 mb-8 text-center max-w-2xl mx-auto">{description}</p>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div 
          {...getRootProps()} 
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
          }`}
        >
          <input {...getInputProps()} />
          <FiUpload className="w-12 h-12 mx-auto text-gray-400 mb-3" />
          <p className="text-gray-500 mb-2">
            {isDragActive ? 'Drop the image here...' : 'Drag & drop an image here, or click to select'}
          </p>
          <p className="text-sm text-gray-400">Supports JPG, PNG, WebP (Max: 10MB)</p>
        </div>
      </div>
      
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}
      
      {image && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-3">Original Image</h3>
            <div className="bg-gray-100 rounded-lg p-2">
              <img 
                src={image.src} 
                alt="Original" 
                className="w-full object-contain rounded max-h-96"
              />
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3">Processed Result</h3>
            <div className="bg-gray-100 rounded-lg p-2 min-h-[12rem] flex items-center justify-center">
              {loading ? (
                <div className="text-center">
                  <FiLoader className="w-10 h-10 mx-auto animate-spin text-blue-500 mb-2" />
                  <p>Processing image...</p>
                </div>
              ) : processedImage ? (
                <img 
                  src={processedImage} 
                  alt="Processed" 
                  className="w-full object-contain rounded max-h-96"
                />
              ) : (
                <div className="text-center p-8">
                  <p className="text-gray-500">Click "Process Image" to see the result</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      <div className="flex justify-center space-x-4">
        {image && !loading && !processedImage && (
          <button 
            onClick={handleProcess} 
            className="btn-primary"
          >
            Process Image
          </button>
        )}
        
        {processedImage && (
          <button 
            onClick={handleDownload} 
            className="btn-primary flex items-center"
          >
            <FiDownload className="mr-2" /> Download Result
          </button>
        )}
      </div>
    </div>
  );
}
