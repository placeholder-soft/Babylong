import { FC, useState, ChangeEvent, useEffect } from "react"
import { useCosmWasmSigningClient, useExecuteContract } from "graz"
import { toast } from "react-toastify"
import { signingOpts } from "../../constant"
import { env } from "../../env"
import { ImageUploader } from "../../components/ImageUploader"
import { randomNanoid } from "../../utils/nanoid"
import { createToken } from "../../service"
import header from "./_/header.png"
import bg from "./_/bg.png"
import title from "./_/title.png"
import button from "./_/button.png"
import { Footer } from "../../components/footer"
import HotIcon from "./_/hot.svg?react"
import { useNavigate } from "react-router"

interface FormData {
  displayName: string
  ticker: string
  description: string
  image: string
  create_at: number
  twitterLink: string
  telegramLink: string
  websiteLink: string
}

const initialFormState: FormData = {
  displayName: '',
  ticker: '',
  description: '',
  image: '',
  create_at: 0,
  twitterLink: '',
  telegramLink: '',
  websiteLink: '',
}

const styles = {
  label: "block text-2xl font-bold text-black",
  input: "block w-full focus:border-indigo-500 focus:ring-indigo-500 bg-[#F5F5F5] rounded-xl p-4 border-[4px] border-[#E6E6E6]",
  formGroup: "flex flex-col gap-2",
  submitButton: "w-full flex justify-center font-bold py-4 px-6 border-[4px] border-black rounded-xl text-2xl text-black bg-[#FFCA05]"
}

export const CreateTokenPage: FC = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState<FormData>(initialFormState)
  const [isUploading, setIsUploading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

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

    setIsSubmitting(true)

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
            setIsSubmitting(false)
          },
          onSuccess: async () => {
            await createToken({
              name,
              displayName: formData.displayName.trim(),
              ticker: formData.ticker.trim(),
              description: formData.description.trim(),
              image: formData.image,
              createAt: Date.now(),
              twitterLink: formData.twitterLink.trim(),
              telegramLink: formData.telegramLink.trim(),
              websiteLink: formData.websiteLink.trim(),
            })
            setIsSubmitting(false)
            toast.success("Token created successfully")
            navigate(`/}`)
          },
        },
      )
    } catch (error) {
      setIsSubmitting(false)
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      toast.error(errorMessage)
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="w-full min-h-[100vh] relative flex flex-col items-center justify-center">
      <div className="flex-1 w-full flex flex-col items-center justify-center relative pb-[524px]">
        <img src={header} alt="header" className="h-[80px] w-full relative z-10" />
        <img src={bg} alt="bg" className="w-full h-full absolute top-0 left-0 z-0" />
        <img src={title} alt="title" className="h-[108px] relative z-10 mt-[120px] mb-[100px]" />
        <form onSubmit={handleSubmit} className="space-y-6 bg-white w-[640px] flex-1 relative z-10 border-[4px] border-black rounded-xl p-10">
          <div className="absolute -top-[100px] -left-[100px] z-30">
            <HotIcon />
          </div>
          {/* Name Input */}
          <div className={styles.formGroup}>
            <label htmlFor="displayName" className={styles.label}>
              Name
            </label>
            <input
              type="text"
              id="displayName"
              name="displayName"
              placeholder="Name"
              value={formData.displayName}
              onChange={handleInputChange}
              className={styles.input}
              required
            />
          </div>

          {/* Ticker Input */}
          <div className={styles.formGroup}>
            <label htmlFor="ticker" className={styles.label}>
              Ticker
            </label>
            <input
              type="text"
              id="ticker"
              name="ticker"
              placeholder="Ticker"
              value={formData.ticker}
              onChange={handleInputChange}
              className={styles.input}
              required
            />
          </div>

          {/* Description Input */}
          <div className={styles.formGroup}>
            <label htmlFor="description" className={styles.label}>
              Description
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className={`${styles.input} resize-none`}
            />
          </div>

          <div className="h-[1px] w-full bg-[#E6E6E6]" />

          {/* Image Uploader */}
          <div className={styles.formGroup}>
            <label className={styles.label}>
              Image or Video
            </label>
            <ImageUploader
              onUploadSuccess={handleImageUploadSuccess}
              onUploadStart={handleImageUploadStart}
              onUploadError={handleImageUploadError}
            />
          </div>

          {/* Website Link Input */}
          <div className={styles.formGroup}>
            <label htmlFor="websiteLink" className={styles.label}>
              Website Link
            </label>
            <input
              id="websiteLink"
              name="websiteLink"
              placeholder="(Optional)"
              value={formData.websiteLink}
              onChange={handleInputChange}
              className={styles.input}
            />
          </div>

          {/* Twitter Link Input */}
          <div className={styles.formGroup}>
            <label htmlFor="twitterLink" className={styles.label}>
              Twitter Link
            </label>
            <input
              id="twitterLink"
              name="twitterLink"
              placeholder="(Optional)"
              value={formData.twitterLink}
              onChange={handleInputChange}
              className={styles.input}
            />
          </div>

          {/* Telegram Link Input */}
          <div className={styles.formGroup}>
            <label htmlFor="telegramLink" className={styles.label}>
              Telegram Link
            </label>
            <input
              id="telegramLink"
              name="telegramLink"
              placeholder="(Optional)"
              value={formData.telegramLink}
              onChange={handleInputChange}
              className={styles.input}
            />
          </div>


          <p className="text-lg text-gray-600">Tip: Coin data cannot be changed after creation</p>

          <div className="h-[1px] w-full bg-[#E6E6E6]" />

          {/* Submit Button */}
          <div className="mt-8">
            <button
              type="submit"
              disabled={isUploading || isSubmitting}
              className={styles.submitButton}
            >
              {isSubmitting ? 'CREATING TOKEN...' : isUploading ? 'UPLOADING...' : (
                <div className="flex items-center justify-center gap-2">
                  <span>CREATE TOKEN</span>
                  <img src={button} alt="button" className="h-[70px]" />
                </div>
              )}
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  )
}
