import { FC, useState, ChangeEvent } from "react"
import { useCosmWasmSigningClient, useExecuteContract } from "graz"
import { toast } from "react-toastify"
import { signingOpts } from "../../constant"
import { env } from "../../env"
import { ImageUploader } from "../../components/ImageUploader"
import { randomNanoid } from "../../utils/nanoid"
import { createToken } from "../../service"

interface FormData {
  displayName: string
  ticker: string
  description: string
  image: string
  create_at: number
}

const initialFormState: FormData = {
  displayName: '',
  ticker: '',
  description: '',
  image: '',
  create_at: 0,
}

export const CreateTokenPage: FC = () => {
  const [formData, setFormData] = useState<FormData>(initialFormState)
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

  const handleImageUploadSuccess = (url: string) => {
    setIsUploading(false)
    setFormData(prev => ({ ...prev, image: url }))
  }

  const handleImageUploadStart = () => {
    setIsUploading(true)
  }

  const handleImageUploadError = () => {
    setIsUploading(false)
  }

  const resetForm = () => {
    setFormData(initialFormState)
    if (formData.image) {
      URL.revokeObjectURL(formData.image)
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
      const name = randomNanoid()
      executeContract(
        {
          signingClient,
          msg: {
            create_bonding_token: {
              name,
              symbol: name,
            },
          },
        },
        {
          onError: () => {
            toast.error("Failed to create token")
          },
          onSuccess: async () => {
            await createToken({
              name,
              displayName: formData.displayName.trim(),
              ticker: formData.ticker.trim(),
              description: formData.description.trim(),
              image: formData.image,
              create_at: Date.now(),
            })
            setIsUploading(false)
            toast.success("Token created successfully")
            // resetForm()
          },
        },
      )
    } catch (error) {
      setIsUploading(false) 
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      toast.error(errorMessage)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 font-SchibstedGrotesk">Create New Token</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Display Name Input */}
        <div>
          <label htmlFor="displayName" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="displayName"
            name="displayName"
            value={formData.displayName}
            onChange={handleInputChange}
            className="mt-1 h-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>

        {/* Symbol Input */}
        <div>
          <label htmlFor="symbol" className="block text-sm font-medium text-gray-700">
          Ticker
          </label>
          <input
            type="text"
            id="ticker"
            name="ticker"
            value={formData.ticker}
            onChange={handleInputChange}
            className="mt-1 h-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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

        <ImageUploader
          onUploadSuccess={handleImageUploadSuccess}
          onUploadStart={handleImageUploadStart}
          onUploadError={handleImageUploadError}
        />

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
