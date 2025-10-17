import { User, Course, CourseLevel, Sponsor, Enrollment, Certificate, DiscussionRoom, ChatMessage, QuizQuestion, CareerPath } from './types';
import { HubexusLogo, TechProjectHubLogo, TruScholarLogo, AiIcon, CloudIcon, DataScienceIcon, WebDevIcon } from './components/Icons';

export const SPONSORS: Record<string, Sponsor> = {
  hubexus: { id: 1, name: 'Hubexus', logo: HubexusLogo },
  techprojecthub: { id: 2, name: 'TechProjectHub', logo: TechProjectHubLogo },
  truscholar: { id: 3, name: 'TruScholar', logo: TruScholarLogo },
};

// --- MOCK USER DATABASE FOR FIREBASE SIMULATION ---
export const MOCK_USERS_DB: Record<string, User> = {
    'student123': {
      id: 'student123',
      name: 'Alex Johnson',
      role: 'Student',
      email: 'alex@test.com',
      xp: 7500,
      streak: { current: 14, longest: 21 },
      avatarUrl: 'https://i.pravatar.cc/100?u=alex-johnson',
      interests: ['Cloud', 'DevOps', 'UX', 'UI'],
      enrolledCourseIds: [6, 2, 8],
      progress: {
        6: { completedSyllabusItems: [601, 602] }, // Completed first two items of Python course
        2: { completedSyllabusItems: [201] }, // Completed first item of Cloud course
      }
    },
    'instructor123': {
      id: 'instructor123',
      name: 'Dr. Eva Rostova',
      role: 'Instructor',
      email: 'eva@test.com',
      avatarUrl: 'https://i.pravatar.cc/100?u=eva-rostova',
    },
    'admin123': {
      id: 'admin123',
      name: 'Sys Admin',
      role: 'Admin',
      email: 'admin@test.com',
      avatarUrl: 'https://i.pravatar.cc/100?u=sys-admin',
    },
    'student456': { id: 'student456', name: 'Ben Carter', role: 'Student', email: 'ben.c@synapse.io', avatarUrl: 'https://i.pravatar.cc/100?u=ben-carter'},
    'student789': { id: 'student789', name: 'Chloe Wang', role: 'Student', email: 'chloe.w@synapse.io', avatarUrl: 'https://i.pravatar.cc/100?u=chloe-wang'},
    'instructor456': { id: 'instructor456', name: 'Johnathan Peck', role: 'Instructor', email: 'john.p@synapse.io', avatarUrl: 'https://i.pravatar.cc/100?u=john-peck'},
};

// --- DEPRECATED MOCKS (references may remain, but should be phased out for DB) ---
export const MOCK_STUDENT: User = MOCK_USERS_DB['student123'];
export const MOCK_INSTRUCTOR: User = MOCK_USERS_DB['instructor123'];
export const MOCK_ADMIN: User = MOCK_USERS_DB['admin123'];
export const MOCK_ALL_USERS: User[] = Object.values(MOCK_USERS_DB);

