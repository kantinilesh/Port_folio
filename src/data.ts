// ── JARVIS Portfolio Data ──────────────────────────────────────

export const PERSONAL = {
  name: 'Nilesh Kanti',
  role: 'AI Systems Engineer | Data & Cloud Developer',
  tagline: 'Building scalable systems, AI-driven platforms, and data intelligence solutions.',
  email: 'kantinilesh2312@gmail.com',
  location: 'India',
  bio: [
    'Computer Science undergraduate with deep expertise in software development, cloud technologies, and data analytics.',
    'I operate at the intersection of AI engineering, scalable systems, and real-world data infrastructure — building things that solve measurable problems.',
  ],
  stats: [
    { label: 'Projects Shipped', value: '10+' },
    { label: 'Technologies', value: '20+' },
    { label: 'Records / Day', value: '100K+' },
    { label: 'Efficiency Gain', value: '25%' },
  ],
};

export const NAV_MODULES = [
  { id: 'hero', label: 'SYSTEM CORE' },
  { id: 'about', label: 'CORE SYSTEM' },
  { id: 'skills', label: 'DATA ENGINE' },
  { id: 'experience', label: 'DEPLOY LOGS' },
  { id: 'projects', label: 'SIMULATIONS' },
  { id: 'achievements', label: 'SYS STATUS' },
  { id: 'contact', label: 'TERMINAL' },
] as const;

export const SKILLS = [
  {
    category: 'LANGUAGES',
    items: [
      { name: 'Python', icon: 'https://cdn.simpleicons.org/python/white' },
      { name: 'Java', icon: 'https://cdn.simpleicons.org/openjdk/white' },
      { name: 'SQL', icon: 'https://cdn.simpleicons.org/postgresql/white' },
      { name: 'C++', icon: 'https://cdn.simpleicons.org/cplusplus/white' },
    ],
    status: 'ACTIVE',
  },
  {
    category: 'BACKEND',
    items: [
      { name: 'REST APIs', icon: 'https://cdn.simpleicons.org/fastapi/white' },
      { name: 'Event-Driven', icon: 'https://cdn.simpleicons.org/apachekafka/white' },
      { name: 'Microservices', icon: 'https://cdn.simpleicons.org/kubernetes/white' },
    ],
    status: 'ACTIVE',
  },
  {
    category: 'FRAMEWORKS',
    items: [
      { name: 'Spring Boot', icon: 'https://cdn.simpleicons.org/spring/white' },
      { name: 'Flask', icon: 'https://cdn.simpleicons.org/flask/white' },
      { name: 'FastAPI', icon: 'https://cdn.simpleicons.org/fastapi/white' },
      { name: 'React', icon: 'https://cdn.simpleicons.org/react/white' },
    ],
    status: 'LOADED',
  },
  {
    category: 'DATABASES',
    items: [
      { name: 'PostgreSQL', icon: 'https://cdn.simpleicons.org/postgresql/white' },
      { name: 'MySQL', icon: 'https://cdn.simpleicons.org/mysql/white' },
      { name: 'DynamoDB', icon: 'https://cdn.simpleicons.org/amazondynamodb/white' },
      { name: 'MongoDB', icon: 'https://cdn.simpleicons.org/mongodb/white' },
    ],
    status: 'ACTIVE',
  },
  {
    category: 'CLOUD',
    items: [
      { name: 'AWS', icon: 'https://cdn.simpleicons.org/amazonwebservices/white' },
      { name: 'Azure', icon: 'https://cdn.simpleicons.org/microsoftazure/white' },
      { name: 'Docker', icon: 'https://cdn.simpleicons.org/docker/white' },
      { name: 'Lambda', icon: 'https://cdn.simpleicons.org/awslambda/white' },
    ],
    status: 'ACTIVE',
  },
  {
    category: 'DATA / ML',
    items: [
      { name: 'Pandas', icon: 'https://cdn.simpleicons.org/pandas/white' },
      { name: 'NumPy', icon: 'https://cdn.simpleicons.org/numpy/white' },
      { name: 'Scikit-learn', icon: 'https://cdn.simpleicons.org/scikitlearn/white' },
      { name: 'TensorFlow', icon: 'https://cdn.simpleicons.org/tensorflow/white' },
    ],
    status: 'LOADED',
  },
];

