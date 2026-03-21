// ── Portfolio Data ─────────────────────────────────────────────

export const PERSONAL = {
  name: 'Nilesh Kanti',
  role: 'Computer Science Engineer | AI & Systems Builder',
  tagline: 'Building scalable systems, AI-driven products, and data-powered solutions.',
  email: 'kantinilesh2312@gmail.com',
  location: 'India',
  bio: [
    'Computer Science undergraduate with deep expertise in software development, cloud technologies, and data analytics. I thrive at the intersection of engineering and intelligence — building systems that scale, adapt, and deliver measurable impact.',
    'From designing scalable APIs and event-driven architectures to crafting AI models that detect anomalies with 85% accuracy — every project I take on is shipped with precision and purpose.',
  ],
};

export const STATS = [
  { label: 'Projects Shipped', value: '10+' },
  { label: 'Technologies', value: '20+' },
  { label: 'Records Processed', value: '100K+' },
  { label: 'Efficiency Gained', value: '25%' },
];

export const ABOUT_EXPERTISE = [
  { title: 'Scalable Systems', description: 'APIs, event-driven architecture, microservices' },
  { title: 'AI & Machine Learning', description: 'Anomaly detection, NLP, computer vision' },
  { title: 'Cloud & DevOps', description: 'AWS, Docker, CI/CD, infrastructure as code' },
  { title: 'Data Analytics', description: 'Dashboards, large-scale processing, KPI tracking' },
];

export const SKILLS = [
  { category: 'Languages', items: ['Python', 'Java', 'SQL', 'C++'], color: '#E52521' },
  { category: 'Backend', items: ['REST APIs', 'Event-Driven Systems', 'Microservices'], color: '#43B047' },
  { category: 'Frameworks', items: ['Spring Boot', 'Flask', 'FastAPI', 'React'], color: '#049CD8' },
  { category: 'Databases', items: ['PostgreSQL', 'MySQL', 'DynamoDB', 'MongoDB'], color: '#FFD700' },
  { category: 'Cloud', items: ['AWS EC2', 'S3', 'Lambda', 'RDS', 'Azure', 'Docker'], color: '#FFA500' },
  { category: 'Data / ML', items: ['Pandas', 'NumPy', 'Scikit-learn', 'TensorFlow'], color: '#FFFFFF' },
];

export const EXPERIENCE = [
  {
    id: 1,
    role: 'Data & Software Intern',
    company: 'SRM Technologies',
    period: '2024 – 2025',
    description: 'Engineered data pipelines and dashboards that transformed how the team tracks performance.',
    highlights: [
      'Improved onboarding efficiency by 25%',
      'Built dashboards tracking 20+ KPIs in real-time',
      'Processed 100K+ records/day through automated pipelines',
      'Reduced client-reported issues by 30%',
    ],
    tech: ['Python', 'SQL', 'AWS', 'Tableau'],
    boss: 'Data Dragon',
  },
  {
    id: 2,
    role: 'AI Intern',
    company: 'Indian Oil Corporation (IOCL)',
    period: '2024',
    description: 'Built intelligent systems for one of India\'s largest public sector enterprises.',
    highlights: [
      'Developed Digital Shift Handover System',
      'Achieved ~85% accuracy in anomaly detection',
      'Reduced manual reporting effort by ~20%',
    ],
    tech: ['Python', 'TensorFlow', 'Flask', 'PostgreSQL'],
    boss: 'AI Overlord',
  },
];

export const PROJECTS = [
  {
    id: 1,
    level: '1-1',
    title: 'InvenX',
    description: 'AI-powered inventory management platform with demand forecasting and logistics optimization.',
    metrics: ['18% forecast accuracy improvement', '12% logistics cost reduction'],
    tech: ['Python', 'ML', 'Flask', 'PostgreSQL'],
    image: '/images/invenx.png',
    github: 'https://github.com/kantinilesh/InvenX',
  },
  {
    id: 2,
    level: '1-2',
    title: 'ClimaShield',
    description: 'AI-driven climate risk scoring platform with Telegram bot integration and blockchain-based parametric insurance.',
    metrics: ['Real-time risk scoring', 'Blockchain payout automation'],
    tech: ['Python', 'Blockchain', 'Telegram API', 'Weather API'],
    image: '/images/climashield.png',
    github: 'https://github.com/kantinilesh/ClimaShield',
  },
  {
    id: 3,
    level: '2-1',
    title: 'AI Fitness Coach',
    description: 'Real-time posture correction system using computer vision with AI-powered voice feedback for workout guidance.',
    metrics: ['Real-time posture correction', 'AI voice feedback system'],
    tech: ['Python', 'OpenCV', 'MediaPipe', 'TTS'],
    image: '/images/fitness.png',
    github: 'https://github.com/kantinilesh/AI-Fitness-Coach',
  },
];

export const ACHIEVEMENTS = [
  { icon: '🏆', title: 'National GenAI Hackathon', description: 'Winner — NIT Andhra Pradesh', shine: '#FFD700' },
  { icon: '🥈', title: 'Codefest Chennai', description: 'Runner-up', shine: '#C0C0C0' },
  { icon: '☁️', title: 'AWS Community Builder', description: 'Recognized by Amazon Web Services', shine: '#FF9900' },
];

export const SOCIALS = [
  { label: 'GitHub', url: 'https://github.com/kantinilesh' },
  { label: 'LinkedIn', url: 'https://linkedin.com/in/nileshkanti' },
  { label: 'Email', url: 'mailto:kantinilesh2312@gmail.com' },
];
