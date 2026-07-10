import emailjs from 'emailjs-com'

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'demo_service'
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'demo_template'
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'demo_public_key'

export const sendContactMessage = async ({ name, email, subject, message }) => {
  
  if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
    throw new Error('All fields are required.')
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error('Please enter a valid email address.')
  }

  try {
    const result = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      { from_name: name, from_email: email, subject, message },
      { publicKey: PUBLIC_KEY },
    )
    return { success: true, result }
  } catch (err) {
    
    if (PUBLIC_KEY === 'demo_public_key') {
      await new Promise((r) => setTimeout(r, 1100))
      return { success: true, demo: true }
    }
    throw new Error('Failed to send. Please try again later.')
  }
}