export const EXPERIENCE = [
  {
    id: 'srm',
    company: 'SRM Technologies',
    role: 'Data & Software Intern',
    period: '2024 – 2025',
    logs: [
      '[INFO] Improved onboarding efficiency by 25%',
      '[INFO] Built dashboards tracking 20+ KPIs in real-time',
      '[INFO] Processed 100K+ records/day through automated pipelines',
      '[SUCCESS] Reduced client-reported issues by 30%',
    ],
    tech: ['Python', 'SQL', 'AWS', 'Tableau'],
  },
  {
    id: 'iocl',
    company: 'Indian Oil Corporation (IOCL)',
    role: 'AI Intern',
    period: '2024',
    logs: [
      '[INFO] Developed Digital Shift Handover System',
      '[INFO] Achieved ~85% accuracy in anomaly detection',
      '[SUCCESS] Reduced manual reporting effort by ~20%',
    ],
    tech: ['Python', 'TensorFlow', 'Flask', 'PostgreSQL'],
  },
];

export const PROJECTS = [
  {
    id: 1,
    codename: 'SIM-001',
    title: 'InvenX',
    subtitle: 'AI Inventory Intelligence System',
    description: 'AI-powered inventory management platform with demand forecasting and logistics optimization using machine learning pipelines.',
    metrics: [
      { label: 'Forecast Accuracy', value: '+18%' },
      { label: 'Logistics Cost', value: '-12%' },
    ],
    tech: ['Python', 'ML', 'Flask', 'PostgreSQL'],
    status: 'DEPLOYED',
    github: 'https://github.com/kantinilesh/InvenX',
  },
  {
    id: 2,
    codename: 'SIM-002',
    title: 'ClimaShield',
    subtitle: 'Climate Risk AI Platform',
    description: 'AI-driven climate risk scoring platform with Telegram bot integration and blockchain-based parametric insurance automation.',
    metrics: [
      { label: 'Risk Scoring', value: 'Real-time' },
      { label: 'Payout Automation', value: 'Blockchain' },
    ],
    tech: ['Python', 'Blockchain', 'Telegram API', 'Weather API'],
    status: 'DEPLOYED',
    github: 'https://github.com/kantinilesh/ClimaShield',
  },
  {
    id: 3,
    codename: 'SIM-003',
    title: 'AI Fitness Coach',
    subtitle: 'Real-time Posture Intelligence',
    description: 'Real-time posture correction system using computer vision and AI-powered voice feedback for intelligent workout guidance.',
    metrics: [
      { label: 'Posture Analysis', value: 'Real-time' },
      { label: 'AI Voice Feedback', value: 'Active' },
    ],
    tech: ['Python', 'OpenCV', 'MediaPipe', 'TTS'],
    status: 'ACTIVE',
    github: 'https://github.com/kantinilesh/AI-Fitness-Coach',
  },
];

export const ACHIEVEMENTS = [
  {
    code: 'ACH-01',
    title: 'National GenAI Hackathon',
    result: 'WINNER',
    org: 'NIT Andhra Pradesh',
    year: '2024',
    color: '#00d4ff',
  },
  {
    code: 'ACH-02',
    title: 'Codefest Chennai',
    result: 'RUNNER-UP',
    org: 'Codefest',
    year: '2024',
    color: '#0080ff',
  },
  {
    code: 'ACH-03',
    title: 'AWS Community Builder',
    result: 'RECOGNIZED',
    org: 'Amazon Web Services',
    year: '2024',
    color: '#00c4a0',
  },
];

export const SOCIALS = [
  { label: 'GitHub', url: 'https://github.com/kantinilesh', icon: 'https://cdn.simpleicons.org/github/white' },
  { label: 'LinkedIn', url: 'https://linkedin.com/in/nileshkanti', icon: 'https://cdn.simpleicons.org/linkedin/white' },
  { label: 'Email', url: 'mailto:kantinilesh2312@gmail.com', icon: 'https://cdn.simpleicons.org/gmail/white' },
];
