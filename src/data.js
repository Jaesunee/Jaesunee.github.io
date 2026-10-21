export const profile = {
    name: 'Jason Chung',
    role: 'Full-Stack Developer',
    location: 'United States',
    email: 'jasonchung3003@gmail.com',
    github: 'https://github.com/Jaesunee',
    linkedin: 'https://www.linkedin.com/in/usjchung/',
};

export const skills = [
    { name: 'Python', logo: '/skills/python.svg', link: 'https://www.python.org' },
    { name: 'TypeScript', logo: '/skills/typescript.svg', link: 'https://www.typescriptlang.org' },
    { name: 'AWS', logo: '/skills/aws.svg', logoDark: '/skills/aws-dark.svg', link: 'https://aws.amazon.com' },
    { name: 'React', logo: '/skills/react.svg', link: 'https://react.dev' },
    { name: 'Node.js', logo: '/skills/nodejs.svg', link: 'https://nodejs.org' },
    { name: 'Java', logo: '/skills/java.svg', link: 'https://dev.java' },
    { name: 'Atlassian', logo: '/skills/atlassian.svg', link: 'https://www.atlassian.com' },
    { name: 'PostgreSQL', logo: '/skills/postgresql.svg', link: 'https://www.postgresql.org' },
];

// `feature` is the one picture shown per role: a logo card that links out.
export const experience = [
    {
        company: 'TeleTracking Technologies',
        role: 'Forward Deployed Engineer',
        location: 'Pittsburgh, PA',
        start: 'Jan 2026',
        end: 'Present',
        link: 'https://www.teletracking.com',
        tags: ['Palantir Foundry', 'AWS', 'Full-stack', 'AI-assisted dev'],
        bullets: [
            'Leveraged Palantir Foundry and AWS to translate operational workflows into scalable software with hundreds of users.',
            'Gathered customer requirements, developed full-stack applications, and quickly iterated based on customer feedback.',
            'Promoted AI-assisted development by sharing practical token cost reduction techniques and multi-agent workflows.',
        ],
        feature: {
            image: '/experience/teletracking.png',
            panel: 'dark',
            label: 'Ambulatory IQ — a TeleTracking product I contributed to',
            href: 'https://www.teletracking.com/healthcare-operations-iq-platform/ambulatory/',
        },
    },
    {
        company: 'FlightAware',
        role: 'Software Engineering Intern',
        team: 'Site Reliability Team',
        location: 'Houston, TX',
        start: 'May 2025',
        end: 'Aug 2025',
        link: 'https://www.flightaware.com',
        tags: ['Python', 'NLP/ML', 'Kubernetes', 'Prometheus', 'Grafana'],
        bullets: [
            'Designed and deployed a tool that leveraged natural language processing and machine learning to identify software across 500+ servers, improving audit accuracy and reducing technical overhead.',
            'Used observability tools (Prometheus, Grafana) ensuring high availability, fast incident response, and reliable deployments.',
        ],
        feature: {
            image: '/experience/flightaware.svg',
            panel: 'light',
            label: 'Read about my internship on the FlightAware engineering blog',
            href: 'https://flightaware.engineering/intern-2025/',
        },
    },
    {
        company: 'GHX',
        role: 'AI Engineering Intern',
        location: 'Louisville, CO',
        start: 'May 2024',
        end: 'Aug 2024',
        link: 'https://www.ghx.com',
        tags: ['Python', 'Neo4j', 'AWS', 'GNNs'],
        bullets: [
            'Developed Python scripts to build a pipeline for ingesting and processing data from millions of healthcare transactions.',
            'Populated graphs using internal and open source datasets, resulting in up to 50 times faster query response times.',
            'Measured performance of network algorithms and graph neural networks, achieving accuracy scores of up to 94%.',
        ],
        feature: { image: '/experience/ghx.svg', panel: 'light', label: 'ghx.com', href: 'https://www.ghx.com' },
    },
    {
        company: 'Laboratory for Atmospheric and Space Physics',
        role: 'Software Development Intern',
        location: 'Boulder, CO',
        start: 'Feb 2023',
        end: 'May 2023',
        link: 'https://lasp.colorado.edu',
        tags: ['REST APIs', 'Databases', 'Automation'],
        bullets: [
            'Deployed an internal web application with a REST API to reduce latency by 85% for hundreds of crucial databases.',
            'Automated tasks for databases ingesting telemetry data from satellites, enhancing usability for scientific researchers.',
        ],
        feature: { image: '/experience/lasp.svg', panel: 'dark', label: 'lasp.colorado.edu', href: 'https://lasp.colorado.edu' },
    },
];

