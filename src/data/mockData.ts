export interface Expert {
  id: string;
  name: string;
  role: string;
  company: string;
  category: 'ai' | 'cloud' | 'architecture' | 'leadership';
  categoryLabel: string;
  expertise: string;
  topics: string[];
  availability: string;
  format: string;
  image: string;
  bio: string;
  experience: string;
}

export interface Engagement {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  audience: string;
  image: string;
  highlights: string[];
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  institution: string;
  avatar: string;
  quote: string;
  sessionType: string;
  studentsAttended: number;
}

export interface Article {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  date: string;
  image: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const EXPERTS_DATA: Expert[] = [
  {
    id: 'rohit-mishra',
    name: 'Rohit Mishra',
    role: 'Principal AI Scientist',
    company: 'Leading AI Lab / ex-Amazon',
    category: 'ai',
    categoryLabel: 'AI & Data Science',
    expertise: 'Large Language Models & GenAI in Production',
    topics: ['LLM Orchestration', 'RAG Architectures', 'AI Agents at Scale'],
    availability: 'Next: Oct 28',
    format: 'Offline & Virtual',
    image: '/images/expert-rohit.jpg',
    bio: '14+ years building large-scale ML systems and recommendation engines. Passionate about bringing production ML engineering to campus.',
    experience: '14+ Years Exp'
  },
  {
    id: 'priya-subramanian',
    name: 'Priya Subramanian',
    role: 'VP of Engineering',
    company: 'Fintech Unicorn',
    category: 'leadership',
    categoryLabel: 'Leadership & Eng',
    expertise: 'Distributed Systems & Scaling Teams',
    topics: ['Microservices at Scale', 'High-Throughput Payments', 'Engineering Career Ladders'],
    availability: 'Next: Nov 04',
    format: 'Offline / Keynote',
    image: '/images/expert-priya.jpg',
    bio: 'Leads engineering for 40M+ active users. Mentored 500+ student engineers across top universities.',
    experience: '16+ Years Exp'
  },
  {
    id: 'vikram-anand',
    name: 'Vikram Anand',
    role: 'Staff Systems Architect',
    company: 'Cloud Infrastructure Corp',
    category: 'cloud',
    categoryLabel: 'Cloud & DevOps',
    expertise: 'Kubernetes, Cloud Native & Observability',
    topics: ['Kubernetes Internals', 'Zero-Downtime Deployments', 'SRE Practices'],
    availability: 'Next: Nov 10',
    format: 'Workshop / Offline',
    image: '/images/expert-vikram.jpg',
    bio: 'Author of widely adopted open-source tools. Has delivered 40+ hands-on bootcamps for student developers.',
    experience: '12+ Years Exp'
  },
  {
    id: 'sneha-kapoor',
    name: 'Sneha Kapoor',
    role: 'Head of Product & Data',
    company: 'Global HealthTech',
    category: 'architecture',
    categoryLabel: 'Product & Architecture',
    expertise: 'Data Products & System Design',
    topics: ['Product Roadmapping for Engineers', 'Data Governance', 'Designing for Millions'],
    availability: 'Next: Nov 18',
    format: 'Virtual & Offline',
    image: '/images/expert-sneha.jpg',
    bio: 'Specializes in bridging business goals with technical architecture. Regular speaker at international tech symposiums.',
    experience: '11+ Years Exp'
  }
];

export const ENGAGEMENTS_DATA: Engagement[] = [
  {
    id: 'guest-lectures',
    title: 'Guest Lectures',
    subtitle: 'Expert Masterclasses',
    description: 'Specialized 90-120 minute sessions bringing current industry blueprints, technology transitions, and architectural trade-offs to the lecture hall.',
    duration: '90 - 120 mins',
    audience: 'Entire Batch / Department',
    image: '/images/engagement-lecture.jpg',
    highlights: ['Live case studies from production', 'Deep Q&A session with students', 'Interactive presentation & resources']
  },
  {
    id: 'workshops',
    title: 'Hands-on Workshops',
    subtitle: 'Deep-Dive Labs',
    description: 'Immersive half-day or full-day coding bootcamps where students write code, build production pipelines, and deploy live applications.',
    duration: '4 - 8 hours',
    audience: 'Lab batches (40-80 students)',
    image: '/images/engagement-workshop.jpg',
    highlights: ['Hands-on coding exercises', 'Toolchains: Docker, K8s, PyTorch', 'Certificate of workshop completion']
  },
  {
    id: 'industry-talks',
    title: 'Industry Talks',
    subtitle: 'Symposium Keynotes',
    description: 'Inspirational keynotes for college tech fests, national conferences, and departmental symposiums on the future of tech, AI, and industry disruption.',
    duration: '45 - 60 mins',
    audience: 'Auditorium (200 - 1,000+)',
    image: '/images/engagement-talks.jpg',
    highlights: ['Visionary tech trends', 'Executive leadership perspective', 'Q&A on industry shifts']
  },
  {
    id: 'mentorship',
    title: 'Career & Mentorship',
    subtitle: 'Placement Readiness',
    description: 'Targeted resume reviews, technical mock interviews, and career roadmap strategy sessions to prepare pre-final and final-year students for dream roles.',
    duration: 'Half-Day / Cohort',
    audience: 'Pre-final & Final year',
    image: '/images/engagement-mentorship.jpg',
    highlights: ['1-on-1 portfolio feedback', 'System design interview tips', 'High-growth career navigation']
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 'nit-sharma',
    author: 'Dr. K. R. Sharma',
    role: 'Dean of Academic Affairs',
    institution: 'National Institute of Technology',
    avatar: '/images/expert-rohit.jpg',
    quote: 'The guest lecture on system architecture truly enlightened our final-year CS & AI students. The coordination from Ctrl + Data + Grow was seamless and professional, bringing a level of practical depth our students rarely encounter in standard textbooks.',
    sessionType: 'Advanced Cloud Architectures Guest Lecture',
    studentsAttended: 320
  },
  {
    id: 'vit-verma',
    author: 'Prof. S. Verma',
    role: 'Head of Placement & Training',
    institution: 'Vellore Institute of Technology',
    avatar: '/images/expert-vikram.jpg',
    quote: 'Having senior engineering leaders from top product companies interact directly with our students elevated their confidence tremendously. Our placement numbers in top-tier tech roles saw an immediate qualitative improvement.',
    sessionType: 'Hands-on Microservices & Placement Mentorship',
    studentsAttended: 480
  },
  {
    id: 'bits-rao',
    author: 'Dr. Ananya Rao',
    role: 'Faculty Coordinator, IEEE Chapter',
    institution: 'BITS Pilani',
    avatar: '/images/expert-priya.jpg',
    quote: 'Ctrl + Data + Grow bridged the exact gap we were struggling with: matching the university syllabus with modern industry frameworks. Their responsiveness and speaker quality are truly best-in-class.',
    sessionType: 'Generative AI & LLM Systems Weekend Workshop',
    studentsAttended: 240
  }
];

export const ARTICLES_DATA: Article[] = [
  {
    id: 'article-1',
    category: 'CAMPUS EVENTS',
    title: 'How to conduct a successful hackathon in your college',
    excerpt: 'Step-by-step guide for student coordinators and faculty on problem-statement design, industry sponsorship, and judge panels.',
    readTime: '5 min read',
    date: 'Oct 2026',
    image: '/images/article-hackathon.jpg'
  },
  {
    id: 'article-2',
    category: 'STUDENT SUCCESS',
    title: 'Benefits of industry guest lectures for engineering students',
    excerpt: 'Why direct exposure to real-world codebases and senior practitioner insights accelerates student career trajectory by 2x.',
    readTime: '4 min read',
    date: 'Sep 2026',
    image: '/images/article-lecture.jpg'
  },
  {
    id: 'article-3',
    category: 'FUTURE TECH',
    title: 'Top technology skills & workshops to explore in 2026',
    excerpt: 'A comprehensive review of what top tech companies seek today: agentic AI, distributed systems, platform engineering, and modern data stacks.',
    readTime: '6 min read',
    date: 'Aug 2026',
    image: '/images/article-tech.jpg'
  }
];

export const FAQ_DATA: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'How can colleges invite an expert through Ctrl + Data + Grow?',
    answer: 'Simply share your requirements using our session planning tool or contact form. Specify your desired domain, preferred dates, and student batch. Our team matches you with vetted industry experts and handles all alignment, logistics, and presentation prep.'
  },
  {
    id: 'faq-2',
    question: 'How are the industry experts verified?',
    answer: 'All speakers on Ctrl + Data + Grow are seasoned practitioners with verified track records at leading technology firms, unicorns, or research labs. Each expert undergoes pedigree verification and pedagogical screening to guarantee engaging, high-impact sessions.'
  },
  {
    id: 'faq-3',
    question: 'What types of events and programs can we host?',
    answer: 'We support 90-minute guest lectures, half-day or multi-day hands-on workshops, tech symposium keynotes, faculty development programs (FDP), hackathon mentorship, and campus placement masterclasses.'
  },
  {
    id: 'faq-4',
    question: 'Do you offer both online and offline sessions?',
    answer: 'Yes! We coordinate both on-campus in-person lectures across major university hubs in India, as well as interactive live virtual webinars with screen sharing, coding labs, and live Q&A.'
  },
  {
    id: 'faq-5',
    question: 'How does the pricing and booking process work?',
    answer: 'We offer flexible institutional packages based on event type, session length, and whether it is virtual or on-campus. We work within university departmental budgets and provide transparent institutional invoices.'
  },
  {
    id: 'faq-6',
    question: 'How can an industry leader become a speaker?',
    answer: 'Experienced professionals can apply to join our curated roster of speakers by clicking "Partner with us" or selecting "Join as Expert". Our academic council reviews profiles and aligns them with upcoming campus requirements.'
  }
];

export const INSTITUTIONS = [
  { name: 'SRM University', tag: 'SRM' },
  { name: 'GITAM University', tag: 'GITAM' },
  { name: 'VIIT College', tag: 'VIIT' },
  { name: 'VIT Vellore', tag: 'VIT' },
  { name: 'IIT Delhi', tag: 'IITD' },
  { name: 'IIT Bombay', tag: 'IITB' },
  { name: 'BITS Pilani', tag: 'BITS' },
  { name: 'NIT Trichy', tag: 'NITT' },
  { name: 'IIIT Hyderabad', tag: 'IIITH' },
  { name: 'Manipal Academy', tag: 'MAHE' },
  { name: 'RV College of Engg', tag: 'RVCE' },
  { name: 'PSG Tech Coimbatore', tag: 'PSG' },
  { name: 'Thapar University', tag: 'TIET' },
  { name: 'COEP Tech University', tag: 'COEP' },
];
