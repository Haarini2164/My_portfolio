// All portfolio copy lives here. Edit text without touching component code.

export const hero = {
  tagline:                   'M.TECH INTEGRATED · DATA SCIENCE ENGINEERING',
  nameLine1: 'HAARINI',
  nameLine2: 'SK',
  subtitle:
    'Designing data pipelines, machine learning models, and analytical systems that convert raw data into reliable outcomes.',
  meta: 'Final-year M.Tech Integrated, Data Science Engineering — VIT Vellore',
  ctaPrimary: { label: 'View Projects', href: '#projects' },
  ctaSecondary: { label: 'Download Resume', href: '/resume.pdf' },
};

export const about = {
  eyebrow: 'About',
  heading: 'Turning Data Into Decisions.',
  paragraphs: [
    'I am Haarini SK, a final-year M.Tech Integrated student specializing in Data Science Engineering at Vellore Institute of Technology, Vellore.',
    'My work centers on building end-to-end machine learning systems — from data preprocessing and feature engineering to model development and evaluation. Through academic projects and research contributions, I have built a working foundation in Python, SQL, statistical modeling, and applied machine learning, with hands-on experience across TensorFlow, Scikit-learn, PyTorch, and OpenCV.',
    'Alongside the technical work, I bring a design background in Graphic Design and UI/UX, which shapes how I structure outputs — not just models that perform well, but interfaces and systems that are interpretable and usable by the people relying on them.',
    'I work effectively in cross-functional settings, translating model behavior and technical constraints into terms that non-technical stakeholders can act on. I maintain this through continuous skill development — coursework, certifications, hackathons, and applied projects in data science and machine learning.',
    'As I move into placement season, my focus is on strengthening core data structures and algorithms while extending my project work into deployable, production-oriented systems.',
  ],
  scrubText:
    "I'm a final-year M.Tech Integrated student specializing in Data Science Engineering at VIT Vellore. I build end-to-end machine learning systems — from data preprocessing and feature engineering to model development and evaluation — with hands-on experience across Python, TensorFlow, Scikit-learn, PyTorch, and OpenCV. Alongside the technical work, I bring a design background in UI/UX and Graphic Design, which shapes how I structure outputs into systems that are interpretable and usable, not just accurate. Let's build something meaningful with data!",
};

export const stats = [
  { value: '7.97', label: 'CGPA' },
  { value: '4+', label: 'Years Learning & Building' },
  { value: '4', label: 'Core ML/DS Projects' },
  { value: '100+', label: 'LeetCode Problems Solved' },
  { value: '2027', label: 'Graduating Batch' },
];

export const skillGroups = [
  {
    category: 'Languages',
    items: ['Python', 'SQL', 'C++', 'Java'],
  },
  {
    category: 'Machine Learning & Deep Learning',
    items: ['Scikit-learn', 'TensorFlow', 'PyTorch', 'OpenCV'],
  },
  {
    category: 'Data Analysis & Visualization',
    items: ['Pandas', 'NumPy', 'Power BI', 'Statistical Modeling'],
  },
  {
    category: 'Web & Application Development',
    items: ['HTML5', 'CSS3', 'Next.js', 'Node.js', 'Express.js', 'JSP'],
  },
  {
    category: 'Tools & Platforms',
    items: ['Git', 'GitHub', 'Jupyter Notebook', 'Streamlit', 'VS Code'],
  },
  {
    category: 'Design',
    items: ['UI/UX Design', 'Graphic Design'],
  },
];

export const projects = [
  {
    title: 'ESS-Based Citrus Leaf Classification and Disease Detection',
    description:
      'A deep learning system for automated citrus leaf disease classification, using a CNN architecture enhanced with ESS-based feature optimization to improve extraction quality and classification robustness. The model outputs a predicted disease category with a confidence score, supporting early diagnosis in precision agriculture.',
    tech: ['Python', 'TensorFlow', 'Keras', 'NumPy', 'Matplotlib'],
    href: 'https://github.com/Haarini2164/ESS-Based-Citrus-Leaf-Classification-and-Disease-Detection',
  },
  {
    title: 'SmartAgri AI',
    description:
      'A digital farming assistant built for Indian farmers, combining crop recommendation, weather forecasting, disease detection, and market-trend analysis into a single interface. Includes loan and fertilizer calculators and multilingual chatbot support, deployed as an interactive Streamlit application.',
    tech: ['Python', 'Streamlit', 'Plotly', 'Pandas', 'NumPy'],
    href: 'https://github.com/Haarini2164/smartagri-ai',
  },
  {
    title: 'Employee Attrition Prediction',
    description:
      'A comparative machine learning study evaluating seven classification models to predict employee attrition, with results presented through an interactive Streamlit dashboard for exploratory analysis.',
    tech: ['Python', 'Scikit-learn', 'Streamlit'],
    href: 'https://github.com/Haarini2164/EMPLOYEE-ATTRITION-PREDICTION',
  },
  {
    title: 'Medical Image Compression using DWT-CNN',
    description:
      'A hybrid compression pipeline combining Discrete Wavelet Transform (DWT) with a CNN-based enhancement layer to achieve lossless compression of medical images, balancing storage efficiency with diagnostic image quality.',
    tech: ['Python', 'TensorFlow/Keras', 'NumPy'],
    href: 'https://github.com/Haarini2164/Medical-Image-Compression-DWT-CNN',
  },
];

