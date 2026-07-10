import { motion } from 'framer-motion'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { projects as rawProjects } from '../../data/projects'
import { ProjectShowcase } from './ProjectShowcase'
import { WinDropPreview } from './previews/WinDropPreview'
import { ChatllyPreview } from './previews/ChatllyPreview'
import { CamporaPreview } from './previews/CamporaPreview'
import { staggerParent } from '../../styles/motion'

const projects = rawProjects.map((p) => {
  if (p.id === 'winsdrop') return { ...p, preview: WinDropPreview }
  if (p.id === 'chatlly') return { ...p, preview: ChatllyPreview }
  if (p.id === 'campora') return { ...p, preview: CamporaPreview }
  return p
})

export const Projects = () => {
  return (
    <section id="projects" className="section">
      <div className="container-x">
        <SectionHeading
          eyebrow="// portfolio"
          title={
            <>
              Selected <span className="gradient-text">projects</span>
            </>
          }
          description="Three flagship products — peer-to-peer file transfer, real-time chat, and a full-stack campus platform. Each preview is interactive."
        />

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="space-y-24 lg:space-y-32"
        >
          {projects.map((p, i) => (
            <div key={p.id} className={i === 0 ? 'mt-20 lg:mt-28' : ''}>
              <ProjectShowcase project={p} reverse={i % 2 === 1} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
