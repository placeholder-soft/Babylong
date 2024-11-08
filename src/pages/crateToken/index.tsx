import { FC, useState, ChangeEvent } from "react"
import { useCosmWasmSigningClient, useExecuteContract } from "graz"
import { toast } from "react-toastify"
import { signingOpts } from "../../constant"
import { env } from "../../env"
import { uploadToFilebase } from "../../utils/filebase"

interface FormData {
  name: string
  symbol: string
  description: string
  image: File | null
}

const initialFormState: FormData = {
  name: '',
  symbol: '',
  description: '',
  image: null
}

export const CrateTokenPage: FC = () => {
  const [formData, setFormData] = useState<FormData>(initialFormState)
  const [imagePreview, setImagePreview] = useState<string>('')
  const [isUploading, setIsUploading] = useState(false)

  const { data: signingClient } = useCosmWasmSigningClient({
    opts: signingOpts,
  })
  const { executeContract } = useExecuteContract({
    contractAddress: env.VITE_FACTORY_ADDRESS,
  })

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // 验证文件大小（例如：最大 5MB）
    const maxSize = 5 * 1024 * 1024 // 5MB
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

    setFormData(prev => ({ ...prev, image: file }))
    setImagePreview(URL.createObjectURL(file))
  }

  const resetForm = () => {
    setFormData(initialFormState)
    setImagePreview('')
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!signingClient) {
      toast.error("Please connect your wallet first")
      return
    }

    setIsUploading(true)

    try {
      let imageUrl = ''
      if (formData.image) {
        const uploadResult = await uploadToFilebase(formData.image)
        imageUrl = uploadResult.url
        console.log('Upload successful - CID:', uploadResult.cid)
      }

      executeContract(
        {
          signingClient,
          msg: {
            create_bonding_token: {
              name: formData.name.trim(),
              symbol: formData.symbol.trim().toUpperCase(),
              description: formData.description.trim(),
              image: imageUrl,
            },
          },
        },
        {
          onError: (err) => {
            console.error('Contract execution failed:', err)
            toast.error("Failed to create token")
          },
          onSuccess: (data) => {
            toast.success("Token created successfully")
            console.log('Contract execution successful:', data)
            resetForm()
          },
        },
      )
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      console.error('Error creating token:', errorMessage)
      toast.error(errorMessage)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 font-SchibstedGrotesk">Create New Token</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Input */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Token Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>

        {/* Symbol Input */}
        <div>
          <label htmlFor="symbol" className="block text-sm font-medium text-gray-700">
            Token Symbol
          </label>
          <input
            type="text"
            id="symbol"
            name="symbol"
            value={formData.symbol}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>

        {/* Description Input */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Token Image</label>
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
                  <span>Upload a file</span>
                  <input
                    id="image-upload"
                    name="image-upload"
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isUploading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
          >
            {isUploading ? 'Creating...' : 'Create Token'}
          </button>
        </div>
      </form>
    </div>
  )
}
