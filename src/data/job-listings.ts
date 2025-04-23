export interface JobListing {
  id: number;
  title: string;
  company: string;
  companyLogoSrc: string;
  companyLogoBg: string;
  postedTime: string;
  level: string;
  employmentType: string;
  locationType: string;
  location: string;
  matchPercentage: string;
  description: string;
  skills: string[];
  aboutCompany: string;
  requirements: {
    essential: string[];
    niceToHave: string[];
  };
  responsibilities: string[];
  benefits: {
    salary: string;
    perks: string[];
  };
  teamSize: string;
  techStack: string[];
  officeLocations: string[];
}

export const jobListings: JobListing[] = [
  {
    id: 1,
    title: "UI/UX Designer",
    company: "Radix",
    companyLogoSrc: "/radix-icon.svg",
    companyLogoBg: "bg-orange-400",
    postedTime: "Today",
    level: "Entry Level",
    employmentType: "Full time",
    locationType: "Remote",
    location: "Manhattan, New York",
    matchPercentage: "100% match",
    description: "Join our dynamic team as a Senior UX Designer! We're seeking a creative and detail-oriented professional to lead our user experience projects and drive innovative design solutions. If you're passionate about crafting exceptional user journeys, we'd love to hear from you.",
    skills: ["User interface design", "User research", "Prototyping", "Wireframing", "Figma", "Design systems"],
    aboutCompany: "Radix is a forward-thinking design agency specializing in creating intuitive digital experiences across web, mobile, and emerging technologies. Founded in 2015, we've quickly established ourselves as innovators in the user experience space, partnering with startups and enterprise clients to transform complex challenges into elegant, user-centered solutions. Our collaborative culture emphasizes creative exploration, user advocacy, and continuous learning.",
    requirements: {
      essential: [
        "3+ years of professional experience in UX/UI design for digital products",
        "Strong portfolio demonstrating your design process and problem-solving abilities",
        "Proficiency with design and prototyping tools (Figma, Sketch, Adobe XD)",
        "Experience with design systems and component-based design approaches",
        "Excellent communication skills with the ability to articulate design decisions",
        "Basic understanding of front-end development constraints and possibilities",
        "Bachelor's degree in Design, HCI, or related field, or equivalent practical experience"
      ],
      niceToHave: [
        "Experience with design for enterprise applications",
        "Knowledge of accessibility standards (WCAG)",
        "Background in user research methodologies",
        "Understanding of agile development processes",
        "Experience with motion design and micro-interactions"
      ]
    },
    responsibilities: [
      "Lead UX design initiatives across multiple projects, working closely with product managers, developers, and stakeholders",
      "Conduct user research and usability testing to inform design decisions and validate solutions",
      "Create user flows, wireframes, interactive prototypes, and detailed UI specifications",
      "Develop and maintain design systems to ensure consistency across products",
      "Mentor junior designers and provide constructive feedback during design reviews",
      "Advocate for user-centered design practices throughout the organization",
      "Stay current with UX trends and emerging technologies to continually evolve our approach"
    ],
    benefits: {
      salary: "$90,000 - $120,000 based on experience",
      perks: [
        "Flexible remote work policy with quarterly team gatherings",
        "Comprehensive health, dental, and vision insurance",
        "401(k) matching program",
        "Unlimited PTO policy",
        "Professional development budget of $2,500/year",
        "Latest hardware and software provided",
        "Parental leave program",
        "Regular team social events and retreats"
      ]
    },
    teamSize: "51-200 people",
    techStack: ["Figma", "Adobe Creative Suite", "Maze", "Notion", "Slack", "Jira"],
    officeLocations: ["Manhattan, New York", "San Diego, California"]
  },
  {
    id: 2,
    title: "UI/UX Designer",
    company: "Figma",
    companyLogoSrc: "/figma.svg",
    companyLogoBg: "bg-red-600",
    postedTime: "Today",
    level: "Entry Level",
    employmentType: "Full time",
    locationType: "On site",
    location: "San Francisco, USA",
    matchPercentage: "94% match",
    description: "Join Figma's design team to help shape the future of collaborative design tools. We're looking for a UI/UX Designer who can combine creativity with analytical thinking to create intuitive and powerful features for millions of designers worldwide.",
    skills: ["User interface design", "Design systems", "Prototyping", "User research", "Figma", "Collaboration"],
    aboutCompany: "Figma is where teams design together. We're on a mission to make design accessible to all. Our platform enables everyone in the product development process to collaborate in real-time. We're used by designers, developers, product managers, and others to make the design process faster, more efficient, and more inclusive.",
    requirements: {
      essential: [
        "3+ years of experience designing digital products",
        "Deep understanding of design systems and component libraries",
        "Strong visual design skills with attention to detail",
        "Experience with collaborative design tools and processes",
        "Ability to work effectively with cross-functional teams",
        "Strong problem-solving and analytical skills",
        "Bachelor's degree in Design, HCI, or related field"
      ],
      niceToHave: [
        "Experience with developer handoff and documentation",
        "Knowledge of web and mobile platform guidelines",
        "Experience with animation and micro-interactions",
        "Understanding of accessibility standards",
        "Experience with remote collaboration tools"
      ]
    },
    responsibilities: [
      "Design new features and improvements for Figma's core product",
      "Collaborate with product managers to define problem spaces and solutions",
      "Create and maintain design system components",
      "Conduct user research and usability testing",
      "Work closely with engineers during implementation",
      "Contribute to design critiques and provide feedback",
      "Help shape the future of collaborative design tools"
    ],
    benefits: {
      salary: "$115,000 - $160,000 based on experience",
      perks: [
        "Competitive equity package",
        "Premium health, dental, and vision coverage",
        "401(k) with generous match",
        "Flexible vacation policy",
        "$500/month wellness stipend",
        "Home office setup allowance",
        "Learning and development budget",
        "Regular team offsites"
      ]
    },
    teamSize: "1000+ people",
    techStack: ["Figma", "FigJam", "Notion", "Slack", "GitHub"],
    officeLocations: ["San Francisco, CA", "New York, NY", "London, UK"]
  },
  {
    id: 3,
    title: "Product Designer",
    company: "Discord",
    companyLogoSrc: "/radix-icon.svg",
    companyLogoBg: "bg-purple-600",
    postedTime: "Yesterday",
    level: "Mid Level",
    employmentType: "Full time",
    locationType: "Remote",
    location: "Anywhere",
    matchPercentage: "88% match",
    description: "Discord is looking for a Product Designer to join our growing team. You'll work on features that connect millions of users worldwide, fostering communities and enabling communication.",
    skills: ["Product design", "Interaction design", "Prototyping", "Figma", "User research", "Mobile design"],
    aboutCompany: "Discord is the easiest way to talk over voice, video, and text. Talk, chat, hang out, and stay close with your friends and communities.",
    requirements: {
      essential: [
        "2+ years of product design experience",
        "Portfolio showcasing strong interaction and visual design skills",
        "Experience designing for multiple platforms (web, mobile, desktop)",
        "Proficiency in Figma",
        "Understanding of user-centered design principles"
      ],
      niceToHave: [
        "Experience working on social or communication products",
        "Knowledge of gaming communities",
        "Experience with animation or motion design"
      ]
    },
    responsibilities: [
      "Design features across Discord's core communication platform",
      "Collaborate with PMs, engineers, and researchers",
      "Create wireframes, prototypes, and high-fidelity mockups",
      "Contribute to Discord's design system"
    ],
    benefits: {
      salary: "$100,000 - $140,000",
      perks: ["Fully remote", "Health insurance", "401k", "Wellness stipend"]
    },
    teamSize: "500-1000 people",
    techStack: ["Figma", "React", "Electron"],
    officeLocations: ["Remote"]
  },
  {
    id: 4,
    title: "Lead UX Researcher",
    company: "Atlassian",
    companyLogoSrc: "/figma.svg",
    companyLogoBg: "bg-blue-700",
    postedTime: "3 days ago",
    level: "Lead",
    employmentType: "Full time",
    locationType: "Hybrid",
    location: "Austin, TX",
    matchPercentage: "91% match",
    description: "Lead user research efforts for key Atlassian products like Jira and Confluence. You'll mentor researchers, define research strategies, and deliver actionable insights.",
    skills: ["User research", "Qualitative research", "Quantitative research", "Usability testing", "Research strategy", "Mentorship"],
    aboutCompany: "Atlassian builds tools like Jira, Confluence, Bitbucket, and Trello to help teams worldwide unleash their potential.",
    requirements: {
      essential: [
        "7+ years of experience in user research",
        "Proven ability to lead research projects and mentor junior researchers",
        "Expertise in a wide range of research methodologies",
        "Strong communication and presentation skills",
        "Experience working with product teams on complex software"
      ],
      niceToHave: [
        "Experience with enterprise software research",
        "PhD or Master's degree in HCI, Psychology, or related field",
        "Experience working in an Agile environment"
      ]
    },
    responsibilities: [
      "Define and execute research strategies for major product areas",
      "Mentor and guide a team of UX researchers",
      "Synthesize findings and deliver impactful insights to product teams",
      "Champion user-centered practices across the organization"
    ],
    benefits: {
      salary: "$150,000 - $200,000",
      perks: ["Hybrid work model", "Comprehensive health benefits", "Stock options", "Generous PTO", "Paid volunteer time"]
    },
    teamSize: "5000+ people",
    techStack: ["Jira", "Confluence", "UserTesting.com", "Qualtrics", "Lookback"],
    officeLocations: ["Austin, TX", "Mountain View, CA", "Sydney, Australia"]
  }
]; 