export const timeline = [
  {
    year: '2022',
    text: 'Began M.Tech Integrated, specialization in Data Science at VIT Vellore. Built foundations in Python, C++, and core programming concepts.',
  },
  {
    year: '2023',
    text: 'Strengthened skills in SQL, data structures, and software development fundamentals through coursework and early academic projects.',
  },
  {
    year: '2024',
    text: 'Started building machine learning and deep learning projects, including CNN-based image classification work and exploratory data analysis.',
  },
  {
    year: '2025',
    text: 'Expanded into applied data science — built end-to-end ML systems spanning agriculture, healthcare, and HR analytics, while exploring Streamlit and dashboard-based deployment.',
  },
  {
    year: '2026',
    text: 'Focused on placement preparation, advanced data structures and algorithms, and refining production-oriented ML projects, while completing the final year of M.Tech Integrated at VIT Vellore.',
  },
];

export const education = [
  {
    degree: 'M.Tech Integrated — Data Science Engineering',
    institution: 'Vellore Institute of Technology, Vellore',
    period: '2022 – 2027',
    score: 'CGPA: 7.97',
    current: true,
  },
  {
    degree: 'Higher Secondary Education',
    institution: 'Grade 12',
    period: '2021 – 2022',
    score: 'Percentage: 80%',
    current: false,
  },
  {
    degree: 'Secondary School Education',
    institution: 'Grade 10',
    period: '2019 – 2020',
    score: 'Percentage: 90%',
    current: false,
  },
];

export const achievements = {
  eyebrow: 'Achievements',
  heading: 'Certifications & Continuous Learning',
  items: [
    {
      title: 'Microsoft Certified: Azure AI Fundamentals (AI-900)',
      issuer: 'Microsoft',
      date: '2024',
      description:
        "An industry-recognized certification validating core AI and machine learning concepts and their implementation on Microsoft Azure — covering supervised and unsupervised learning, deep learning principles, NLP, computer vision, and conversational AI, along with Microsoft's framework for responsible AI development. Demonstrates the ability to articulate AI workloads, understand cloud-based ML pipelines, and evaluate Azure's cognitive services.",
      linkLabel: 'View Certificate',
      href: 'https://drive.google.com/file/d/1GG-p2xyT_OjeVMDrmC23oJj0FPERY1rp/view?usp=drivesdk',
    },
    {
      title: 'Database Management System Part 1',
      issuer: 'Infosys Springboard',
      date: 'October 2023',
      description:
        'A structured deep-dive into database management fundamentals — the relational data model, ER diagrams, schema design, normalization (1NF through BCNF), SQL querying, joins, aggregations, and transaction management. Built a practical foundation in how data is stored, organized, and retrieved efficiently. Verified via Infosys\u2019s Wingspan platform.',
      linkLabel: 'View Certificate',
      href: 'https://drive.google.com/file/d/1R45dRxScfzkgtr95Lgv-eqGTmqlT-3oq/view?usp=drivesdk',
    },
    {
      title: 'Python for Data Analysis and Visualization (VAC2006)',
      issuer: 'School of Electronics Engineering, VIT Vellore',
      date: 'Sep – Nov 2025',
      description:
        'A seven-week Value Added Course with hands-on training in Python for real-world data science workflows — data wrangling with Pandas, numerical computing with NumPy, and visualization using Matplotlib and Seaborn. Focused on translating raw datasets into actionable insights through clean, reproducible analysis pipelines.',
      linkLabel: 'View Certificate',
      href: 'https://drive.google.com/file/d/18lbiYdrJzItDRRc1CgXAGomblXfvT2Wm/view?usp=drivesdk',
    },
    {
      title: 'LeetCode — Ongoing',
      issuer: 'Self-directed practice',
      date: 'Ongoing',
      description:
        '100+ problems solved across arrays, strings, dynamic programming, trees, and graphs — consistent practice in algorithmic thinking and optimal problem-solving, directly relevant to technical interviews and competitive programming.',
      linkLabel: 'View Profile',
      href: 'https://leetcode.com/u/Haarinisk2164/',
    },
  ],
};

export const contact = {
  eyebrow: 'Contact',
  heading: "Let's Connect",
  subtext:
    "Open to opportunities in Data Science, Machine Learning, and Analytics. Feel free to reach out — I'd love to hear from you.",
  links: [
    {
      label: 'Email',
      value: 'haarinikomathisankar2164@gmail.com',
      href: 'mailto:haarinikomathisankar2164@gmail.com',
    },
    {
      label: 'LinkedIn',
      value: 'linkedin.com/in/haarini-sk-07a364373',
      href: 'https://www.linkedin.com/in/haarini-sk-07a364373/',
    },
    {
      label: 'GitHub',
      value: 'github.com/Haarini2164',
      href: 'https://github.com/Haarini2164',
    },
    {
      label: 'LeetCode',
      value: 'leetcode.com/u/Haarinisk2164',
      href: 'https://leetcode.com/u/Haarinisk2164/',
    },
  ],
  ctaLabel: 'Say Hello',
};

export const footer = {
  text: 'Designed & Built by Haarini SK © 2026',
};