export const MOCK_COURSES: Course[] = [
  // Sponsored Courses
  {
    id: 1,
    title: 'AI Automation for Enterprises',
    instructor: 'Dr. Eva Rostova',
    instructorId: 'instructor123',
    sponsor: SPONSORS.hubexus,
    level: CourseLevel.Advanced,
    duration: '12 Weeks',
    rating: 4.9,
    enrollments: 1250,
    isFeatured: true,
    thumbnailUrl: 'https://picsum.photos/seed/ai-automation/400/225',
    tags: ['AI', 'Enterprise', 'Automation'],
    status: 'Published',
    description: 'A deep dive into implementing AI-driven automation solutions in large-scale business environments. Covers RPA, intelligent workflows, and machine learning model deployment.',
    syllabus: [
        { id: 101, module: 1, title: 'Introduction to Enterprise AI', description: 'Understanding the landscape of AI in business.', duration: '1 Week', contentType: 'video', contentUrl: 'https://videos.pexels.com/video-files/3214466/3214466-hd_1280_720_24fps.mp4' },
        { id: 102, module: 2, title: 'Robotic Process Automation (RPA)', description: 'Mastering UIPath and Automation Anywhere.', duration: '3 Weeks', contentType: 'video', contentUrl: 'https://videos.pexels.com/video-files/853874/853874-hd_1280_720_25fps.mp4' },
        { id: 103, module: 2, title: 'RPA Project Guide', description: 'Download the project guide for the RPA section.', duration: 'N/A', contentType: 'pdf', contentUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
        { id: 104, module: 3, title: 'Intelligent Workflow Design', description: 'Building smart, data-driven business processes.', duration: '4 Weeks', contentType: 'video', contentUrl: 'https://videos.pexels.com/video-files/3214466/3214466-hd_1280_720_24fps.mp4' },
        { id: 105, module: 4, title: 'Deploying ML Models at Scale', description: 'From training to production with MLOps.', duration: '4 Weeks', contentType: 'video', contentUrl: 'https://videos.pexels.com/video-files/853874/853874-hd_1280_720_25fps.mp4' },
    ]
  },
  {
    id: 2,
    title: 'Cloud Computing & DevOps Fundamentals',
    instructor: 'Johnathan Peck',
    instructorId: 'instructor456',
    sponsor: SPONSORS.techprojecthub,
    level: CourseLevel.Beginner,
    duration: '8 Weeks',
    rating: 4.8,
    enrollments: 3400,
    isFeatured: true,
    thumbnailUrl: 'https://picsum.photos/seed/cloud-devops/400/225',
    tags: ['Cloud', 'DevOps', 'AWS'],
    status: 'Published',
    description: 'Learn the foundational concepts of cloud computing and DevOps. This course provides hands-on experience with AWS, Docker, and CI/CD pipelines.',
    syllabus: [
        { id: 201, module: 1, title: 'Cloud Concepts (AWS)', description: 'EC2, S3, and VPC fundamentals.', duration: '2 Weeks', contentType: 'video', contentUrl: 'https://videos.pexels.com/video-files/3214466/3214466-hd_1280_720_24fps.mp4' },
        { id: 202, module: 1, title: 'AWS Cheatsheet', description: 'Key terms and services.', duration: 'N/A', contentType: 'pdf', contentUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
        { id: 203, module: 2, title: 'Containerization with Docker', description: 'Build, ship, and run applications anywhere.', duration: '2 Weeks', contentType: 'video', contentUrl: 'https://videos.pexels.com/video-files/853874/853874-hd_1280_720_25fps.mp4' },
        { id: 204, module: 3, title: 'CI/CD with Jenkins & GitHub Actions', description: 'Automating the software delivery lifecycle.', duration: '3 Weeks', contentType: 'video', contentUrl: 'https://videos.pexels.com/video-files/3214466/3214466-hd_1280_720_24fps.mp4' },
        { id: 205, module: 4, title: 'Infrastructure as Code (Terraform)', description: 'Managing cloud resources programmatically.', duration: '1 Week', contentType: 'video', contentUrl: 'https://videos.pexels.com/video-files/853874/853874-hd_1280_720_25fps.mp4' },
    ]
  },
  {
    id: 3,
    title: 'Blockchain-based Certification Systems',
    instructor: 'Maria Alverez',
    sponsor: SPONSORS.truscholar,
    level: CourseLevel.Intermediate,
    duration: '6 Weeks',
    rating: 4.9,
    enrollments: 890,
    isFeatured: true,
    thumbnailUrl: 'https://picsum.photos/seed/blockchain-certs/400/225',
    tags: ['Blockchain', 'Web3', 'Security'],
    status: 'Pending Approval',
    description: 'Explore how blockchain technology is revolutionizing credentialing. Build a decentralized application to issue and verify digital certificates.',
    syllabus: [
        { id: 301, module: 1, title: 'Blockchain & Ethereum Basics', description: 'Understanding distributed ledgers and smart contracts.', duration: '2 Weeks', contentType: 'video', contentUrl: 'https://videos.pexels.com/video-files/3214466/3214466-hd_1280_720_24fps.mp4' },
        { id: 302, module: 2, title: 'Solidity for Smart Contracts', description: 'Programming on the Ethereum Virtual Machine.', duration: '2 Weeks', contentType: 'video', contentUrl: 'https://videos.pexels.com/video-files/853874/853874-hd_1280_720_25fps.mp4' },
        { id: 303, module: 3, title: 'Building a Verifiable Credential DApp', description: 'Final project to create a certification system.', duration: '2 Weeks', contentType: 'video', contentUrl: 'https://videos.pexels.com/video-files/3214466/3214466-hd_1280_720_24fps.mp4' },
    ]
  },
  {
    id: 4,
    title: 'Project-Based Machine Learning Bootcamp',
    instructor: 'Kenji Tanaka',
    sponsor: SPONSORS.techprojecthub,
    level: CourseLevel.Intermediate,
    duration: '16 Weeks',
    rating: 4.9,
    enrollments: 2100,
    thumbnailUrl: 'https://picsum.photos/seed/ml-bootcamp/400/225',
    tags: ['Machine Learning', 'Python', 'Data Science'],
    status: 'Published',
    description: 'A hands-on bootcamp where you build a portfolio of machine learning projects, from predictive modeling to natural language processing.',
    syllabus: [
        { id: 401, module: 1, title: 'Data Cleaning and Preprocessing', description: 'Preparing data for machine learning.', duration: '3 Weeks', contentType: 'video', contentUrl: 'https://videos.pexels.com/video-files/3214466/3214466-hd_1280_720_24fps.mp4' },
        { id: 402, module: 2, title: 'Supervised Learning Models', description: 'Regression and Classification projects.', duration: '5 Weeks', contentType: 'video', contentUrl: 'https://videos.pexels.com/video-files/853874/853874-hd_1280_720_25fps.mp4' },
        { id: 403, module: 3, title: 'Unsupervised Learning', description: 'Clustering and Dimensionality Reduction.', duration: '4 Weeks', contentType: 'video', contentUrl: 'https://videos.pexels.com/video-files/3214466/3214466-hd_1280_720_24fps.mp4' },
        { id: 404, module: 4, title: 'Introduction to Deep Learning', description: 'Building neural networks with TensorFlow.', duration: '4 Weeks', contentType: 'video', contentUrl: 'https://videos.pexels.com/video-files/853874/853874-hd_1280_720_25fps.mp4' },
    ]
  },
    {
    id: 5,
    title: 'Business Intelligence with DataOps',
    instructor: 'Dr. Eva Rostova',
    instructorId: 'instructor123',
    sponsor: SPONSORS.hubexus,
    level: CourseLevel.Intermediate,
    duration: '10 Weeks',
    rating: 4.7,
    enrollments: 980,
    thumbnailUrl: 'https://picsum.photos/seed/bi-dataops/400/225',
    tags: ['BI', 'DataOps', 'Analytics'],
    status: 'Pending Approval',
    description: 'Learn how to build and manage robust data pipelines for business intelligence. This course covers data warehousing, ETL processes, and modern DataOps principles.',
    syllabus: [
        { id: 501, module: 1, title: 'Data Warehousing Concepts', description: 'Designing schemas for analytics.', duration: '2 Weeks', contentType: 'video', contentUrl: 'https://videos.pexels.com/video-files/3214466/3214466-hd_1280_720_24fps.mp4' },
        { id: 502, module: 2, title: 'ETL with Python and Airflow', description: 'Automating data extraction, transformation, and loading.', duration: '4 Weeks', contentType: 'video', contentUrl: 'https://videos.pexels.com/video-files/853874/853874-hd_1280_720_25fps.mp4' },
        { id: 503, module: 3, title: 'Data Visualization with Tableau', description: 'Creating impactful business dashboards.', duration: '3 Weeks', contentType: 'video', contentUrl: 'https://videos.pexels.com/video-files/3214466/3214466-hd_1280_720_24fps.mp4' },
        { id: 504, module: 4, title: 'DataOps Principles', description: 'CI/CD for data pipelines.', duration: '1 Week', contentType: 'video', contentUrl: 'https://videos.pexels.com/video-files/853874/853874-hd_1280_720_25fps.mp4' },
    ]
  },
  // Regular Courses
  {
    id: 6,
    title: 'Introduction to Python for Data Science',
    instructor: 'Dr. Angela Yu',
    price: 49.99,
    level: CourseLevel.Beginner,
    duration: '10 Weeks',
    rating: 4.8,
    enrollments: 15234,
    thumbnailUrl: 'https://picsum.photos/seed/python-ds/400/225',
    tags: ['Python', 'Data Science', 'Programming'],
    status: 'Published',
    description: 'The complete beginner\'s guide to Python programming for data science. Learn variables, loops, functions, and key data science libraries like Pandas and NumPy.',
    syllabus: [
        { id: 601, module: 1, title: 'Python Basics', description: 'Variables, Data Types, and Operators.', duration: '2 Weeks', contentType: 'video', contentUrl: 'https://videos.pexels.com/video-files/3214466/3214466-hd_1280_720_24fps.mp4' },
        { id: 602, module: 1, title: 'Workbook: Python Basics', description: 'Practice exercises for module 1.', duration: 'N/A', contentType: 'pdf', contentUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
        { id: 603, module: 2, title: 'Control Flow', description: 'Loops and Conditional Statements.', duration: '2 Weeks', contentType: 'video', contentUrl: 'https://videos.pexels.com/video-files/853874/853874-hd_1280_720_25fps.mp4' },
        { id: 604, module: 3, title: 'Data Structures', description: 'Lists, Dictionaries, and Tuples.', duration: '2 Weeks', contentType: 'video', contentUrl: 'https://videos.pexels.com/video-files/3214466/3214466-hd_1280_720_24fps.mp4' },
        { id: 605, module: 4, title: 'Intro to Pandas & NumPy', description: 'Manipulating and analyzing data.', duration: '4 Weeks', contentType: 'video', contentUrl: 'https://videos.pexels.com/video-files/853874/853874-hd_1280_720_25fps.mp4' },
    ]
  },
  {
    id: 7,
    title: 'Advanced React & TypeScript',
    instructor: 'Maximilian Schwarzmüller',
    price: 99.99,
    level: CourseLevel.Advanced,
    duration: '15 Weeks',
    rating: 4.9,
    enrollments: 8750,
    thumbnailUrl: 'https://picsum.photos/seed/react-ts/400/225',
    tags: ['React', 'TypeScript', 'Web Development'],
    status: 'Published',
    description: 'Take your React skills to the next level. This course covers advanced patterns, state management with Redux Toolkit, performance optimization, and building large-scale applications with TypeScript.',
    syllabus: [
        { id: 701, module: 1, title: 'TypeScript for React Devs', description: 'Mastering types, interfaces, and generics.', duration: '3 Weeks', contentType: 'video', contentUrl: 'https://videos.pexels.com/video-files/3214466/3214466-hd_1280_720_24fps.mp4' },
        { id: 702, module: 2, title: 'Advanced Hooks & Patterns', description: 'Custom hooks, render props, and HOCs.', duration: '4 Weeks', contentType: 'video', contentUrl: 'https://videos.pexels.com/video-files/853874/853874-hd_1280_720_25fps.mp4' },
        { id: 703, module: 3, title: 'State Management with Redux Toolkit', description: 'Efficient and scalable state management.', duration: '4 Weeks', contentType: 'video', contentUrl: 'https://videos.pexels.com/video-files/3214466/3214466-hd_1280_720_24fps.mp4' },
        { id: 704, module: 4, title: 'Performance Optimization', description: 'Memoization, code splitting, and profiling.', duration: '4 Weeks', contentType: 'video', contentUrl: 'https://videos.pexels.com/video-files/853874/853874-hd_1280_720_25fps.mp4' },
    ]
  },
  {
    id: 8,
    title: 'UX/UI Design Foundations',
    instructor: 'Dr. Eva Rostova',
    instructorId: 'instructor123',
    price: 29.99,
    level: CourseLevel.Beginner,
    duration: '6 Weeks',
    rating: 4.7,
    enrollments: 11500,
    thumbnailUrl: 'https://picsum.photos/seed/ux-ui/400/225',
    tags: ['UX', 'UI', 'Design'],
    status: 'Draft',
    description: 'Learn the fundamentals of User Experience (UX) and User Interface (UI) design. This course covers design thinking, wireframing, prototyping, and user testing.',
     syllabus: [
        { id: 801, module: 1, title: 'The Design Thinking Process', description: 'Empathize, Define, Ideate, Prototype, Test.', duration: '1 Week', contentType: 'video', contentUrl: 'https://videos.pexels.com/video-files/3214466/3214466-hd_1280_720_24fps.mp4' },
        { id: 802, module: 2, title: 'User Research & Personas', description: 'Understanding your users.', duration: '1 Week', contentType: 'video', contentUrl: 'https://videos.pexels.com/video-files/853874/853874-hd_1280_720_25fps.mp4' },
        { id: 803, module: 2, title: 'Persona Template', description: 'Download the template to create user personas.', duration: 'N/A', contentType: 'pdf', contentUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
        { id: 804, module: 3, title: 'Wireframing & Prototyping in Figma', description: 'From low-fidelity sketches to interactive prototypes.', duration: '3 Weeks', contentType: 'video', contentUrl: 'https://videos.pexels.com/video-files/3214466/3214466-hd_1280_720_24fps.mp4' },
        { id: 805, module: 4, title: 'Usability Testing', description: 'Validating your designs with real users.', duration: '1 Week', contentType: 'video', contentUrl: 'https://videos.pexels.com/video-files/853874/853874-hd_1280_720_25fps.mp4' },
    ]
  },
];

export const MOCK_ENROLLMENTS: Enrollment[] = MOCK_USERS_DB['student123'].enrolledCourseIds!.map((id, index) => ({
    courseId: id,
    progress: [75, 40, 15][index]
}));

export const MOCK_CERTIFICATES: Certificate[] = [
    {
        id: 'cert-101-py',
        courseTitle: 'Introduction to Python for Data Science',
        studentName: MOCK_STUDENT.name,
        instructorName: 'Dr. Angela Yu',
        issueDate: '2023-11-15',
        qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=SYNAPSE-CERT-101-PY'
    },
    {
        id: 'cert-202-bc',
        courseTitle: 'Blockchain-based Certification Systems',
        studentName: MOCK_STUDENT.name,
        instructorName: 'Maria Alverez',
        issueDate: '2024-02-20',
        qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=SYNAPSE-CERT-202-BC',
        sponsor: SPONSORS.truscholar
    }
];

export const MOCK_ROOMS: DiscussionRoom[] = [
    { id: 'room-ai', name: 'AI & Machine Learning', category: 'Interest', description: 'Discuss the latest in AI, from LLMs to computer vision.', members: 1280, icon: AiIcon },
    { id: 'room-cloud', name: 'Cloud Engineering', category: 'Interest', description: 'All things AWS, Azure, GCP, and DevOps.', members: 950, icon: CloudIcon },
    { id: 'room-ds', name: 'Data Science Hub', category: 'Subject', description: 'For aspiring and professional data scientists.', members: 2100, icon: DataScienceIcon },
    { id: 'room-webdev', name: 'Full-Stack Devs', category: 'Course', description: 'Discussions for the Advanced Web Engineering course.', members: 450, icon: WebDevIcon }
];

export const MOCK_CHAT_MESSAGES: ChatMessage[] = [
    { id: 1, user: { name: 'Ben Carter', avatarUrl: 'https://i.pravatar.cc/40?u=ben-carter' }, text: 'Has anyone tried fine-tuning the latest Llama 3 model for a specific task? Curious about performance.', timestamp: '10:32 AM', isOwn: false },
    { id:2, user: { name: 'Alex Johnson', avatarUrl: MOCK_STUDENT.avatarUrl }, text: 'I was just looking into that! I think using LoRA is the way to go. The resource overhead is much lower.', timestamp: '10:34 AM', isOwn: true },
    { id: 3, user: { name: 'Chloe Wang', avatarUrl: 'https://i.pravatar.cc/40?u=chloe-wang' }, text: 'Agreed. @Ben, there are some great papers on arXiv about parameter-efficient fine-tuning. I can share some links.', timestamp: '10:35 AM', isOwn: false },
    { id: 4, user: { name: 'Ben Carter', avatarUrl: 'https://i.pravatar.cc/40?u=ben-carter' }, text: 'That would be awesome, thanks Chloe!', timestamp: '10:36 AM', isOwn: false },
];

export const MOCK_AI_QUIZ: QuizQuestion[] = [
    {
        question: 'In React, what is the primary purpose of a "key" prop when rendering a list of elements?',
        options: [
            'To style the element uniquely.',
            'To provide a stable identity for elements, helping React identify which items have changed, are added, or are removed.',
            'To use as a reference for event handlers.',
            'To set the HTML "key" attribute.'
        ],
        correctAnswer: 'To provide a stable identity for elements, helping React identify which items have changed, are added, or are removed.'
    },
    {
        question: 'Which TypeScript feature allows you to create a new type from a union of several types?',
        options: [
            'Interface',
            'Enum',
            'Union Type (|)',
            'Generic'
        ],
        correctAnswer: 'Union Type (|)'
    }
];

export const MOCK_AI_CAREER_PATH: CareerPath = {
    title: 'Frontend Developer',
    description: 'A guided path to becoming a job-ready Frontend Developer, focusing on modern web technologies and best practices.',
    avgSalary: '$95,000/year',
    demand: 'High',
    learningPath: [
        { step: 1, title: 'UX/UI Design Foundations', courseId: 8, duration: '6 Weeks' },
        { step: 2, title: 'Advanced React & TypeScript', courseId: 7, duration: '15 Weeks' },
        { step: 3, title: 'Cloud Computing & DevOps Fundamentals', courseId: 2, duration: '8 Weeks' },
    ]
};