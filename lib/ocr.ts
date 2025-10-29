import Tesseract from 'tesseract.js'

export async function extractTextFromImage(file: File): Promise<string> {
  try {
    const { data: { text } } = await Tesseract.recognize(
      file,
      'eng',
      {
        logger: (m) => console.log('OCR Progress:', m)
      }
    )
    return text
  } catch (error) {
    console.error('OCR Error:', error)
    throw new Error('Failed to extract text from image')
  }
}