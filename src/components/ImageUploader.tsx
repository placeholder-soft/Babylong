import { FC, useState, ChangeEvent } from "react"
import { toast } from "react-toastify"
import { uploadToFilebase } from "../utils/filebase"
import UploadIcon from "./_/upload.svg?react"

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
      <div className="mt-1 flex justify-center items-center p-6 border-[4px] border-[#E6E6E6] min-h-[250px] rounded-xl">
        <div className="space-y-1 text-center">
          {imagePreview ? (
            <img src={imagePreview} alt="Preview" className="mx-auto h-32 w-32 object-cover" />
          ) : null}
          <div className="flex text-2xl text-gray-600 flex flex-col items-center gap-8">
            <p className="pl-1">drag ‘n drop an image or video</p>
            <label
              htmlFor="image-upload"
              className="relative cursor-pointer text-2xl rounded-xl font-bold text-indigo-600 text-white bg-black py-2 px-6 w-fit"
            >
              <div className="flex items-center gap-2">
                <span>{isUploading ? 'Uploading...' : 'SELECT FILE'}</span>
                <UploadIcon className="w-6 h-6" />
              </div>
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
          </div>
        </div>
      </div>
    </div>
  )
} 