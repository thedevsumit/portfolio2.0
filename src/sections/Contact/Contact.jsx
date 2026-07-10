import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Check, AlertCircle, MapPin, Clock } from 'lucide-react'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { SocialLink } from '../../components/ui/SocialLink'
import { MagneticButton } from '../../components/ui/MagneticButton'
import { ContactTerminalScene } from '../../scenes/ContactTerminalScene'
import { sendContactMessage } from '../../services/emailService'
import { socials } from '../../data/socials'
import { personal } from '../../data/personal'
import { useUIStore } from '../../store/useUIStore'
import { fadeUp, staggerParent } from '../../styles/motion'
import { cn } from '../../utils/cn'

const TerminalPanel = ({ lines, sent }) => (
  <div className="relative h-full min-h-[300px] md:min-h-[420px] rounded-[var(--radius-lg)] border border-[var(--border-soft)] bg-[var(--bg-card)] overflow-hidden">
    {}
    <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border-soft)] bg-[var(--elev-1)]">
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-error" />
        <span className="w-2.5 h-2.5 rounded-full bg-warning" />
        <span className="w-2.5 h-2.5 rounded-full bg-success" />
      </div>
      <span className="text-[10px] font-mono text-faint">~/sumit/contact</span>
      <span className="w-12" />
    </div>

    {}
    <div className="absolute inset-0 mt-12">
      <ContactTerminalScene sent={sent} />
    </div>

    {}
    <div className="relative z-10 p-5 font-mono text-xs space-y-1.5 pointer-events-none" style={{ paddingTop: 'calc(48px + 1.25rem)' }}>
      <AnimatePresence>
        {lines.map((l, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className={cn(
              'flex items-start gap-2',
              l.type === 'success' && 'text-success',
              l.type === 'input' && 'text-mint-500',
              l.type === 'output' && 'text-secondary/80',
              l.type === 'cyan' && 'text-cyan-500',
            )}
          >
            <span className="text-faint">{l.prompt || '$'}</span>
            <span>{l.text}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  </div>
)

export const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') 
  const [terminalLines, setTerminalLines] = useState([
    { text: 'whoami', prompt: '$', type: 'input' },
    { text: 'sumit-kumar', type: 'output' },
    { text: 'status', prompt: '$', type: 'input' },
    { text: 'available-for-opportunities', type: 'cyan' },
    { text: 'contact --open', prompt: '$', type: 'input' },
    { text: 'ready', type: 'success' },
  ])
  const setContactSent = useUIStore((s) => s.setContactSent)
  const setCursorVariant = useUIStore((s) => s.setCursorVariant)

  
  useEffect(() => {
    let keys = ''
    const onKey = (e) => {
      keys = (keys + e.key).slice(-4)
      if (keys === 'help') {
        setTerminalLines((prev) => [
          ...prev,
          { text: 'help', prompt: '$', type: 'input' },
          { text: 'projects · skills · leetcode · codeforces · chess · contact', type: 'cyan' },
        ])
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email'
    if (!form.subject.trim()) e.subject = 'Subject is required'
    if (!form.message.trim()) e.message = 'Message is required'
    else if (form.message.length < 10) e.message = 'Message is too short'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setStatus('sending')
    setTerminalLines((prev) => [
      ...prev,
      { text: `send --message "${form.subject}"`, prompt: '$', type: 'input' },
      { text: 'transmitting...', type: 'output' },
    ])
    try {
      const r = await sendContactMessage(form)
      if (r.success) {
        setStatus('success')
        setContactSent(true)
        setTerminalLines((prev) => [
          ...prev,
          { text: 'message_sent ✓', type: 'success' },
        ])
        setForm({ name: '', email: '', subject: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch (err) {
      setStatus('error')
      setTerminalLines((prev) => [
        ...prev,
        { text: `error: ${err.message || 'failed to send'}`, type: 'output' },
      ])
    }
  }

  const onChange = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }))
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }))
  }

  return (
    <section id="contact" className="section relative">
      <div className="absolute right-0 top-0 w-[500px] h-[500px] glow-blob" aria-hidden />
      <div className="container-x relative z-10">
        <SectionHeading
          eyebrow="// get_in_touch"
          title={
            <>
              Let's <span className="gradient-text">build</span> something
            </>
          }
          description="Open to internships, full-time roles, and interesting collaborations. Send a message and I'll get back to you."
        />

        <div className="mt-12 grid lg:grid-cols-5 gap-6">
          {}
          <motion.form
            onSubmit={handleSubmit}
            variants={staggerParent}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-3 surface p-6 md:p-8 space-y-4"
            noValidate
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <motion.div variants={fadeUp}>
                <label htmlFor="name" className="text-xs font-mono text-muted block mb-1.5">
                  name <span className="text-error">*</span>
                </label>
                <input
                  id="name"
                  value={form.name}
                  onChange={onChange('name')}
                  className={cn('input-base', errors.name && 'input-error')}
                  placeholder="Ada Lovelace"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-err' : undefined}
                />
                {errors.name && <span id="name-err" className="text-[10px] text-error font-mono mt-1 block">{errors.name}</span>}
              </motion.div>
              <motion.div variants={fadeUp}>
                <label htmlFor="email" className="text-xs font-mono text-muted block mb-1.5">
                  email <span className="text-error">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={onChange('email')}
                  className={cn('input-base', errors.email && 'input-error')}
                  placeholder="ada@compute.io"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-err' : undefined}
                />
                {errors.email && <span id="email-err" className="text-[10px] text-error font-mono mt-1 block">{errors.email}</span>}
              </motion.div>
            </div>

            <motion.div variants={fadeUp}>
              <label htmlFor="subject" className="text-xs font-mono text-muted block mb-1.5">
                subject <span className="text-error">*</span>
              </label>
              <input
                id="subject"
                value={form.subject}
                onChange={onChange('subject')}
                className={cn('input-base', errors.subject && 'input-error')}
                placeholder="Collaboration on a real-time product"
                aria-invalid={!!errors.subject}
                aria-describedby={errors.subject ? 'subject-err' : undefined}
              />
              {errors.subject && <span id="subject-err" className="text-[10px] text-error font-mono mt-1 block">{errors.subject}</span>}
            </motion.div>

            <motion.div variants={fadeUp}>
              <label htmlFor="message" className="text-xs font-mono text-muted block mb-1.5">
                message <span className="text-error">*</span>
              </label>
              <textarea
                id="message"
                rows={6}
                value={form.message}
                onChange={onChange('message')}
                className={cn('input-base resize-none', errors.message && 'input-error')}
                placeholder="Hi Sumit, I'd love to talk about..."
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'message-err' : undefined}
              />
              {errors.message && <span id="message-err" className="text-[10px] text-error font-mono mt-1 block">{errors.message}</span>}
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <p className="text-[10px] font-mono text-faint flex items-center gap-1.5">
                <Clock size={10} /> Usually responds within 24 hours
              </p>
              <MagneticButton
                as="button"
                type="submit"
                disabled={status === 'sending'}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                onMouseEnter={() => setCursorVariant('send')}
                onMouseLeave={() => setCursorVariant('default')}
              >
                {status === 'sending' ? (
                  <>
                    <span className="inline-block w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : status === 'success' ? (
                  <>
                    <Check size={14} />
                    <span>Sent!</span>
                  </>
                ) : (
                  <>
                    <Send size={14} />
                    <span>Send Message</span>
                  </>
                )}
              </MagneticButton>
            </motion.div>

            {status === 'error' && (
              <p className="text-xs text-error font-mono flex items-center gap-1.5">
                <AlertCircle size={12} /> Something went wrong. Please email me directly at {personal.email}
              </p>
            )}
          </motion.form>

          {}
          <motion.div
            variants={staggerParent}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-2 space-y-5"
          >
            <motion.div variants={fadeUp}>
              <TerminalPanel lines={terminalLines} sent={status === 'success'} />
            </motion.div>

            <motion.div variants={fadeUp} className="surface p-5 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-faint">
                <MapPin size={12} className="text-cyan-500" />
                {personal.location}
              </div>
              <div className="grid grid-cols-5 gap-2">
                {['github', 'linkedin', 'discord', 'instagram', 'email'].map((id) => (
                  <SocialLink
                    key={id}
                    id={id}
                    href={socials[id].href}
                    label={socials[id].label}
                    handle={socials[id].handle}
                    size="sm"
                    className="w-full"
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .input-base {
          width: 100%;
          padding: 12px 14px;
          background: var(--elev-1);
          border: 1px solid var(--border-soft);
          border-radius: var(--radius-md);
          color: var(--text-primary);
          font-family: 'JetBrains Mono', monospace;
          font-size: 13px;
          transition: all 220ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .input-base::placeholder {
          color: var(--text-faint);
        }
        .input-base:focus {
          outline: none;
          border-color: var(--brand-cyan);
          background: var(--elev-2);
          box-shadow: 0 0 0 3px rgba(0,168,232,0.12);
        }
        .input-error {
          border-color: var(--error);
        }
        .input-error:focus {
          box-shadow: 0 0 0 3px rgba(239,68,68,0.12);
        }
      `}</style>
    </section>
  )
}
