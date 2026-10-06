export const projects = [
  {
    slug: 'certificate-studio',
    name: 'CERTIFICATE STUDIO',
    description: 'A certificate automation application designed to simplify event certificate generation and distribution.',
    technologies: ['React', 'FastAPI', 'SQLite', 'AWS', 'Gmail SMTP'],
    category: 'Automation',
    builders: ['SBG Community Team'],
    github: '#',
    demo: '#',
    featured: true,
    status: 'Live AWS Deployment',
    flow: ['FORM / ATTENDEES', 'CERTIFICATE STUDIO', 'GENERATE PDF', 'EMAIL']
  },
  {
    slug: 'cloud-portfolio',
    name: 'Cloud Portfolio Builder',
    description: 'A project that helps students document their learning journey, technical experiments, and cloud growth milestones.',
    technologies: ['React', 'Tailwind CSS', 'AWS S3'],
    category: 'Portfolio',
    builders: ['Student Builders'],
    github: '#',
    demo: '#',
    featured: false,
    status: 'In development',
    flow: ['IDEA', 'PORTFOLIO', 'SHOWCASE', 'LEARN']
  },
  {
    slug: 'campus-resource-hub',
    name: 'Campus Resource Hub',
    description: 'A centralised platform for discovering student resources, events, study materials, and technical community updates.',
    technologies: ['React', 'Node.js', 'REST API'],
    category: 'Community',
    builders: ['SBG Tech Team'],
    github: '#',
    demo: '#',
    featured: false,
    status: 'Prototype',
    flow: ['DISCOVER', 'RESOURCE HUB', 'ACCESS', 'GROW']
  }
]