export const projects = [
    {
        title: 'Intellitag',
        tags: ['Python', 'NLP/ML', 'Kubernetes', 'Flask', 'Netbox'],
        description:
            'Designed and deployed an application that leveraged NLP and ML to classify services on servers and improve infrastructure management. Read the FlightAware blog post about it!',
        image: '/intellitag.png',
        link: 'https://flightaware.engineering/intern-2025',
    },
    {
        title: 'PetClinic',
        tags: ['Jenkins', 'SonarQube', 'Prometheus', 'Grafana', 'Ansible', 'Docker'],
        description:
            'Set up a DevSecOps pipeline for a Java Spring application (used for managing a pet clinic). Integrated CI/CD, static code analysis, security scanning, and real-time monitoring to practice secure, automated software delivery.',
        image: '/devops.jpg',
        link: 'https://github.com/Jaesunee/PetClinic',
    },
    {
        title: 'Healthcare Knowledge Graph',
        tags: ['Python', 'AWS', 'Neo4j', 'Jupyter'],
        description:
            'Capstone project modeling the healthcare supply chain using a graph database, allowing people to extract actionable insights through database queries and network analysis algorithms.',
        image: '/graph.png',
        link: 'https://github.com/Jaesunee/GHX-GraphDB',
    },
    {
        title: 'Virus Spread across Different Networks',
        tags: ['MATLAB', 'LaTeX'],
        description: 'Simulating the spread of the SARS virus over graph networks. Includes MATLAB code and LaTeX project report.',
        image: '/project-2.PNG',
        link: 'https://github.com/Jaesunee/Discrete-Math-Project',
    },
    {
        title: 'Rain in Australia',
        tags: ['Python', 'PyTorch', 'TensorFlow', 'Jupyter'],
        description: 'Building neural networks using Python to predict next-day rainfall in Australia.',
        image: '/rain.jpeg',
        link: 'https://github.com/Jaesunee/Rain-In-Australia',
    },
    {
        title: 'Legends to Slay',
        tags: ['Java', 'Design Patterns', 'UML'],
        description: 'An interactive, multiplayer card game inspired by the card game "Here to Slay" and the videogame "League of Legends".',
        image: '/lts.png',
        link: 'https://github.com/Jaesunee/Legends-To-Slay',
    },
    {
        title: 'RecipEat',
        tags: ['JavaScript', 'PostgreSQL', 'Node.js', 'Docker', 'Heroku'],
        description:
            'Full-stack web application designed to help cooks search for recipes based on available ingredients and dietary preferences. Click to view the demo video.',
        image: '/project-1.PNG',
        link: 'https://drive.google.com/file/d/1_p3i7UntBl5MugVGJrMbilF0QAqj9Gyp/view',
    },
    {
        title: 'Personal Website',
        tags: ['React', 'Vite', 'Tailwind CSS', 'Motion'],
        description: 'This website! A React app deployed to GitHub Pages. No need to click since you are already here ;)',
        image: '/react.png',
        link: 'https://github.com/Jaesunee/Jaesunee.github.io',
    },
];


export const education = [
    {
        school: 'Carnegie Mellon University',
        emoji: { src: '/emoji/black-dog.svg', label: 'black dog, for the CMU Scottie' },
        logo: '/education/cmu.svg',
        link: 'https://www.cmu.edu',
        degree: "Master's in Software Engineering — Scalable Systems",
        gpa: '3.9',
        location: 'Pittsburgh, PA',
        start: 'Aug 2024',
        end: 'Dec 2025',
        activities: [{ title: 'Teaching Assistant — Quality Assurance', when: 'May 2025 – Dec 2025' }],
        coursework: ['Designing Software Systems', 'Computer Vision', 'Formal Methods', 'Design Patterns', 'Quality Assurance'],
    },
    {
        school: 'University of Colorado Boulder',
        emoji: { src: '/emoji/bison.svg', label: 'buffalo, for the CU Buffaloes' },
        logo: '/education/cu-boulder.png',
        link: 'https://www.colorado.edu',
        degree: 'B.S. in Computer Science',
        gpa: '3.8',
        location: 'Boulder, CO',
        start: 'Aug 2021',
        end: 'May 2024',
        activities: [
            { title: 'Course Assistant — Software Development', when: 'Jan 2024 – May 2024' },
            { title: 'Center for Academic Success and Engagement (CASE) Ambassador', when: 'Jan 2024 – May 2024' },
        ],
        coursework: ['Data Structures', 'Algorithms', 'Reinforcement Learning', 'Computer Systems', 'Operating Systems', 'Machine Learning'],
    },
];
