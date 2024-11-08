import { FC, useState, ChangeEvent } from "react"
import { toast } from "react-toastify"
import { uploadToFilebase } from "../utils/filebase"

interface ImageUploaderProps {
  onUploadSuccess: (url: string) => void
  onUploadStart?: () => void
  onUploadError?: (error: string) => void
}

export const ImageUploader: FC<ImageUploaderProps> = ({
  onUploadSuccess,
  onUploadStart,
  onUploadError
}) => {
  const [imagePreview, setImagePreview] = useState<string>('')
  const [isUploading, setIsUploading] = useState(false)

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // 验证文件大小（最大 5MB）
    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      toast.error("File size exceeds 5MB limit")
      return
    }

    // 验证文件类型
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']
    if (!allowedTypes.includes(file.type)) {
      toast.error("Only JPG, PNG and GIF files are allowed")
      return
    }

    try {
      setIsUploading(true)
      onUploadStart?.()

      // 创建预览
      setImagePreview(URL.createObjectURL(file))

      // 上传文件
      const result = await uploadToFilebase(file)
      onUploadSuccess(result.url)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Upload failed'
      onUploadError?.(errorMessage)
      toast.error(errorMessage)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">Image</label>
      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
        <div className="space-y-1 text-center">
          {imagePreview ? (
            <img src={imagePreview} alt="Preview" className="mx-auto h-32 w-32 object-cover" />
          ) : (
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
          <div className="flex text-sm text-gray-600">
            <label
              htmlFor="image-upload"
              className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
            >
              <span>{isUploading ? 'Uploading...' : 'Upload a file'}</span>
              <input
                id="image-upload"
                name="image-upload"
                type="file"
                className="sr-only"
                accept="image/*"
                onChange={handleImageChange}
                disabled={isUploading}
              />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
        </div>
      </div>
    </div>
  )
} 