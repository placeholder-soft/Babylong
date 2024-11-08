import { S3Client, PutObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3"


interface FilebaseUploadResult {
  cid: string
  url: string
  fileName: string
}

const FILEBASE_CONFIG = {
  accessKey: 'E8362FE47E1485D23F67',
  secretKey: '9wJiNNwDMShOQbUV7v4yau5Emvqh7qLHTyUXycmD',
  bucket: 'satlayer-hackathon',
  gateway: 'https://geographical-tomato-panther.myfilebase.com/ipfs',
  endpoint: 'https://s3.filebase.com',
  region: 'us-east-1'
}

const getS3Client = (() => {
  let client: S3Client | null = null
  return () => {
    if (!client) {
      client = new S3Client({
        endpoint: FILEBASE_CONFIG.endpoint,
        credentials: {
          accessKeyId: FILEBASE_CONFIG.accessKey,
          secretAccessKey: FILEBASE_CONFIG.secretKey,
        },
        region: FILEBASE_CONFIG.region,
        forcePathStyle: true
      })
    }
    return client
  }
})()


const generateUniqueFileName = (file: File): string => {
  const timestamp = Date.now()
  const randomString = Math.random().toString(36).substring(2, 8)
  const extension = file.name.split('.').pop()
  return `${timestamp}-${randomString}.${extension}`
}


export async function uploadToFilebase(file: File | null): Promise<FilebaseUploadResult> {
  if (!file) {
    throw new Error("No file provided")
  }

  try {
    const client = getS3Client()
    const fileName = generateUniqueFileName(file)

    
    await client.send(new PutObjectCommand({
      Bucket: FILEBASE_CONFIG.bucket,
      Key: fileName,
      Body: file,
      ContentType: file.type,
      ACL: 'public-read'
    }))

    const headResponse = await client.send(new HeadObjectCommand({
      Bucket: FILEBASE_CONFIG.bucket,
      Key: fileName,
    }))

    const cid = headResponse.Metadata?.['cid']
    if (!cid) {
      throw new Error('Failed to get IPFS CID')
    }

    return {
      cid,
      fileName,
      url: `${FILEBASE_CONFIG.gateway}/${cid}`
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    throw new Error(`Failed to upload file: ${errorMessage}`)
  }
} 