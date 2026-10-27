import React, { useState, useEffect, useRef, useMemo } from 'react';
import * as THREE from 'three';
import {
  Ticket,
  ArrowUpRight,
  Calendar,
  MapPin,
  Box,
  Compass,
  Award,
  Users,
  Search,
  Filter,
  ChevronRight,
  ChevronDown,
  CheckCircle2,
  Code2,
  Copy,
  Check,
  Sparkles,
  Layers,
  ShieldCheck,
  Clock,
  Building2,
  Hammer,
  Ruler,
  Globe,
  FileText,
  Download,
  QrCode,
  Menu,
  X,
  Sliders,
  Eye,
  RotateCcw,
  Zap,
  Sun,
  CloudLightning,
  CloudRain,
  Moon,
  Info,
  ExternalLink,
  ArrowRight
} from 'lucide-react';

// ============================================================================
// DATA CATALOG: OFFICIAL EVENTS, CHALLENGES & CONTESTS (/events)
// Exact match to screen recording: CONmix, CONarch, CONzine, CONmake,
// CONquest, CONscope, CONfilm, CONfight (plus Day 1 / Day 2 tracks)
// ============================================================================
const EVENTS_DATA = [
  {
    id: 'conmix-day1',
    num: '01',
    code: 'CF-01',
    title: 'CONmix: Mix Design Challenge',
    subtitle: 'High-Strength Concrete Proportioning & Destructive Testing',
    category: 'MATERIAL INNOVATION',
    filterTags: ['TECHNICAL', 'MATERIAL INNOVATION', 'TESTING LAB'],
    day: '30 Nov 2026',
    time: '09:30 AM',
    venue: 'Concrete & Materials Testing Lab',
    prizePool: '₹30,000',
    firstPrize: '₹18,000',
    secondPrize: '₹12,000',
    entryFee: '₹ 450',
    feeAmount: 450,
    teamSize: '3–4 participants',
    difficulty: 'Advanced',
    badge: 'TESTING LAB',
    specTag: 'CF-01 · 30 NOV \'26',
    image: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=900&q=80',
    shortDesc:
      'Can you design the perfect concrete mix and prove its performance? Test dosing and proportioning skills, conduct slump and workability tests, and cast concrete specimens. After 24 hours, specimens will be tested under a compression testing machine to determine the champion mix.',
    highlights: [
      'Round 1: Technical quiz on mix design (15–20 mins)',
      'Round 2: Mix Design Challenge: prepare mix, perform slump test, cast 3 cubes',
      'Day 2 Evaluation: Compression testing after 24 hours of accelerated curing',
      'Judged on target workability, compressive strength (MPa), and mix economy'
    ],
    rules: [
      'Cement (OPC 53), fine/coarse aggregates, and standard admixtures are provided on-site.',
      'Teams must submit their theoretical Mix Design calculation sheet before batching.',
      'Target slump must fall within specified tolerances without segregation or bleeding.',
      'CTM peak failure load (kN) recorded on Day 2 determines final standings.'
    ],
    coordinators: ['Dr. Radhakrishna (Faculty)', 'Adithya Rao (+91 98450 11204)']
  },
  {
    id: 'conarch-day1',
    num: '02',
    code: 'CF-02',
    title: 'CONarch: Arch Design & Build',
    subtitle: 'Precision Structural Arch Fabrication & Load-to-Failure Rig',
    category: 'STRUCTURAL DESIGN',
    filterTags: ['TECHNICAL', 'STRUCTURAL DESIGN', 'FABRICATION YARD'],
    day: '30 Nov 2026',
    time: '11:00 AM',
    venue: 'Structural Fabrication Yard',
    prizePool: '₹25,000',
    firstPrize: '₹15,000',
    secondPrize: '₹10,000',
    entryFee: '₹ 300',
    feeAmount: 300,
    teamSize: '3–4 participants',
    difficulty: 'Intermediate',
    badge: 'FABRICATION YARD',
    specTag: 'CF-02 · 30 NOV \'26',
    image: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=900&q=80',
    shortDesc:
      'Design with purpose. Build with precision. Transform creative ideas into load-bearing reality in this hands-on challenge that combines creativity with construction skills, build an arch or bridge on paper and construct it using bricks, mortar, and provided materials.',
    highlights: [
      'Round 1: Design an arch or bridge on drawing sheet with load-path calculations',
      'Round 2: Build the designed arch/bridge using provided masonry & timber units',
      'Live central point-load & crown-deflection testing after form removal',
      'Evaluated on structural efficiency (Load-to-Weight ratio) & aesthetics'
    ],
    rules: [
      'Clear span and rise geometry must strictly follow the dimensional brief given on-site.',
      'Only materials provided in the official RVCE Fabrication Kit may be used.',
      'Formwork centering will be removed prior to vertical load application.',
      'Judges’ decision on ultimate failure load and structural articulation is final.'
    ],
    coordinators: ['Prof. B. C. Gayathri (Faculty)', 'Nikhil Gowda (+91 97412 88310)']
  },
  {
    id: 'conzine-day1',
    num: '03',
    code: 'CF-03',
    title: 'CONzine: Smart City Designing',
    subtitle: 'Urban Infrastructure, Storm Water Drainage & Zoning Masterplan',
    category: 'COMPUTATIONAL BIM',
    filterTags: ['TECHNICAL', 'COMPUTATIONAL BIM', 'DESIGN & PLANNING'],
    day: '30 Nov 2026',
    time: '02:00 PM',
    venue: 'CAD & GIS Modeling Studio',
    prizePool: '₹20,000',
    firstPrize: '₹12,500',
    secondPrize: '₹7,500',
    entryFee: '₹ 400',
    feeAmount: 400,
    teamSize: '2–3 participants',
    difficulty: 'Intermediate',
    badge: 'COMPUTATIONAL BIM',
    specTag: 'CF-03 · 30 NOV \'26',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80',
    shortDesc:
      'Imagine the cities of tomorrow and design a smarter future. Put your technical knowledge and urban planning creativity to work to develop a blueprint for a well-planned city. Address real-world infrastructure, storm water drainage, zoning, and sustainable green transport.',
    highlights: [
      'Round 1: Technical crossword & urban systems aptitude challenge',
      'Round 2: Town planning CAD/BIM drafting, storm-water routing & 3D massing',
      'Jury presentation defending floor-area ratio (FAR), transit & net-zero metrics',
      'Evaluated by practicing urban planners and smart-city infrastructure leads'
    ],
    rules: [
      'Workstations with AutoCAD, Revit, and QGIS are provided (personal laptops permitted).',
      'All submissions must include a master zoning plan, utility section, and presentation deck.',
      'Plagiarism or use of pre-existing templates leads to immediate disqualification.'
    ],
    coordinators: ['Dr. M. R. Archana (Faculty)', 'Sneha Kulkarni (+91 99001 44521)']
  },
  {
    id: 'conmake-day1',
    num: '04',
    code: 'CF-04',
    title: 'CONmake: Model Making',
    subtitle: 'Visual Dimension Estimation & Architectural Miniature Casting',
    category: 'STRUCTURAL DESIGN',
    filterTags: ['TECHNICAL', 'STRUCTURAL DESIGN', 'MODEL WORKSHOP'],
    day: '30 Nov 2026',
    time: '03:30 PM',
    venue: 'Masonry & Model Workshop',
    prizePool: '₹18,000',
    firstPrize: '₹11,000',
    secondPrize: '₹7,000',
    entryFee: '₹ 400',
    feeAmount: 400,
    teamSize: '3 participants',
    difficulty: 'Intermediate',
    badge: 'MODEL WORKSHOP',
    specTag: 'CF-04 · 30 NOV \'26',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=900&q=80',
    shortDesc:
      'Dimension estimation by visual observation without measuring instruments, followed by miniature house construction using real cement mortar and miniature bricks.',
    highlights: [
      'Round 1: Dimension estimation by visual sight without measuring tapes',
      'Round 2: Miniature house/monument construction with cement mortar & micro-bricks',
      'Plumb, level, bond alignment & architectural finish accuracy check',
      'Hands-on masonry craftsmanship judged by structural engineers'
    ],
    rules: [
      'No scales, laser distometers, or measuring tapes allowed during Round 1 visual estimation.',
      'Miniature bricks, mortar trowels, and base boards are supplied by the department.',
      'Models must be self-supporting and completed within the 120-minute workshop window.'
    ],
    coordinators: ['Prof. Vigneshwara K (Faculty)', 'Karthik Shetty (+91 96114 78230)']
  },
  {
    id: 'conquest-day2',
    num: '05',
    code: 'CF-05',
    title: 'CONquest: Civil Engineering Quiz',
    subtitle: 'High-Voltage Buzzer Quiz on Structures, Materials & Mega-Projects',
    category: 'QUIZZES & CULTURAL',
    filterTags: ['TECHNICAL', 'QUIZZES & CULTURAL', 'SEMINAR HALL'],
    day: '01 Dec 2026',
    time: '10:00 AM',
    venue: 'Civil Dept. Main Seminar Hall',
    prizePool: '₹15,000',
    firstPrize: '₹9,500',
    secondPrize: '₹5,500',
    entryFee: '₹ 200',
    feeAmount: 200,
    teamSize: '2 participants',
    difficulty: 'All Levels',
    badge: 'SEMINAR HALL',
    specTag: 'CF-05 · 01 DEC \'26',
    image: 'https://images.unsplash.com/photo-1541888946425-d09bb18086f6?auto=format&fit=crop&w=900&q=80',
    shortDesc:
      'Think fast. Think civil. Put your civil engineering knowledge to the ultimate test! Compete in rigorous civil engineering blueprint decoding, rapid-fire, and high-voltage live buzzer rounds on structures, materials, and mega-projects.',
    highlights: [
      'Prelims: Written analytical & structural blueprint identification round',
      'Stage Finals: Top 6 teams compete in Pounce-and-Bounce & Visual Forensics',
      'Dedicated heritage round on Indian lithic architecture & Sir M. Visvesvaraya',
      'High-speed buzzer finale before the entire Conclave audience'
    ],
    rules: [
      'Teams of 2 students with valid college ID cards.',
      'Use of mobile phones or smartwatches during prelims or stage rounds is strictly prohibited.',
      'Quizmaster’s ruling on buzzer timing and visual clue interpretation is final.'
    ],
    coordinators: ['Prof. Varun K (Quizmaster)', 'Meghana S (+91 97390 12840)']
  },
  {
    id: 'conscope-day2',
    num: '06',
    code: 'CF-06',
    title: 'CONscope: Surveying Treasure Hunt & Escape Room',
    subtitle: 'Optical Theodolite Traverse, Campus Clues & Engineering Escape Room',
    category: 'FIELD',
    filterTags: ['TECHNICAL', 'FIELD', 'SURVEY GROUNDS'],
    day: '01 Dec 2026',
    time: '11:30 AM',
    venue: 'Campus Survey Grounds & Lab',
    prizePool: '₹20,000',
    firstPrize: '₹12,500',
    secondPrize: '₹7,500',
    entryFee: '₹ 400',
    feeAmount: 400,
    teamSize: '3–4 participants',
    difficulty: 'Intermediate',
    badge: 'SURVEY GROUNDS',
    specTag: 'CF-06 · 01 DEC \'26',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80',
    shortDesc:
      'Follow the clues, explore the campus, unlock the mystery! Navigate the sprawling RVCE grounds using optical surveying instruments, decode cryptic coordinates, and unlock the final destination in the engineering escape room.',
    highlights: [
      'Temporary adjustments, leveling & coordinate decoding with Total Station / Auto-Level',
      'Multi-checkpoint geodetic treasure hunt across the RVCE Civil Quadrangle',
      'Final Stage: Locked Engineering Escape Room solved via bearing & RL calculations',
      'Weighted 60% on coordinate precision and 40% on escape completion time'
    ],
    rules: [
      'Surveying instruments, tripods, leveling staves, and field books are provided on-site.',
      'Only non-programmable scientific calculators are allowed.',
      'Teams must handle optical instruments with care; penalties apply for tripod disturbances.'
    ],
    coordinators: ['Prof. S. M. Renuka (Faculty)', 'Pranav Hegde (+91 91084 55920)']
  },
  {
    id: 'confilm-day2',
    num: '07',
    code: 'CF-07',
    title: 'CONfilm: Short Film',
    subtitle: 'Cinematic Storytelling on Megastructures, Sustainability & Urban Life',
    category: 'NON-TECHNICAL',
    filterTags: ['NON-TECHNICAL', 'QUIZZES & CULTURAL', 'MEDIA STUDIO'],
    day: '01 Dec 2026',
    time: '01:30 PM',
    venue: 'Media Studio, Auditorium',
    prizePool: '₹15,000',
    firstPrize: '₹10,000',
    secondPrize: '₹5,000',
    entryFee: '₹ 500',
    feeAmount: 500,
    teamSize: '1–5 participants',
    difficulty: 'All Levels',
    badge: 'MEDIA STUDIO',
    specTag: 'CF-07 · 01 DEC \'26',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80',
    shortDesc:
      'Lights. Camera. Construct. Tell a story that leaves an impact. Bring civil engineering, architecture, sustainability, or campus life to the screen in a short film judged for storytelling, cinematography, and directional vision.',
    highlights: [
      'Screening of shortlisted 3 to 8 minute short films in the Main Media Auditorium',
      'Live Q&A with the director/cinematographer before the jury panel',
      'Themes: Heritage Conservation, Resilient Cities, Life of a Site Engineer, or Net-Zero',
      'Special Jury Mention for Best Drone/Architectural Cinematography'
    ],
    rules: [
      'Film duration must be between 3 and 8 minutes including credits (1080p MP4 format).',
      'All footage and background score must be original or royalty-free.',
      'Submissions must be uploaded 24 hours prior to the Day 2 screening slot.'
    ],
    coordinators: ['Dr. Jagadish Vengala (Jury)', 'Ananya Bhat (+91 98802 31944)']
  },
  {
    id: 'confight-day2',
    num: '08',
    code: 'CF-08',
    title: 'CONfight: Debate Challenge',
    subtitle: 'Policy, Megaproject Ethics, Environment vs. Infrastructure Courtroom',
    category: 'SYMPOSIUM & LECTURE',
    filterTags: ['NON-TECHNICAL', 'SYMPOSIUM & LECTURE', 'QUIZZES & CULTURAL'],
    day: '01 Dec 2026',
    time: '02:30 PM',
    venue: 'Conference Suite 2, Civil Dept.',
    prizePool: '₹14,000',
    firstPrize: '₹9,000',
    secondPrize: '₹5,000',
    entryFee: '₹ 300',
    feeAmount: 300,
    teamSize: '2 participants',
    difficulty: 'All Levels',
    badge: 'CONFERENCE SUITE',
    specTag: 'CF-08 · 01 DEC \'26',
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=900&q=80',
    shortDesc:
      'Think critically. Speak boldly. Defend your ideas. Analyze real-world dilemmas in infrastructure policy, heritage vs. modernization, and sustainable development, and present structured arguments before a jury panel.',
    highlights: [
      'Round 1: Oxford-style proposition vs. opposition parliamentary debate',
      'Round 2: Crisis Stakeholder War-Room (EIA clearance, dam displacement, metro routing)',
      'Rebuttal & cross-examination scored on technical data backing and rhetoric',
      'Judged by senior infrastructure policy advisors and faculty'
    ],
    rules: [
      'Teams of 2 speakers (1 Proposition + 1 Opposition / Rebuttal).',
      'Topics for the final Crisis Round are disclosed 20 minutes prior to the debate.',
      'Personal attacks or deviation from parliamentary decorum result in point deductions.'
    ],
    coordinators: ['Dr. K. V. G. D. Balaji (Jury)', 'Rohan Deshmukh (+91 94480 62190)']
  },
  {
    id: 'conmix-day2',
    num: '09',
    code: 'CF-09',
    title: 'CONmix: Mix Design Challenge',
    subtitle: 'Day 2 CTM Destructive Cube Testing & Strength-to-Cost Finale',
    category: 'MATERIAL INNOVATION',
    filterTags: ['TECHNICAL', 'MATERIAL INNOVATION', 'TESTING LAB'],
    day: '01 Dec 2026',
    time: '10:00 AM',
    venue: 'Concrete & Materials Testing Lab',
    prizePool: '₹30,000',
    firstPrize: '₹18,000',
    secondPrize: '₹12,000',
    entryFee: '₹ 450',
    feeAmount: 450,
    teamSize: '3–4 participants',
    difficulty: 'Advanced',
    badge: 'TESTING LAB',
    specTag: 'CF-09 · 01 DEC \'26',
    image: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=900&q=80',
    shortDesc:
      'Test dosing and proportioning skills, conduct slump tests, and cast concrete specimens. Compressive strength tested after 24 hours.',
    highlights: [
      '2000 kN Digital Compression Testing Machine (CTM) live cube crushing',
      'Automatic peak load (kN) & stress-strain readout on lab telemetry screen',
      'Bonus credit for low-carbon SCM substitution (Fly Ash / GGBS)'
    ],
    rules: [
      'Specimens cast on Day 1 are demoulded and surface-dried 30 minutes before testing.',
      'Average of 3 cube failure loads determines the verified compressive strength.'
    ],
    coordinators: ['Dr. Radhakrishna (Faculty)', 'Adithya Rao (+91 98450 11204)']
  },
  {
    id: 'conarch-day2',
    num: '10',
    code: 'CF-10',
    title: 'CONarch: Arch Design & Build',
    subtitle: 'Day 2 Masonry Arch Decentering & Ultimate Point-Load Test',
    category: 'STRUCTURAL DESIGN',
    filterTags: ['TECHNICAL', 'STRUCTURAL DESIGN', 'FABRICATION YARD'],
    day: '01 Dec 2026',
    time: '11:30 AM',
    venue: 'Structural Fabrication Yard',
    prizePool: '₹25,000',
    firstPrize: '₹15,000',
    secondPrize: '₹10,000',
    entryFee: '₹ 300',
    feeAmount: 300,
    teamSize: '3–4 participants',
    difficulty: 'Intermediate',
    badge: 'FABRICATION YARD',
    specTag: 'CF-10 · 01 DEC \'26',
    image: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=900&q=80',
    shortDesc:
      'Design an arch or bridge on paper, then build and test under load.',
    highlights: [
      'Progressive keystone & crown load application until hinge mechanism forms',
      'Live efficiency ratio calculation = Peak Load (kg) / Arch Self-Weight (kg)'
    ],
    rules: [
      'Safety goggles and closed-toe shoes are mandatory inside the Testing Yard.'
    ],
    coordinators: ['Prof. B. C. Gayathri (Faculty)', 'Nikhil Gowda (+91 97412 88310)']
  },
  {
    id: 'conscope-day2-pm',
    num: '11',
    code: 'CF-11',
    title: 'CONscope: Surveying Treasure Hunt & Escape Room',
    subtitle: 'Afternoon Batch — Optical Theodolite Traverse & Escape Room Finale',
    category: 'FIELD',
    filterTags: ['TECHNICAL', 'FIELD', 'SURVEY GROUNDS'],
    day: '01 Dec 2026',
    time: '02:00 PM',
    venue: 'Campus Survey Grounds & Lab',
    prizePool: '₹20,000',
    firstPrize: '₹12,500',
    secondPrize: '₹7,500',
    entryFee: '₹ 400',
    feeAmount: 400,
    teamSize: '3–4 participants',
    difficulty: 'Intermediate',
    badge: 'SURVEY GROUNDS',
    specTag: 'CF-11 · 01 DEC \'26',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80',
    shortDesc:
      'Follow the clues, explore the campus, unlock the mystery! Navigate the sprawling RVCE grounds using optical surveying tools.',
    highlights: [
      'Closed traverse computation and final Escape Room cipher unlock',
      'Fastest team with zero angular error wins the CONscope Trophy'
    ],
    rules: [
      'Teams must report to the Survey Grounds 15 minutes before their slot.'
    ],
    coordinators: ['Prof. S. M. Renuka (Faculty)', 'Pranav Hegde (+91 91084 55920)']
  },
  {
    id: 'conmake-day2',
    num: '12',
    code: 'CF-12',
    title: 'CONmake: Model Making',
    subtitle: 'Architectural Miniature Masonry & Visual Dimensioning Finale',
    category: 'STRUCTURAL DESIGN',
    filterTags: ['TECHNICAL', 'STRUCTURAL DESIGN', 'MODEL WORKSHOP'],
    day: '01 Dec 2026',
    time: '03:00 PM',
    venue: 'Masonry & Model Workshop',
    prizePool: '₹18,000',
    firstPrize: '₹11,000',
    secondPrize: '₹7,000',
    entryFee: '₹ 400',
    feeAmount: 400,
    teamSize: '3 participants',
    difficulty: 'Intermediate',
    badge: 'MODEL WORKSHOP',
    specTag: 'CF-12 · 01 DEC \'26',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=900&q=80',
    shortDesc:
      'Visual dimension estimation followed by architectural miniature house construction using real cement mortar and miniature bricks.',
    highlights: [
      'Final structural inspection of cured miniature brick-and-mortar models',
      'Dimensional accuracy verification with digital vernier calipers'
    ],
    rules: [
      'All models remain on display at the Civil Heritage Foyer until Valedictory.'
    ],
    coordinators: ['Prof. Vigneshwara K (Faculty)', 'Karthik Shetty (+91 96114 78230)']
  }
];

const SCHEDULE_DATA = {
  day1: [
    {
      time: '09:00 AM',
      category: 'CEREMONIAL',
      title: 'Inaugural Ceremony: 13th Edition Concrete Fair 2026',
      desc: 'Traditional lamp lighting and address by the Principal of RV College of Engineering, HoD of Civil Engineering, and Keynote Speaker from ICI Bengaluru Chapter.',
      venue: 'RVCE Civil Auditorium',
      speaker: 'Faculty & ICI Leadership'
    },
    {
      time: '09:30 AM',
      category: 'TESTING LAB',
      title: 'CONmix: Mix Design Challenge (Quiz & Casting)',
      desc: 'Round 1: Technical quiz on mix design (15–20 mins). Round 2: Mix Design Challenge: prepare mix, perform slump test, cast 3 cubes. Specimens left to cure for 24-hour strength test.',
      venue: 'Concrete & Materials Testing Lab',
      speaker: 'Team Size: 3–4 participants'
    },
    {
      time: '11:00 AM',
      category: 'TESTING LAB',
      title: 'CONarch: Arch Design & Build',
      desc: 'Design with purpose. Build with precision. Round 1: Design an arch or bridge on paper. Round 2: Build the designed arch/bridge using provided materials.',
      venue: 'Structural Fabrication Yard',
      speaker: 'Team Size: 3–4 participants'
    },
    {
      time: '02:00 PM',
      category: 'COMPUTATIONAL',
      title: 'CONzine: Smart City Designing',
      desc: 'Imagine the cities of tomorrow and design a smarter future. Round 1: Technical crossword challenge. Round 2: Town planning drafting and presentation.',
      venue: 'CAD & GIS Modeling Studio',
      speaker: 'Team Size: 2–3 participants'
    },
    {
      time: '03:30 PM',
      category: 'TESTING LAB',
      title: 'CONmake: Model Making',
      desc: 'Visualize, create and build — transform raw materials into miniature masterpieces! Round 1: Dimension estimation by visual sight. Round 2: Miniature house with cement mortar & bricks.',
      venue: 'Masonry & Model Workshop',
      speaker: 'Team Size: 3 participants'
    }
  ],
  day2: [
    {
      time: '09:30 AM',
      category: 'TESTING LAB',
      title: 'CONmix Finale: 24-Hour CTM Destructive Cube Crushing',
      desc: 'Demoulded cubes from Day 1 are tested to failure under the 2000 kN Digital Compression Testing Machine to crown the CONmix Champion.',
      venue: 'Concrete & Materials Testing Lab',
      speaker: 'Team Size: 3–4 participants'
    },
    {
      time: '10:00 AM',
      category: 'COMPETITION',
      title: 'CONquest: Civil Engineering Quiz (Prelims & Stage Finale)',
      desc: 'Rigorous civil engineering blueprint decoding, rapid-fire, and high-voltage live buzzer rounds on structures, materials, and mega-projects.',
      venue: 'Civil Dept. Main Seminar Hall',
      speaker: 'Team Size: 2 participants'
    },
    {
      time: '11:30 AM',
      category: 'WORKSHOP',
      title: 'CONscope: Surveying Treasure Hunt & Escape Room',
      desc: 'Navigate the sprawling RVCE grounds using optical surveying instruments, decode cryptic coordinates, and unlock the engineering escape room.',
      venue: 'Campus Survey Grounds & Lab',
      speaker: 'Team Size: 3–4 participants'
    },
    {
      time: '01:30 PM',
      category: 'COMPETITION',
      title: 'CONfilm: Short Film Screening & CONfight: Debate Challenge',
      desc: 'Short film screening in the Media Auditorium alongside parliamentary infrastructure policy debates in Conference Suite 2.',
      venue: 'Media Studio & Conference Suite 2',
      speaker: 'Jury & Industry Panel'
    },
    {
      time: '04:30 PM',
      category: 'CEREMONIAL',
      title: 'Valedictory Ceremony & Prize Distribution',
      desc: 'Announcement of overall championship contingent, ICI student excellence awards, and distribution of certificates and cash prizes.',
      venue: 'RVCE Civil Auditorium',
      speaker: 'HoD Civil, ICI Bengaluru Chairman & Chief Guests'
    }
  ]
};

const FAQ_DATA = [
  {
    code: 'SPEC_01 //',
    q: 'Accommodation & Campus Lodging for Outstation Delegations',
    a: 'Subsidized hostel dormitory accommodation is reserved on the RVCE campus for accredited outstation university contingents from 29 November to 02 December. Private twin-sharing quarters are available for faculty mentors and industry delegates upon early request during registration. Campus dining halls serve all meals during the conclave.'
  },
  {
    code: 'SPEC_02 //',
    q: 'Team Eligibility & Inter-Disciplinary / Inter-College Rules',
    a: 'All undergraduate (B.E./B.Tech/B.Arch) and postgraduate (M.Tech/M.Arch) students from AICTE/UGC recognized institutions across India are eligible. Inter-disciplinary and cross-college teams are permitted for CONzine, CONfilm, and CONquest.'
  },
  {
    code: 'SPEC_03 //',
    q: 'Equipment & Laboratory Testing Protocols (Mandatory PPE Guidelines)',
    a: 'All raw materials—OPC 53 cement, standard aggregates, admixtures, bricks, mortar, and optical Total Stations—are provided on-site. Closed-toe shoes and protective eye goggles are strictly enforced inside Heavy Testing Bay A, the Structural Fabrication Yard, and the Materials Testing Lab.'
  },
  {
    code: 'SPEC_04 //',
    q: 'Certification & Continuing Professional Education (CPE) Credits',
    a: 'Every registered participant receives an official joint Participation Certificate endorsed by the Department of Civil Engineering, RV College of Engineering and the Indian Concrete Institute (ICI) Bengaluru Centre, eligible for AICTE Activity Points.'
  },
  {
    code: 'SPEC_05 //',
    q: 'Registration Deadlines & Capacity Limits for Testing Bays',
    a: 'To maintain strict safety and CTM slot allocations, laboratory events (CONmix, CONarch, and CONmake) are capped at 30 teams each on a first-registered basis. Spot registrations close at 08:30 AM on 30 November 2026.'
  }
];

// ============================================================================
// V-RAY 6 PROCEDURAL 1024x1024 CARVED BAS-RELIEF PBR TEXTURE SYNTHESIZER
// Synthesizes Khajuraho / Badami Sandstone Albedo, Sobel Tangent-Space Normal Map,
// Height/Bump, Roughness, & Cavity AO featuring:
// - Padma (Lotus Petal Mouldings)
// - Gajathara (Carved Marching Elephant Frieze Band - Image 3)
// - Ashvathara / Narathara (Cavalry & Narrative Frieze Band - Image 3)
// - Devakoshtha Arched Niches & Kirtimukha / Gavaksha Lattice Bands (Image 3)
// ============================================================================
function createVRayPBRStoneMaps() {
  const size = 1024;

  const diffCanvas = document.createElement('canvas');
  diffCanvas.width = size;
  diffCanvas.height = size;
  const dCtx = diffCanvas.getContext('2d');

  const bumpCanvas = document.createElement('canvas');
  bumpCanvas.width = size;
  bumpCanvas.height = size;
  const bCtx = bumpCanvas.getContext('2d');

  const roughCanvas = document.createElement('canvas');
  roughCanvas.width = size;
  roughCanvas.height = size;
  const rCtx = roughCanvas.getContext('2d');

  const aoCanvas = document.createElement('canvas');
  aoCanvas.width = size;
  aoCanvas.height = size;
  const aoCtx = aoCanvas.getContext('2d');

  // Warm Khajuraho / Badami Buff-Golden Sandstone Base
  dCtx.fillStyle = '#b98963';
  dCtx.fillRect(0, 0, size, size);

  bCtx.fillStyle = '#7c7c7c';
  bCtx.fillRect(0, 0, size, size);

  rCtx.fillStyle = '#a8a8a8';
  rCtx.fillRect(0, 0, size, size);

  aoCtx.fillStyle = '#ffffff';
  aoCtx.fillRect(0, 0, size, size);

  const courses = 32;
  const courseH = size / courses;

  for (let i = 0; i < courses; i++) {
    const y = i * courseH;

    // Deep bevelled stone course joints (AO + Bump + Dark Mortar)
    dCtx.fillStyle = i % 3 === 0 ? '#3d2214' : '#563421';
    dCtx.fillRect(0, y, size, 4);

    bCtx.fillStyle = '#0c0c0c';
    bCtx.fillRect(0, y, size, 5);
    bCtx.fillStyle = '#d8d8d8';
    bCtx.fillRect(0, y + 5, size, 3);

    aoCtx.fillStyle = '#242424';
    aoCtx.fillRect(0, y, size, 6);
    aoCtx.fillStyle = '#9e9e9e';
    aoCtx.fillRect(0, y + 6, size, 4);

    rCtx.fillStyle = '#ececec';
    rCtx.fillRect(0, y, size, 5);

    // Subtle ashlar stone block color variation
    const toneShift =
      (i * 17) % 3 === 0
        ? 'rgba(242, 200, 155, 0.18)'
        : (i * 17) % 3 === 1
        ? 'rgba(72, 38, 22, 0.14)'
        : 'rgba(195, 132, 88, 0.16)';
    dCtx.fillStyle = toneShift;
    dCtx.fillRect(0, y + 4, size, courseH - 4);

    // Band Type 1: Carved Devakoshtha Niches with Standing Deity Reliefs (every 4th course, matching Image 3)
    if (i % 4 === 0) {
      const niches = 16;
      const nW = size / niches;
      for (let n = 0; n < niches; n++) {
        const nx = n * nW;
        // Deep recessed niche shadow
        dCtx.fillStyle = 'rgba(42, 20, 12, 0.58)';
        dCtx.fillRect(nx + 6, y + 5, nW - 12, courseH - 8);
        aoCtx.fillStyle = '#333333';
        aoCtx.fillRect(nx + 6, y + 5, nW - 12, courseH - 8);
        bCtx.fillStyle = '#222222';
        bCtx.fillRect(nx + 6, y + 5, nW - 12, courseH - 8);

        // Torana multifoil arch crown over niche
        dCtx.fillStyle = '#dfb185';
        dCtx.beginPath();
        dCtx.arc(nx + nW * 0.5, y + 9, nW * 0.34, Math.PI, 0);
        dCtx.fill();
        bCtx.fillStyle = '#f2f2f2';
        bCtx.beginPath();
        bCtx.arc(nx + nW * 0.5, y + 9, nW * 0.34, Math.PI, 0);
        bCtx.fill();

        // Sculpted Deity / Apsara Figure in High Relief inside Niche
        dCtx.fillStyle = '#e7be96';
        dCtx.beginPath();
        dCtx.arc(nx + nW * 0.5, y + courseH * 0.34, 3.5, 0, Math.PI * 2); // Head
        dCtx.fill();
        dCtx.fillRect(nx + nW * 0.5 - 4, y + courseH * 0.44, 8, courseH * 0.42); // Torso & drapery

        bCtx.fillStyle = '#ffffff';
        bCtx.beginPath();
        bCtx.arc(nx + nW * 0.5, y + courseH * 0.34, 3.8, 0, Math.PI * 2);
        bCtx.fill();
        bCtx.fillRect(nx + nW * 0.5 - 4.5, y + courseH * 0.44, 9, courseH * 0.42);

        // Flanking Diamond Pilasters
        dCtx.fillStyle = '#cfa077';
        dCtx.fillRect(nx + 2, y + 4, 3, courseH - 6);
        dCtx.fillRect(nx + nW - 5, y + 4, 3, courseH - 6);
        bCtx.fillStyle = '#dedede';
        bCtx.fillRect(nx + 2, y + 4, 3, courseH - 6);
        bCtx.fillRect(nx + nW - 5, y + 4, 3, courseH - 6);
      }
    } else if (i % 4 === 1) {
      // Band Type 2: Gajathara (Continuous Row of Carved Marching Elephants - Image 3)
      const elephants = 32;
      const eW = size / elephants;
      for (let e = 0; e < elephants; e++) {
        const ex = e * eW;
        // Dark undercut cavity behind elephants
        dCtx.fillStyle = 'rgba(35, 16, 9, 0.62)';
        dCtx.fillRect(ex + 2, y + 5, eW - 4, courseH - 8);
        aoCtx.fillStyle = '#2c2c2c';
        aoCtx.fillRect(ex + 2, y + 5, eW - 4, courseH - 8);
        bCtx.fillStyle = '#1c1c1c';
        bCtx.fillRect(ex + 2, y + 5, eW - 4, courseH - 8);

        // High-relief Elephant Head, Ears, Trunk & Forelegs
        dCtx.fillStyle = '#e5bc93';
        dCtx.beginPath();
        dCtx.arc(ex + eW * 0.5, y + courseH * 0.45, eW * 0.28, 0, Math.PI * 2);
        dCtx.fill();
        // Trunk & legs
        dCtx.fillRect(ex + eW * 0.42, y + courseH * 0.45, eW * 0.16, courseH * 0.45);
        dCtx.fillRect(ex + eW * 0.22, y + courseH * 0.55, eW * 0.14, courseH * 0.35);
        dCtx.fillRect(ex + eW * 0.64, y + courseH * 0.55, eW * 0.14, courseH * 0.35);

        bCtx.fillStyle = '#fafafa';
        bCtx.beginPath();
        bCtx.arc(ex + eW * 0.5, y + courseH * 0.45, eW * 0.3, 0, Math.PI * 2);
        bCtx.fill();
        bCtx.fillRect(ex + eW * 0.42, y + courseH * 0.45, eW * 0.16, courseH * 0.45);
      }
    } else if (i % 4 === 2) {
      // Band Type 3: Gavaksha (Chaitya Sun-Window Arch) & Kirtimukha Frieze
      const motifs = 40;
      const mW = size / motifs;
      for (let m = 0; m < motifs; m++) {
        const mx = m * mW;
        dCtx.fillStyle = 'rgba(46, 22, 13, 0.48)';
        dCtx.beginPath();
        dCtx.arc(mx + mW * 0.5, y + courseH * 0.55, mW * 0.36, 0, Math.PI * 2);
        dCtx.fill();

        bCtx.fillStyle = '#f0f0f0';
        bCtx.strokeStyle = '#f0f0f0';
        bCtx.lineWidth = 2.5;
        bCtx.beginPath();
        bCtx.arc(mx + mW * 0.5, y + courseH * 0.55, mW * 0.34, 0, Math.PI * 2);
        bCtx.stroke();

        dCtx.strokeStyle = '#ecc59c';
        dCtx.lineWidth = 2;
        dCtx.beginPath();
        dCtx.arc(mx + mW * 0.5, y + courseH * 0.55, mW * 0.34, 0, Math.PI * 2);
        dCtx.stroke();
      }
    } else {
      // Band Type 4: Padma Lotus Petals & Geometric Ratnapattika Diamond Band
      const petals = 48;
      const pW = size / petals;
      for (let p = 0; p < petals; p++) {
        const px = p * pW;
        dCtx.fillStyle = '#e0b388';
        dCtx.beginPath();
        dCtx.moveTo(px + 2, y + courseH - 3);
        dCtx.lineTo(px + pW * 0.5, y + 5);
        dCtx.lineTo(px + pW - 2, y + courseH - 3);
        dCtx.closePath();
        dCtx.fill();

        bCtx.fillStyle = '#e8e8e8';
        bCtx.beginPath();
        bCtx.moveTo(px + 2, y + courseH - 3);
        bCtx.lineTo(px + pW * 0.5, y + 5);
        bCtx.lineTo(px + pW - 2, y + courseH - 3);
        bCtx.closePath();
        bCtx.fill();
      }
    }

    // Vertical ashlar masonry joints
    const blocks = 8 + (i % 4);
    const bW = size / blocks;
    for (let j = 0; j < blocks; j++) {
      const x = Math.floor(((j + (i % 2) * 0.45) * bW) % size);
      dCtx.fillStyle = '#472818';
      dCtx.fillRect(x, y, 2.5, courseH);
      bCtx.fillStyle = '#1e1e1e';
      bCtx.fillRect(x, y, 3, courseH);
      aoCtx.fillStyle = '#424242';
      aoCtx.fillRect(x, y, 4, courseH);
    }
  }

  // High-frequency lithic grain, quartz speckles & weathering patina
  for (let n = 0; n < 26000; n++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const sz = Math.random() * 2.5 + 0.5;
    const darkPore = Math.random() > 0.48;
    dCtx.fillStyle = darkPore ? 'rgba(42, 20, 12, 0.18)' : 'rgba(252, 222, 188, 0.16)';
    dCtx.fillRect(x, y, sz, sz);
    bCtx.fillStyle = darkPore ? 'rgba(24, 24, 24, 0.32)' : 'rgba(242, 242, 242, 0.28)';
    bCtx.fillRect(x, y, sz, sz);
  }

  // Weathering & Rainwater Vertical Streaks
  for (let s = 0; s < 85; s++) {
    const sx = Math.random() * size;
    const sy = Math.random() * size;
    const sw = 8 + Math.random() * 20;
    const sh = 80 + Math.random() * 240;
    const grad = rCtx.createLinearGradient(sx, sy, sx, sy + sh);
    grad.addColorStop(0, 'rgba(28, 28, 28, 0.55)');
    grad.addColorStop(0.5, 'rgba(40, 40, 40, 0.35)');
    grad.addColorStop(1, 'rgba(130, 130, 130, 0)');
    rCtx.fillStyle = grad;
    rCtx.fillRect(sx, sy, sw, sh);

    dCtx.fillStyle = 'rgba(38, 18, 10, 0.10)';
    dCtx.fillRect(sx, sy, sw, sh);
  }

  // Derive a Tangent-Space Normal Map from the 1024x1024 Height/Bump Map via Sobel filter
  const normalCanvas = document.createElement('canvas');
  normalCanvas.width = size;
  normalCanvas.height = size;
  const nCtx = normalCanvas.getContext('2d');
  const srcData = bCtx.getImageData(0, 0, size, size).data;
  const normImg = nCtx.createImageData(size, size);
  const dstData = normImg.data;
  const strength = 3.8;

  const getH = (px, py) => {
    const cx = (px + size) % size;
    const cy = (py + size) % size;
    return srcData[(cy * size + cx) * 4] / 255.0;
  };

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const tl = getH(x - 1, y - 1);
      const t = getH(x, y - 1);
      const tr = getH(x + 1, y - 1);
      const l = getH(x - 1, y);
      const r = getH(x + 1, y);
      const bl = getH(x - 1, y + 1);
      const b = getH(x, y + 1);
      const br = getH(x + 1, y + 1);

      const dX = tr + 2 * r + br - (tl + 2 * l + bl);
      const dY = bl + 2 * b + br - (tl + 2 * t + tr);
      const dZ = 1.0 / strength;

      const len = Math.hypot(dX, dY, dZ) || 1;
      const nx = ((dX / len) * 0.5 + 0.5) * 255;
      const ny = ((-dY / len) * 0.5 + 0.5) * 255;
      const nz = ((dZ / len) * 0.5 + 0.5) * 255;

      const idx = (y * size + x) * 4;
      dstData[idx] = nx;
      dstData[idx + 1] = ny;
      dstData[idx + 2] = nz;
      dstData[idx + 3] = 255;
    }
  }
  nCtx.putImageData(normImg, 0, 0);

  // Create Radial Glow Sprite Texture for Volumetric Sanctum Lamps & Sun Glare
  const glowCanvas = document.createElement('canvas');
  glowCanvas.width = 256;
  glowCanvas.height = 256;
  const gCtx = glowCanvas.getContext('2d');
  const gGrad = gCtx.createRadialGradient(128, 128, 2, 128, 128, 128);
  gGrad.addColorStop(0, 'rgba(255, 244, 214, 1)');
  gGrad.addColorStop(0.24, 'rgba(255, 175, 75, 0.72)');
  gGrad.addColorStop(0.55, 'rgba(220, 85, 30, 0.25)');
  gGrad.addColorStop(1, 'rgba(40, 5, 20, 0)');
  gCtx.fillStyle = gGrad;
  gCtx.fillRect(0, 0, 256, 256);

  const cfgTex = (canvas, repeatX = 2, repeatY = 2, isSRGB = false) => {
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(repeatX, repeatY);
    if (isSRGB && 'colorSpace' in tex) {
      tex.colorSpace = THREE.SRGBColorSpace;
    }
    tex.needsUpdate = true;
    return tex;
  };

  return {
    map: cfgTex(diffCanvas, 2, 2, true),
    normalMap: cfgTex(normalCanvas, 2, 2, false),
    bumpMap: cfgTex(bumpCanvas, 2, 2, false),
    roughnessMap: cfgTex(roughCanvas, 2, 2, false),
    aoMap: cfgTex(aoCanvas, 2, 2, false),
    glowTex: new THREE.CanvasTexture(glowCanvas)
  };
}

// ============================================================================
// CUSTOM GLSL V-RAY VOLUMETRIC ATMOSPHERIC SKY, CLOUDS & GOD-RAYS SHADER
// Supports Sunset Storm, Khajuraho Golden Hour (Image 4), & Clear Azure Day (Image 5)
// ============================================================================
const VRAY_SKY_VERTEX_SHADER = `
  varying vec3 vWorldPosition;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPosition.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPosition;
  }
`;

const VRAY_SKY_FRAGMENT_SHADER = `
  uniform float uTime;
  uniform vec3 uSunDirection;
  uniform vec3 uZenithColor;
  uniform vec3 uHorizonColor;
  uniform vec3 uCloudTint;
  uniform float uLightning;
  uniform float uStorminess;
  varying vec3 vWorldPosition;
  varying vec2 vUv;

  // 3D Procedural Hash & FBM for Volumetric Storm Clouds
  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    mat2 rot = mat2(0.8, -0.6, 0.6, 0.8);
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p = rot * p * 2.03;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec3 dir = normalize(vWorldPosition);
    float elevation = clamp(dir.y, -0.15, 1.0);

    // Rayleigh / Mie Horizon-to-Zenith Atmospheric Gradient
    float horizonFactor = pow(1.0 - max(elevation, 0.0), 2.35);
    vec3 skyCol = mix(uZenithColor, uHorizonColor, horizonFactor);

    // Solar Disc & Mie Scattering Halo + Crepuscular God-Rays
    vec3 sunDir = normalize(uSunDirection);
    float sunCos = max(dot(dir, sunDir), 0.0);
    float mieHalo = pow(sunCos, 6.0) * 0.55 + pow(sunCos, 48.0) * 0.95;
    float sunCore = smoothstep(0.9965, 0.9992, sunCos);

    // Radial God-Ray Modulation
    float rayAngle = atan(dir.y - sunDir.y, dir.x - sunDir.x);
    float godRays = (0.65 + 0.35 * sin(rayAngle * 14.0 + uTime * 0.4) * cos(rayAngle * 7.0 - uTime * 0.25))
                    * pow(sunCos, 3.2) * 0.45;

    skyCol += uCloudTint * (mieHalo + godRays);
    skyCol += vec3(1.0, 0.94, 0.82) * sunCore * 2.2;

    // Volumetric Layered Storm Clouds in Upper Hemisphere
    if (dir.y > -0.05) {
      vec2 cloudUV = dir.xz / (max(dir.y, 0.06) + 0.22) * 1.45;
      cloudUV.x += uTime * 0.018;
      cloudUV.y -= uTime * 0.009;

      float c1 = fbm(cloudUV * 1.3);
      float c2 = fbm(cloudUV * 2.7 - vec2(uTime * 0.012, 0.0));
      float cloudDensity = smoothstep(0.38 - uStorminess * 0.14, 0.82, c1 * 0.68 + c2 * 0.32);

      // Cloud self-shadowing + warm sunset silver-lining rim near sun
      vec3 darkCloudBase = mix(vec3(0.08, 0.02, 0.06), uZenithColor * 0.65, 0.4);
      vec3 rimLight = uCloudTint * pow(sunCos, 2.2) * 1.55 * (1.0 - c2 * 0.6);
      vec3 lightningGlow = vec3(0.78, 0.88, 1.0) * uLightning * smoothstep(0.45, 0.8, c1);

      vec3 finalCloudCol = darkCloudBase + rimLight + lightningGlow;
      float horizonFade = smoothstep(-0.02, 0.22, dir.y);
      skyCol = mix(skyCol, finalCloudCol, cloudDensity * horizonFade * (0.68 + 0.25 * uStorminess));
    }

    gl_FragColor = vec4(skyCol, 1.0);
  }
`;

// ============================================================================
// PHOTOREALISTIC V-RAY 6 THREE.JS WEBGL ENGINE COMPONENT
// Models the Complete 5-Part Axial Indian Temple Architecture from Images 1-6:
// - High Jagati Terrace + Grand Sopana Stairway + Prakara Sanctuary Bounds
// - Axial Progression: Ardha-Mandapa -> Mandapa -> Maha-Mandapa -> Antarala -> Garbhagriha
// - Cascading Phamsana Pyramid Roofs leading up to the Clustered Sekhari Shikhara
// - 3D Gajathara Elephant Plinth Friezes, Devakoshtha Deity Niches & Rearing Yali/Horse Pillars
// - Archaeological Lawn, Crimson Bougainvillea Hedges, & Swaying Banyan/Neem Trees
// ============================================================================
function ThreeMonumentCanvas({
  preset = 'shikhara', // 'shikhara' | 'pagoda' | 'diagrid'
  weather = 'clear', // 'storm' | 'clear' | 'mist'
  timeOfDay = 'golden', // 'sunset' | 'golden' | 'daylight' | 'night'
  cameraPreset = 'threeQuarter', // 'threeQuarter' (Img 5) | 'frontElevation' (Img 4) | 'sideElevation' (Img 1/2) | 'plinthCloseup' (Img 3/6) | 'vastuPlan' (Img 1/2 Top)
  showVastuGrid = false,
  wireframeOverlay = false,
  autoRotate = true,
  fullInteractive = false,
  vrayExposure = 1.22,
  vrayWetness = 0.35,
  vrayBloom = 0.85,
  vrayPass = 'beauty' // 'beauty' | 'specular' | 'normals' | 'clay'
}) {
  const mountRef = useRef(null);
  const orbitRef = useRef({
    theta: 0.62,
    phi: 1.34,
    targetTheta: 0.62,
    targetPhi: 1.34,
    radius: 42.0,
    targetRadius: 42.0,
    lookY: 8.2,
    targetLookY: 8.2,
    lookZ: 3.5,
    targetLookZ: 3.5,
    isDragging: false,
    lastX: 0,
    lastY: 0
  });

  // Synchronize Camera Angle with Reference Image Presets (Images 1–6)
  useEffect(() => {
    const orb = orbitRef.current;
    if (cameraPreset === 'frontElevation') {
      // Image 4: Symmetrical Front Elevation looking up the Sopana stairs & cascading spires
      orb.targetTheta = 0.02;
      orb.targetPhi = 1.41;
      orb.targetRadius = 39.5;
      orb.targetLookY = 8.5;
      orb.targetLookZ = 4.0;
    } else if (cameraPreset === 'threeQuarter') {
      // Image 5: Dramatic Three-Quarter Perspective showing Shikhara + Mandapa cascade
      orb.targetTheta = 0.64;
      orb.targetPhi = 1.35;
      orb.targetRadius = 41.0;
      orb.targetLookY = 8.4;
      orb.targetLookZ = 3.2;
    } else if (cameraPreset === 'sideElevation') {
      // Images 1 & 2: Architectural Longitudinal Profile (Garbhagriha -> Mandapa -> Ardha-Mandapa)
      orb.targetTheta = 1.54;
      orb.targetPhi = 1.38;
      orb.targetRadius = 45.0;
      orb.targetLookY = 7.8;
      orb.targetLookZ = 3.2;
    } else if (cameraPreset === 'plinthCloseup') {
      // Images 3 & 6: Macro Zoom on Carved Gajathara Elephant Plinth, Devakoshtha Niches & Rearing Yali Cavalry Pillars
      orb.targetTheta = 0.42;
      orb.targetPhi = 1.43;
      orb.targetRadius = 18.5;
      orb.targetLookY = 3.2;
      orb.targetLookZ = 8.5;
    } else if (cameraPreset === 'vastuPlan') {
      // Images 1 & 2: Vastu Purusha Mandala (81-Grid) Top-Down Plan View
      orb.targetTheta = 0.0;
      orb.targetPhi = 0.18;
      orb.targetRadius = 56.0;
      orb.targetLookY = 2.0;
      orb.targetLookZ = 2.5;
    }
  }, [cameraPreset]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. V-Ray Physical WebGLRenderer Setup with ACES Filmic HDR Tone Mapping
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    if ('outputColorSpace' in renderer) {
      renderer.outputColorSpace = THREE.SRGBColorSpace;
    }
    const baseExp =
      timeOfDay === 'night'
        ? 0.92
        : timeOfDay === 'daylight'
        ? 1.34
        : timeOfDay === 'golden'
        ? 1.28
        : 1.16;
    renderer.toneMappingExposure = baseExp * vrayExposure;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 2. Scene & Atmospheric Exponential Haze
    const scene = new THREE.Scene();
    const fogColorHex =
      timeOfDay === 'night'
        ? 0x0b0312
        : timeOfDay === 'daylight'
        ? 0xc8dff5
        : timeOfDay === 'golden'
        ? 0x592622
        : 0x240716;
    const fogDensity =
      weather === 'mist'
        ? 0.016
        : weather === 'storm'
        ? 0.011
        : timeOfDay === 'daylight'
        ? 0.0038
        : 0.0058;
    scene.fog = new THREE.FogExp2(fogColorHex, fogDensity);
    scene.background = new THREE.Color(fogColorHex);

    // 3. V-Ray Physical PerspectiveCamera (35mm Architectural Tilt-Shift Framing)
    const camera = new THREE.PerspectiveCamera(
      38,
      container.clientWidth / container.clientHeight,
      0.5,
      380
    );

    const updateCameraViewOffset = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      if (!fullInteractive && w > 960) {
        camera.setViewOffset(w, h, -w * 0.14, 0, w, h);
      } else {
        camera.clearViewOffset();
      }
      camera.updateProjectionMatrix();
    };
    updateCameraViewOffset();

    // 4. Custom GLSL V-Ray Volumetric Sky Dome (Golden Hour, Clear Azure Day, Sunset Storm, Night)
    const skyColors = {
      daylight: {
        zenith: '#1e6bd6',
        horizon: '#d8ecff',
        cloud: '#ffffff',
        sunDir: new THREE.Vector3(0.45, 0.52, 0.65).normalize()
      },
      golden: {
        zenith: '#2b1838',
        horizon: '#f29b5e',
        cloud: '#ffd194',
        sunDir: new THREE.Vector3(-0.48, 0.22, -0.84).normalize()
      },
      sunset: {
        zenith: '#140310',
        horizon: '#c8422b',
        cloud: '#ff8e47',
        sunDir: new THREE.Vector3(-0.42, 0.14, -0.88).normalize()
      },
      night: {
        zenith: '#05010a',
        horizon: '#280e36',
        cloud: '#7c6aa8',
        sunDir: new THREE.Vector3(-0.35, 0.25, -0.85).normalize()
      }
    };
    const activeSky = skyColors[timeOfDay] || skyColors.golden;

    const skyUniforms = {
      uTime: { value: 0 },
      uSunDirection: { value: activeSky.sunDir },
      uZenithColor: { value: new THREE.Color(activeSky.zenith) },
      uHorizonColor: { value: new THREE.Color(activeSky.horizon) },
      uCloudTint: { value: new THREE.Color(activeSky.cloud) },
      uLightning: { value: 0.0 },
      uStorminess: {
        value: weather === 'storm' ? 0.88 : weather === 'mist' ? 0.58 : 0.25
      }
    };

    const skyMat = new THREE.ShaderMaterial({
      vertexShader: VRAY_SKY_VERTEX_SHADER,
      fragmentShader: VRAY_SKY_FRAGMENT_SHADER,
      uniforms: skyUniforms,
      side: THREE.BackSide,
      depthWrite: false
    });
    const skyDome = new THREE.Mesh(new THREE.SphereGeometry(210, 48, 32), skyMat);
    scene.add(skyDome);

    // 5. Real-time V-Ray HDR Environment Reflection Map via PMREMGenerator
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    const envScene = new THREE.Scene();
    const envSkyClone = new THREE.Mesh(new THREE.SphereGeometry(65, 24, 16), skyMat.clone());
    envScene.add(envSkyClone);
    const envBounceLight = new THREE.PointLight(
      timeOfDay === 'daylight' ? 0xfff0d4 : 0xff9b48,
      9,
      60
    );
    envBounceLight.position.set(12, -10, 15);
    envScene.add(envBounceLight);
    const envRT = pmremGenerator.fromScene(envScene, 0.03);
    scene.environment = envRT.texture;

    // 6. V-Ray Multi-Light Architectural Rig
    const hemiLight = new THREE.HemisphereLight(
      timeOfDay === 'daylight'
        ? 0xe8f4ff
        : timeOfDay === 'night'
        ? 0x453568
        : 0xffb884,
      timeOfDay === 'daylight' ? 0x5c6e46 : 0x240b14,
      timeOfDay === 'daylight' ? 1.25 : timeOfDay === 'night' ? 0.6 : 0.95
    );
    scene.add(hemiLight);

    // Primary V-Ray Sun Key Light with High-Resolution 2048x2048 Soft Shadows
    const sunLight = new THREE.DirectionalLight(
      timeOfDay === 'daylight'
        ? 0xfff7e6
        : timeOfDay === 'night'
        ? 0x9ab4ff
        : timeOfDay === 'golden'
        ? 0xffb36b
        : 0xff8244,
      timeOfDay === 'daylight' ? 4.2 : timeOfDay === 'night' ? 1.5 : 3.8
    );
    if (timeOfDay === 'daylight') {
      sunLight.position.set(42, 48, 46);
    } else {
      sunLight.position.set(-44, 28, 36);
    }
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 6;
    sunLight.shadow.camera.far = 165;
    const shadowBound = 36;
    sunLight.shadow.camera.left = -shadowBound;
    sunLight.shadow.camera.right = shadowBound;
    sunLight.shadow.camera.top = shadowBound;
    sunLight.shadow.camera.bottom = -shadowBound;
    sunLight.shadow.bias = -0.00035;
    scene.add(sunLight);

    // Secondary grazing fill light to accentuate carved stone reliefs (Images 3, 5, 6)
    const reliefRimLight = new THREE.DirectionalLight(
      timeOfDay === 'daylight' ? 0xd8ecff : 0xffa663,
      1.65
    );
    reliefRimLight.position.set(42, 19, -32);
    scene.add(reliefRimLight);

    // Sanctum Garbhagriha, Maha-Mandapa & Ardha-Mandapa Oil Lamp PointLights
    const sanctumLight1 = new THREE.PointLight(0xff962e, 7.5, 22, 1.5);
    sanctumLight1.position.set(0, 4.2, -3.5);
    scene.add(sanctumLight1);

    const sanctumLight2 = new THREE.PointLight(0xff781c, 5.5, 19, 1.5);
    sanctumLight2.position.set(0, 4.0, 5.2);
    scene.add(sanctumLight2);

    const porchLampLight = new THREE.PointLight(0xffaa44, 4.5, 16, 1.5);
    porchLampLight.position.set(0, 3.8, 13.5);
    scene.add(porchLampLight);

    // Dynamic Lightning Bolt Illumination
    const lightningLight = new THREE.DirectionalLight(0xdceaff, 0);
    lightningLight.position.set(18, 75, -35);
    scene.add(lightningLight);

    // 7. Synthesize 1024x1024 V-Ray PBR Carved Sandstone Maps & Physical Materials
    const pbrMaps = createVRayPBRStoneMaps();
    const effectiveWetness = weather === 'storm' ? Math.max(0.75, vrayWetness) : vrayWetness;

    const createPhysicalMaterial = (opts) => {
      if (vrayPass === 'normals') {
        return new THREE.MeshNormalMaterial({ wireframe: wireframeOverlay });
      }
      if (vrayPass === 'clay') {
        return new THREE.MeshStandardMaterial({
          color: 0xd8c2ab,
          roughness: 0.52,
          metalness: 0.05,
          normalMap: pbrMaps.normalMap,
          normalScale: new THREE.Vector2(1.4, 1.4),
          bumpMap: pbrMaps.bumpMap,
          bumpScale: 0.14,
          wireframe: wireframeOverlay
        });
      }
      if (vrayPass === 'specular') {
        return new THREE.MeshPhysicalMaterial({
          color: 0x090909,
          roughness: 0.08,
          metalness: 0.85,
          normalMap: pbrMaps.normalMap,
          normalScale: new THREE.Vector2(1.5, 1.5),
          clearcoat: 1.0,
          clearcoatRoughness: 0.06,
          envMapIntensity: 2.5,
          wireframe: wireframeOverlay
        });
      }
      return new THREE.MeshPhysicalMaterial({
        ...opts,
        wireframe: wireframeOverlay
      });
    };

    // Main Khajuraho Golden-Buff Carved Sandstone (Images 3, 4, 5, 6)
    const mainStoneMat = createPhysicalMaterial({
      map: pbrMaps.map,
      color: new THREE.Color('#dba97e'),
      normalMap: pbrMaps.normalMap,
      normalScale: new THREE.Vector2(1.55, 1.55),
      bumpMap: pbrMaps.bumpMap,
      bumpScale: 0.18,
      roughnessMap: pbrMaps.roughnessMap,
      aoMap: pbrMaps.aoMap,
      aoMapIntensity: 0.92,
      roughness: Math.max(0.24, 0.76 - effectiveWetness * 0.42),
      metalness: 0.06,
      clearcoat: effectiveWetness * 0.85,
      clearcoatRoughness: 0.14,
      reflectivity: 0.82,
      envMapIntensity: 1.65
    });

    // Darker Weathered Ochre-Umber Plinth & Cornice Sandstone (Mouldings & Recesses)
    const darkPlinthStoneMat = createPhysicalMaterial({
      map: pbrMaps.map,
      color: new THREE.Color('#9c6b49'),
      normalMap: pbrMaps.normalMap,
      normalScale: new THREE.Vector2(1.75, 1.75),
      bumpMap: pbrMaps.bumpMap,
      bumpScale: 0.22,
      roughnessMap: pbrMaps.roughnessMap,
      aoMap: pbrMaps.aoMap,
      aoMapIntensity: 0.96,
      roughness: Math.max(0.2, 0.72 - effectiveWetness * 0.45),
      metalness: 0.1,
      clearcoat: effectiveWetness * 0.92,
      clearcoatRoughness: 0.1,
      envMapIntensity: 1.75
    });

    // High-Relief Sculptural Cream-Buff Sandstone (Elephants, Deities, Yali Cavalry in Images 3 & 6)
    const reliefSculptureMat = createPhysicalMaterial({
      map: pbrMaps.map,
      color: new THREE.Color('#ecc39b'),
      normalMap: pbrMaps.normalMap,
      normalScale: new THREE.Vector2(1.25, 1.25),
      roughness: 0.48,
      metalness: 0.05,
      clearcoat: effectiveWetness * 0.65,
      envMapIntensity: 1.5
    });

    // Brushed Sacred Gold Kalasha Finial Material
    const goldKalashaMat = createPhysicalMaterial({
      color: new THREE.Color('#ffd37a'),
      roughness: 0.15,
      metalness: 0.95,
      clearcoat: 0.85,
      clearcoatRoughness: 0.08,
      emissive: new THREE.Color('#5c2e00'),
      emissiveIntensity: 0.38,
      envMapIntensity: 2.4
    });

    const glowingSanctumMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#ffae42')
    });

    const createGlowSprite = (scale = 3.5, colorHex = 0xff9d3b, opacity = 0.85) => {
      const sMat = new THREE.SpriteMaterial({
        map: pbrMaps.glowTex,
        color: colorHex,
        transparent: true,
        opacity: opacity * vrayBloom,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      const sprite = new THREE.Sprite(sMat);
      sprite.scale.set(scale, scale, 1);
      return sprite;
    };

    // Helper: Create Saptaratha / Pancharatha Stepped Hindu Temple Layer with Kapota Cornices
    const createPancharathaLayer = (width, height, depth, indentRatio = 0.22, mat = mainStoneMat) => {
      const group = new THREE.Group();
      const addPart = (w, h, d) => {
        const geo = new THREE.BoxGeometry(w, h, d);
        if (geo.attributes.uv && !geo.attributes.uv2) {
          geo.setAttribute('uv2', geo.attributes.uv);
        }
        const mesh = new THREE.Mesh(geo, mat);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        group.add(mesh);
      };

      // Central Bhadra orthogonal cross
      addPart(width, height, depth * 0.54);
      addPart(width * 0.54, height, depth);
      // Intermediate Pratiratha offsets
      addPart(width * (1 - indentRatio * 0.42), height, depth * (1 - indentRatio * 0.42));
      // Sub-offset Anuratha
      addPart(width * (1 - indentRatio * 0.72), height, depth * (1 - indentRatio * 0.72));
      // Corner Karna projections
      addPart(width * (1 - indentRatio), height * 1.01, depth * (1 - indentRatio));
      // Overhanging Kapota drip-molding lip
      if (height > 0.4) {
        addPart(width * 1.04, height * 0.16, depth * 0.56);
        addPart(width * 0.56, height * 0.16, depth * 1.04);
      }
      return group;
    };

    // Helper: Create Clustered Subsidiary Spirelet (Urushringa) with Ribbed Amalaka & Kalasha (Images 4 & 5)
    const createUrushringa = (baseW, totalH, mat = mainStoneMat) => {
      const uruGroup = new THREE.Group();
      const tiers = 8;
      for (let i = 0; i < tiers; i++) {
        const t = i / tiers;
        const layerH = totalH / tiers;
        const scale = Math.pow(1 - t * 0.72, 0.68);
        const w = baseW * scale;
        const layer = createPancharathaLayer(
          w,
          layerH * 0.88,
          w,
          0.22,
          i % 2 === 0 ? mat : darkPlinthStoneMat
        );
        layer.position.y = i * layerH + layerH / 2;
        uruGroup.add(layer);
      }
      const miniAmalaka = new THREE.Mesh(
        new THREE.CylinderGeometry(baseW * 0.21, baseW * 0.25, totalH * 0.08, 16),
        reliefSculptureMat
      );
      miniAmalaka.position.y = totalH + totalH * 0.04;
      uruGroup.add(miniAmalaka);

      const miniKalasha = new THREE.Mesh(
        new THREE.ConeGeometry(baseW * 0.1, totalH * 0.14, 12),
        goldKalashaMat
      );
      miniKalasha.position.y = totalH + totalH * 0.14;
      uruGroup.add(miniKalasha);

      return uruGroup;
    };

    // Helper: Stepped Phamsana Pyramid Roof with Ribbed Ghanta Bell Finial (Mandapa & Ardha-Mandapa in Images 1, 2, 4, 5)
    const createPhamsanaRoof = (baseW, baseD, totalH, tiers = 9) => {
      const roofGroup = new THREE.Group();
      const tierH = totalH / tiers;
      for (let i = 0; i < tiers; i++) {
        const t = i / tiers;
        const scale = Math.pow(1 - t * 0.78, 0.82);
        const w = baseW * scale;
        const d = baseD * scale;
        const stepLayer = createPancharathaLayer(
          w,
          tierH * 0.85,
          d,
          0.18,
          i % 2 === 0 ? mainStoneMat : darkPlinthStoneMat
        );
        stepLayer.position.y = i * tierH + tierH * 0.45;
        roofGroup.add(stepLayer);

        // Miniature corner Kuta finials along the stepped pyramid edges (Image 5)
        if (i % 2 === 0 && i < tiers - 2) {
          const kx = w * 0.44;
          const kz = d * 0.44;
          [
            [-kx, -kz],
            [kx, -kz],
            [-kx, kz],
            [kx, kz]
          ].forEach(([cx, cz]) => {
            const kuta = new THREE.Mesh(
              new THREE.ConeGeometry(0.22 * (1 - t * 0.5), 0.52, 8),
              reliefSculptureMat
            );
            kuta.position.set(cx, i * tierH + tierH, cz);
            roofGroup.add(kuta);
          });
        }
      }
      // Crown Amalaka + Kalasha on Pyramid Apex
      const bell = new THREE.Mesh(
        new THREE.CylinderGeometry(baseW * 0.09, baseW * 0.13, 0.65, 16),
        reliefSculptureMat
      );
      bell.position.y = totalH + 0.3;
      roofGroup.add(bell);

      const finial = new THREE.Mesh(
        new THREE.ConeGeometry(baseW * 0.055, 1.15, 14),
        goldKalashaMat
      );
      finial.position.y = totalH + 1.05;
      roofGroup.add(finial);
      return roofGroup;
    };

    // Helper: 3D Sculpted Rearing Horse / Yali (Vyala) Cavalry Bracket Column (Image 6)
    const createYaliSculptedColumn = (colHeight = 3.8, facingDir = 1) => {
      const colGroup = new THREE.Group();

      // 1. Carved Pedestal Base with miniature deity panels (bottom of Image 6)
      const ped1 = new THREE.Mesh(new THREE.BoxGeometry(1.05, 0.55, 1.05), darkPlinthStoneMat);
      ped1.position.y = 0.275;
      colGroup.add(ped1);

      const ped2 = new THREE.Mesh(new THREE.BoxGeometry(0.88, 0.65, 0.88), reliefSculptureMat);
      ped2.position.y = 0.85;
      colGroup.add(ped2);

      // 2. Main Octagonal & Fluted Shaft with Kirtimukha bands
      const shaft = new THREE.Mesh(
        new THREE.CylinderGeometry(0.34, 0.4, colHeight - 1.4, 8),
        mainStoneMat
      );
      shaft.position.y = 0.85 + (colHeight - 1.4) * 0.5;
      shaft.castShadow = true;
      colGroup.add(shaft);

      // Decorative Horizontal Lotus Rings along Shaft
      [1.65, 2.35, 3.05].forEach((ry) => {
        if (ry < colHeight - 0.3) {
          const band = new THREE.Mesh(
            new THREE.CylinderGeometry(0.44, 0.44, 0.22, 12),
            darkPlinthStoneMat
          );
          band.position.y = ry;
          colGroup.add(band);
        }
      });

      // 3. Corbelled Potika Bracket Capital (top of Image 6)
      const cap1 = new THREE.Mesh(
        new THREE.CylinderGeometry(0.65, 0.36, 0.45, 12),
        darkPlinthStoneMat
      );
      cap1.position.y = colHeight - 0.45;
      colGroup.add(cap1);

      const bracket = new THREE.Mesh(
        new THREE.BoxGeometry(1.25, 0.38, 1.25),
        mainStoneMat
      );
      bracket.position.y = colHeight - 0.12;
      colGroup.add(bracket);

      // 4. High-Relief Rearing Warhorse / Yali with Warrior Rider & Attendant (Image 6)
      const yaliGroup = new THREE.Group();
      // Rearing horse/Yali torso angled dramatically outward
      const body = new THREE.Mesh(
        new THREE.CylinderGeometry(0.19, 0.23, 1.45, 10),
        reliefSculptureMat
      );
      body.position.set(0, 2.05, 0.48);
      body.rotation.x = -0.48;
      body.castShadow = true;
      yaliGroup.add(body);

      // Arched Stallion Neck & Snout
      const neck = new THREE.Mesh(
        new THREE.CylinderGeometry(0.14, 0.19, 0.62, 10),
        reliefSculptureMat
      );
      neck.position.set(0, 2.75, 0.72);
      neck.rotation.x = -0.25;
      yaliGroup.add(neck);

      const head = new THREE.Mesh(
        new THREE.ConeGeometry(0.17, 0.55, 8),
        reliefSculptureMat
      );
      head.position.set(0, 2.95, 0.96);
      head.rotation.x = Math.PI * 0.58;
      yaliGroup.add(head);

      // Forelegs poised over warrior figure below
      [-0.14, 0.14].forEach((lx) => {
        const foreleg = new THREE.Mesh(
          new THREE.CylinderGeometry(0.06, 0.05, 0.72, 8),
          reliefSculptureMat
        );
        foreleg.position.set(lx, 2.32, 0.92);
        foreleg.rotation.x = 0.55;
        yaliGroup.add(foreleg);
      });

      // Rider figure with spear on horseback
      const rider = new THREE.Mesh(
        new THREE.CylinderGeometry(0.1, 0.12, 0.65, 8),
        reliefSculptureMat
      );
      rider.position.set(0, 2.52, 0.42);
      yaliGroup.add(rider);

      const riderHead = new THREE.Mesh(
        new THREE.SphereGeometry(0.12, 10, 10),
        reliefSculptureMat
      );
      riderHead.position.set(0, 2.92, 0.42);
      yaliGroup.add(riderHead);

      // Diagonal Carved Spear (matching Image 6)
      const spear = new THREE.Mesh(
        new THREE.CylinderGeometry(0.025, 0.025, 1.65, 6),
        goldKalashaMat
      );
      spear.position.set(0.16, 2.48, 0.68);
      spear.rotation.x = 0.85;
      yaliGroup.add(spear);

      // Supporting Warrior / Attendant Figure beneath hooves
      const warrior = new THREE.Mesh(
        new THREE.CylinderGeometry(0.11, 0.13, 0.75, 8),
        reliefSculptureMat
      );
      warrior.position.set(0, 1.48, 0.76);
      yaliGroup.add(warrior);

      yaliGroup.rotation.y = facingDir;
      colGroup.add(yaliGroup);

      return colGroup;
    };

    // Helper: 3D High-Relief Gajathara Marching Elephant Row & Devakoshtha Deity Niche Strip (Image 3)
    const createCarvedFriezeWallStrip = (length, yPos, zPos, rotY = 0) => {
      const stripGroup = new THREE.Group();
      const numElephants = Math.max(4, Math.floor(length / 0.85));
      const spacing = length / numElephants;

      for (let i = 0; i < numElephants; i++) {
        const x = -length * 0.5 + (i + 0.5) * spacing;
        // Protruding 3D Elephant Forequarters & Trunk (Gajathara - bottom of Image 3)
        const eleBody = new THREE.Mesh(
          new THREE.SphereGeometry(0.21, 8, 8),
          reliefSculptureMat
        );
        eleBody.scale.set(0.9, 1.1, 1.35);
        eleBody.position.set(x, 0, 0.14);
        eleBody.castShadow = true;
        stripGroup.add(eleBody);

        const eleTrunk = new THREE.Mesh(
          new THREE.CylinderGeometry(0.055, 0.04, 0.36, 6),
          reliefSculptureMat
        );
        eleTrunk.position.set(x, -0.14, 0.3);
        eleTrunk.rotation.x = 0.25;
        stripGroup.add(eleTrunk);

        // Every 3rd bay, add a protruding 3D Devakoshtha Arched Deity Niche above (middle of Image 3)
        if (i % 3 === 1) {
          const nicheFrame = new THREE.Mesh(
            new THREE.BoxGeometry(0.92, 1.45, 0.26),
            darkPlinthStoneMat
          );
          nicheFrame.position.set(x, 1.65, 0.08);
          nicheFrame.castShadow = true;
          stripGroup.add(nicheFrame);

          // Torana Gavaksha Arch Crown
          const arch = new THREE.Mesh(
            new THREE.CylinderGeometry(0.46, 0.46, 0.3, 12),
            reliefSculptureMat
          );
          arch.rotation.x = Math.PI / 2;
          arch.position.set(x, 2.38, 0.12);
          stripGroup.add(arch);

          // Standing 3D Sculpted Deity Figure inside Niche
          const deityTorso = new THREE.Mesh(
            new THREE.CylinderGeometry(0.14, 0.16, 0.88, 10),
            reliefSculptureMat
          );
          deityTorso.position.set(x, 1.58, 0.22);
          deityTorso.castShadow = true;
          stripGroup.add(deityTorso);

          const deityHead = new THREE.Mesh(
            new THREE.SphereGeometry(0.13, 10, 10),
            reliefSculptureMat
          );
          deityHead.position.set(x, 2.12, 0.22);
          stripGroup.add(deityHead);
        }
      }

      stripGroup.position.set(0, yPos, zPos);
      stripGroup.rotation.y = rotY;
      return stripGroup;
    };

    // 8. Construct High-Detail 3D Monument Architecture
    const monumentGroup = new THREE.Group();
    scene.add(monumentGroup);

    let dhwajaMesh = null;
    const flameSprites = [];
    const treeFoliageGroups = [];

    if (preset === 'shikhara') {
      // =====================================================================
      // COMPLETE AXIAL NAGARA TEMPLE COMPLEX (IMAGES 1, 2, 3, 4, 5, 6)
      // Plan Axis (Z):
      //   z = -3.8 : Garbhagriha & Soaring 32m Sekhari Shikhara (Sanctum)
      //   z = +2.2 : Antarala (Vestibule & Sukanasa Gabor Arch)
      //   z = +5.8 : Maha-Mandapa (Main Cruciform Pillared Assembly Hall + Balconies)
      //   z = +10.8: Mandapa (Intermediate Hall with Phamsana Pyramid Roof)
      //   z = +14.8: Ardha-Mandapa (Entrance Porch with Yali Cavalry Pillars)
      //   z = +17.5 to +22.5: Grand Sopana Stairway & Jagati Terrace Gate
      // =====================================================================

      // A. Massive Ashlar Stone Jagati Terrace Platform (Images 4 & 5)
      const jagatiLower = new THREE.Mesh(
        new THREE.BoxGeometry(28.5, 1.35, 38.0),
        darkPlinthStoneMat
      );
      jagatiLower.position.set(0, -1.32, 4.5);
      jagatiLower.castShadow = true;
      jagatiLower.receiveShadow = true;
      monumentGroup.add(jagatiLower);

      const jagatiUpper = createPancharathaLayer(25.0, 1.15, 34.5, 0.08, mainStoneMat);
      jagatiUpper.position.set(0, -0.15, 4.5);
      monumentGroup.add(jagatiUpper);

      // Jagati Terrace Low Parapet Coping & Corner Miniature Kuta Shrines
      [
        [-11.4, -11.5],
        [11.4, -11.5],
        [-11.4, 19.5],
        [11.4, 19.5]
      ].forEach(([cx, cz]) => {
        const cornerShrine = createUrushringa(2.2, 4.2, mainStoneMat);
        cornerShrine.position.set(cx, 0.42, cz);
        monumentGroup.add(cornerShrine);
      });

      // Grand Front Sopana Flight of Steps cutting into the Jagati Terrace (Image 4 & 5)
      for (let st = 0; st < 12; st++) {
        const step = new THREE.Mesh(
          new THREE.BoxGeometry(5.6 - st * 0.08, 0.25, 0.58),
          st % 2 === 0 ? mainStoneMat : darkPlinthStoneMat
        );
        step.position.set(0, -1.85 + st * 0.24, 23.2 - st * 0.46);
        step.castShadow = true;
        step.receiveShadow = true;
        monumentGroup.add(step);
      }

      // Stepped Masonry Balustrades flanking the Sopana Stairs (Image 4)
      [-3.1, 3.1].forEach((bx) => {
        const bal = new THREE.Mesh(
          new THREE.BoxGeometry(0.75, 1.65, 5.8),
          darkPlinthStoneMat
        );
        bal.position.set(bx, -0.7, 20.5);
        bal.castShadow = true;
        monumentGroup.add(bal);

        // Sculpted Simha / Yali Guardian Lion on Stairway Pedestal
        const guardianLion = createYaliSculptedColumn(2.6, bx < 0 ? 0.3 : -0.3);
        guardianLion.position.set(bx, 0.1, 18.2);
        monumentGroup.add(guardianLion);
      });

      // B. High Sculpted Adhisthana Plinth running under the entire 5-Part Axial Plan (Images 1, 2, 3, 5)
      // Sanctum Adhisthana Base (z = -3.8)
      const sanctumAdhisthana = createPancharathaLayer(14.6, 2.2, 14.6, 0.22, darkPlinthStoneMat);
      sanctumAdhisthana.position.set(0, 1.45, -3.8);
      monumentGroup.add(sanctumAdhisthana);

      const sanctumKumuda = createPancharathaLayer(15.2, 0.45, 15.2, 0.2, reliefSculptureMat);
      sanctumKumuda.position.set(0, 1.65, -3.8);
      monumentGroup.add(sanctumKumuda);

      // Maha-Mandapa & Mandapa Adhisthana Base (z = +5.8 to +14.8)
      const mandapaAdhisthana = createPancharathaLayer(13.2, 2.2, 13.5, 0.16, darkPlinthStoneMat);
      mandapaAdhisthana.position.set(0, 1.45, 6.2);
      monumentGroup.add(mandapaAdhisthana);

      const ardhaAdhisthana = createPancharathaLayer(8.2, 2.2, 6.8, 0.14, darkPlinthStoneMat);
      ardhaAdhisthana.position.set(0, 1.45, 14.2);
      monumentGroup.add(ardhaAdhisthana);

      // 3D High-Relief Gajathara Marching Elephant & Devakoshtha Deity Frieze Strips (Image 3)
      // Left & Right Flanks of Sanctum & Mandapa
      const leftFrieze1 = createCarvedFriezeWallStrip(11.5, 1.15, 0, -Math.PI / 2);
      leftFrieze1.position.set(-7.35, 1.15, -3.8);
      monumentGroup.add(leftFrieze1);

      const rightFrieze1 = createCarvedFriezeWallStrip(11.5, 1.15, 0, Math.PI / 2);
      rightFrieze1.position.set(7.35, 1.15, -3.8);
      monumentGroup.add(rightFrieze1);

      const backFrieze = createCarvedFriezeWallStrip(11.5, 1.15, -11.15, Math.PI);
      monumentGroup.add(backFrieze);

      const leftMandapaFrieze = createCarvedFriezeWallStrip(10.5, 1.15, 0, -Math.PI / 2);
      leftMandapaFrieze.position.set(-6.65, 1.15, 6.2);
      monumentGroup.add(leftMandapaFrieze);

      const rightMandapaFrieze = createCarvedFriezeWallStrip(10.5, 1.15, 0, Math.PI / 2);
      rightMandapaFrieze.position.set(6.65, 1.15, 6.2);
      monumentGroup.add(rightMandapaFrieze);

      // C. Garbhagriha Sanctum Jangha Walls (Two Stories of Sculpted Registers + Sandhara Transept Balconies - Images 4 & 5)
      const janghaLower = createPancharathaLayer(13.0, 2.6, 13.0, 0.24, mainStoneMat);
      janghaLower.position.set(0, 3.85, -3.8);
      monumentGroup.add(janghaLower);

      const bandhanaMolding = createPancharathaLayer(13.6, 0.45, 13.6, 0.22, darkPlinthStoneMat);
      bandhanaMolding.position.set(0, 5.2, -3.8);
      monumentGroup.add(bandhanaMolding);

      const janghaUpper = createPancharathaLayer(12.6, 2.4, 12.6, 0.24, mainStoneMat);
      janghaUpper.position.set(0, 6.55, -3.8);
      monumentGroup.add(janghaUpper);

      const varandikaCornice = createPancharathaLayer(13.5, 0.65, 13.5, 0.2, darkPlinthStoneMat);
      varandikaCornice.position.set(0, 8.0, -3.8);
      monumentGroup.add(varandikaCornice);

      // Projecting Gavaksha / Sandhara Pillared Balcony Windows on West, North & South Faces of Sanctum (Image 5)
      [
        [-6.8, -3.8, -Math.PI / 2],
        [6.8, -3.8, Math.PI / 2],
        [0, -10.6, Math.PI]
      ].forEach(([bx, bz, brot]) => {
        const balGroup = new THREE.Group();
        const sill = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.55, 1.45), darkPlinthStoneMat);
        sill.position.y = 3.2;
        balGroup.add(sill);

        // Sloping Kakshasana Seat-Back Balustrade
        const kakshasana = new THREE.Mesh(
          new THREE.BoxGeometry(3.5, 0.85, 0.35),
          reliefSculptureMat
        );
        kakshasana.position.set(0, 3.85, 0.58);
        kakshasana.rotation.x = -0.22;
        balGroup.add(kakshasana);

        // Pair of Balcony Dwarf Columns
        [-1.25, 1.25].forEach((px) => {
          const bCol = new THREE.Mesh(
            new THREE.CylinderGeometry(0.22, 0.26, 2.2, 10),
            mainStoneMat
          );
          bCol.position.set(px, 4.6, 0.45);
          balGroup.add(bCol);
        });

        // Overhanging Chhajja Eave Hood
        const chhajjaHood = new THREE.Mesh(
          new THREE.BoxGeometry(4.1, 0.34, 1.85),
          darkPlinthStoneMat
        );
        chhajjaHood.position.set(0, 5.85, 0.3);
        balGroup.add(chhajjaHood);

        // Dark Recessed Window + Warm Inner Lamp Glow
        const winDark = new THREE.Mesh(
          new THREE.BoxGeometry(2.1, 2.2, 0.4),
          glowingSanctumMat
        );
        winDark.position.set(0, 4.5, -0.1);
        balGroup.add(winDark);

        balGroup.position.set(bx, 0, bz);
        balGroup.rotation.y = brot;
        monumentGroup.add(balGroup);
      });

      // D. Soaring 32m Clustered Sekhari Shikhara Spire over Garbhagriha (Images 1, 2, 4, 5)
      const shikharaZ = -3.8;
      const shikharaStartY = 8.32;
      const shikharaTotalH = 17.8;
      const shikharaBhumis = 24;
      const bhumiH = shikharaTotalH / shikharaBhumis;

      // Central Mula-Manjari Parabolic Spire with Latina Curvature
      for (let b = 0; b < shikharaBhumis; b++) {
        const t = b / shikharaBhumis;
        // Authentic parabolic Nagara Rekha curve
        const curveScale = Math.pow(1 - t * 0.76, 0.62);
        const w = 12.2 * curveScale;

        const bhumiLayer = createPancharathaLayer(
          w,
          bhumiH * 0.86,
          w,
          0.25,
          b % 3 === 0 ? darkPlinthStoneMat : mainStoneMat
        );
        bhumiLayer.position.set(0, shikharaStartY + b * bhumiH + bhumiH * 0.45, shikharaZ);
        monumentGroup.add(bhumiLayer);

        // Deeply shadow-recessed Kantha neck between Bhumi courses
        const recess = createPancharathaLayer(
          w * 0.91,
          bhumiH * 0.22,
          w * 0.91,
          0.22,
          darkPlinthStoneMat
        );
        recess.position.set(0, shikharaStartY + (b + 1) * bhumiH, shikharaZ);
        monumentGroup.add(recess);

        // Ribbed Corner Bhumi-Amalakas every 3rd tier (seen clearly on corners in Images 4 & 5)
        if (b % 3 === 0 && b < shikharaBhumis - 2) {
          const cOffset = w * 0.37;
          [
            [-cOffset, -cOffset],
            [cOffset, -cOffset],
            [-cOffset, cOffset],
            [cOffset, cOffset]
          ].forEach(([ax, az]) => {
            const bAmalaka = new THREE.Mesh(
              new THREE.CylinderGeometry(w * 0.095, w * 0.095, bhumiH * 0.62, 14),
              reliefSculptureMat
            );
            bAmalaka.position.set(
              ax,
              shikharaStartY + b * bhumiH + bhumiH * 0.5,
              shikharaZ + az
            );
            monumentGroup.add(bAmalaka);
          });
        }
      }

      // 4 Tiers of Clustered Subsidiary Spirelets (Uromanjari & Urushringas) Clinging to the Main Shikhara (Images 4 & 5)
      const uruRings = [
        { y: 8.3, dist: 5.5, w: 3.3, h: 6.4, diagDist: 4.4, diagW: 2.3, diagH: 4.8 },
        { y: 11.6, dist: 4.5, w: 2.7, h: 5.6, diagDist: 3.6, diagW: 1.9, diagH: 4.0 },
        { y: 14.9, dist: 3.5, w: 2.2, h: 4.6, diagDist: 2.8, diagW: 1.5, diagH: 3.2 },
        { y: 18.0, dist: 2.5, w: 1.7, h: 3.5, diagDist: 0, diagW: 0, diagH: 0 }
      ];
      uruRings.forEach((ring) => {
        // Cardinal Uromanjari Half-Spires
        [
          [ring.dist, 0],
          [-ring.dist, 0],
          [0, ring.dist],
          [0, -ring.dist]
        ].forEach(([ux, uz]) => {
          const uru = createUrushringa(ring.w, ring.h, mainStoneMat);
          uru.position.set(ux, ring.y, shikharaZ + uz);
          monumentGroup.add(uru);
        });

        // Diagonal Corner Tilaka / Karna-Shringa Spirelets
        if (ring.diagDist > 0) {
          [
            [ring.diagDist, ring.diagDist],
            [-ring.diagDist, ring.diagDist],
            [ring.diagDist, -ring.diagDist],
            [-ring.diagDist, -ring.diagDist]
          ].forEach(([dx, dz]) => {
            const dUru = createUrushringa(ring.diagW, ring.diagH, darkPlinthStoneMat);
            dUru.position.set(dx, ring.y, shikharaZ + dz);
            monumentGroup.add(dUru);
          });
        }
      });

      // Summit Skandha, Griva, Double Ribbed Amalaka Crown, Chandrika & Kalasha Finial (Images 1, 2, 4, 5)
      const summitY = shikharaStartY + shikharaTotalH;

      const skandha = createPancharathaLayer(3.9, 0.52, 3.9, 0.15, darkPlinthStoneMat);
      skandha.position.set(0, summitY + 0.24, shikharaZ);
      monumentGroup.add(skandha);

      const griva = new THREE.Mesh(
        new THREE.CylinderGeometry(1.55, 1.78, 0.92, 24),
        darkPlinthStoneMat
      );
      griva.position.set(0, summitY + 0.82, shikharaZ);
      monumentGroup.add(griva);

      // Primary Great Fluted Stone Amalaka Disc (32 Ribs)
      const amalakaGroup = new THREE.Group();
      const amalakaCore = new THREE.Mesh(
        new THREE.CylinderGeometry(2.45, 2.2, 0.92, 32),
        reliefSculptureMat
      );
      amalakaGroup.add(amalakaCore);
      for (let rib = 0; rib < 32; rib++) {
        const angle = (rib / 32) * Math.PI * 2;
        const ribMesh = new THREE.Mesh(
          new THREE.SphereGeometry(0.36, 10, 10),
          reliefSculptureMat
        );
        ribMesh.scale.set(0.58, 1.22, 1.5);
        ribMesh.position.set(Math.cos(angle) * 2.35, 0, Math.sin(angle) * 2.35);
        ribMesh.rotation.y = -angle;
        amalakaGroup.add(ribMesh);
      }
      amalakaGroup.position.set(0, summitY + 1.55, shikharaZ);
      monumentGroup.add(amalakaGroup);

      // Upper Secondary Amalaka (Amalasarika) + Chandrika Lotus Cap (seen in Images 4 & 5)
      const chandrika = new THREE.Mesh(
        new THREE.ConeGeometry(2.05, 0.55, 28),
        darkPlinthStoneMat
      );
      chandrika.position.set(0, summitY + 2.2, shikharaZ);
      monumentGroup.add(chandrika);

      const upperAmalaka = new THREE.Mesh(
        new THREE.CylinderGeometry(1.45, 1.45, 0.45, 24),
        reliefSculptureMat
      );
      upperAmalaka.position.set(0, summitY + 2.62, shikharaZ);
      monumentGroup.add(upperAmalaka);

      // Sacred Golden Kalasha Water-Pot Finial & Bijapuraka Spire
      const kalashaPot = new THREE.Mesh(
        new THREE.SphereGeometry(0.76, 24, 24),
        goldKalashaMat
      );
      kalashaPot.scale.set(1, 1.3, 1);
      kalashaPot.position.set(0, summitY + 3.45, shikharaZ);
      monumentGroup.add(kalashaPot);

      const kalashaSpire = new THREE.Mesh(
        new THREE.ConeGeometry(0.36, 1.85, 20),
        goldKalashaMat
      );
      kalashaSpire.position.set(0, summitY + 4.75, shikharaZ);
      monumentGroup.add(kalashaSpire);

      const kalashaGlint = createGlowSprite(4.5, 0xffd27d, 0.65);
      kalashaGlint.position.set(0, summitY + 3.9, shikharaZ);
      monumentGroup.add(kalashaGlint);

      // Cloth-Simulated Saffron Temple Dhwaja Banner Flag
      const flagGeo = new THREE.PlaneGeometry(2.6, 0.92, 16, 6);
      const flagMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#e84a18'),
        emissive: new THREE.Color('#801e00'),
        emissiveIntensity: 0.5,
        side: THREE.DoubleSide,
        roughness: 0.55
      });
      dhwajaMesh = new THREE.Mesh(flagGeo, flagMat);
      dhwajaMesh.position.set(1.35, summitY + 5.15, shikharaZ);
      monumentGroup.add(dhwajaMesh);

      // E. Antarala Vestibule & Sukanasa Gabor Arch Projection (Connecting Shikhara to Maha-Mandapa - Images 1, 2, 4, 5)
      const sukanasaGroup = new THREE.Group();
      const sukanasaBarrel = new THREE.Mesh(
        new THREE.CylinderGeometry(2.15, 2.75, 4.8, 18),
        darkPlinthStoneMat
      );
      sukanasaBarrel.rotation.x = Math.PI / 2;
      sukanasaBarrel.position.set(0, 12.6, 2.2);
      sukanasaGroup.add(sukanasaBarrel);

      // Ornate Chaitya Gavaksha Sun-Window Arch on Sukanasa Front (Image 4 center)
      const chaityaArch = new THREE.Mesh(
        new THREE.TorusGeometry(1.48, 0.24, 14, 28),
        reliefSculptureMat
      );
      chaityaArch.position.set(0, 12.6, 4.65);
      sukanasaGroup.add(chaityaArch);

      const sukanasaLion = createUrushringa(2.1, 3.8, reliefSculptureMat);
      sukanasaLion.position.set(0, 14.2, 2.6);
      sukanasaGroup.add(sukanasaLion);
      monumentGroup.add(sukanasaGroup);

      // F. Maha-Mandapa (Cruciform Pillared Assembly Hall with Lateral Balconies & Clustered Phamsana Roof - Images 1, 2, 4, 5)
      const mahaZ = 5.6;
      const mahaCore = createPancharathaLayer(11.6, 5.4, 8.6, 0.18, mainStoneMat);
      mahaCore.position.set(0, 5.2, mahaZ);
      monumentGroup.add(mahaCore);

      // Lateral Transept Balconies on Maha-Mandapa (East/West wings seen in Images 4 & 5)
      [-6.2, 6.2].forEach((mx) => {
        const wing = new THREE.Mesh(
          new THREE.BoxGeometry(2.4, 4.8, 4.6),
          darkPlinthStoneMat
        );
        wing.position.set(mx, 4.9, mahaZ);
        wing.castShadow = true;
        monumentGroup.add(wing);

        // Open Balcony Kakshasana & Twin Columns
        [-1.3, 1.3].forEach((wz) => {
          const wCol = createYaliSculptedColumn(3.2, mx < 0 ? -Math.PI / 2 : Math.PI / 2);
          wCol.position.set(mx + (mx < 0 ? -0.6 : 0.6), 2.5, mahaZ + wz);
          monumentGroup.add(wCol);
        });
      });

      // Double-Curved Overhanging Chhajja Eave Cornice around Maha-Mandapa (Images 1 & 5)
      const mahaChhajja = new THREE.Mesh(
        new THREE.BoxGeometry(14.8, 0.42, 9.8),
        darkPlinthStoneMat
      );
      mahaChhajja.position.set(0, 7.65, mahaZ);
      mahaChhajja.castShadow = true;
      monumentGroup.add(mahaChhajja);

      // Maha-Mandapa Tall Clustered Phamsana Pyramid Roof + Flank Urushringas (Peak #2 in Mountain Cascade - Images 1, 2, 4, 5)
      const mahaRoof = createPhamsanaRoof(11.4, 8.8, 7.4, 11);
      mahaRoof.position.set(0, 7.9, mahaZ);
      monumentGroup.add(mahaRoof);

      [
        [-4.2, mahaZ - 2.2],
        [4.2, mahaZ - 2.2],
        [-4.2, mahaZ + 2.2],
        [4.2, mahaZ + 2.2]
      ].forEach(([ux, uz]) => {
        const mahaUru = createUrushringa(2.1, 4.2, mainStoneMat);
        mahaUru.position.set(ux, 8.0, uz);
        monumentGroup.add(mahaUru);
      });

      // G. Intermediate Mandapa Hall (Open Pillared Pavilion with Rearing Horse/Yali Columns - Peak #3 in Images 1, 4, 5)
      const mandapaZ = 11.2;
      const mandapaFloor = new THREE.Mesh(
        new THREE.BoxGeometry(9.6, 0.6, 5.6),
        darkPlinthStoneMat
      );
      mandapaFloor.position.set(0, 2.55, mandapaZ);
      monumentGroup.add(mandapaFloor);

      // 6 Sculpted Rearing Horse / Yali Cavalry Columns supporting the Mandapa (Image 6)
      [
        [-3.9, mandapaZ - 1.8, -0.5],
        [3.9, mandapaZ - 1.8, 0.5],
        [-3.9, mandapaZ + 1.8, -0.5],
        [3.9, mandapaZ + 1.8, 0.5],
        [-2.1, mandapaZ + 1.8, 0],
        [2.1, mandapaZ + 1.8, 0]
      ].forEach(([cx, cz, dir]) => {
        const yCol = createYaliSculptedColumn(4.4, dir);
        yCol.position.set(cx, 2.65, cz);
        monumentGroup.add(yCol);
      });

      const mandapaChhajja = new THREE.Mesh(
        new THREE.BoxGeometry(10.8, 0.38, 6.6),
        darkPlinthStoneMat
      );
      mandapaChhajja.position.set(0, 7.15, mandapaZ);
      mandapaChhajja.castShadow = true;
      monumentGroup.add(mandapaChhajja);

      const mandapaRoof = createPhamsanaRoof(9.2, 6.2, 5.2, 9);
      mandapaRoof.position.set(0, 7.35, mandapaZ);
      monumentGroup.add(mandapaRoof);

      // H. Ardha-Mandapa Entrance Porch (Front Mukha-Mandapa with Torana Arch & Rearing Yali Columns - Peak #4 in Images 1, 4, 5)
      const ardhaZ = 15.6;
      const ardhaFloor = new THREE.Mesh(
        new THREE.BoxGeometry(6.8, 0.58, 4.4),
        darkPlinthStoneMat
      );
      ardhaFloor.position.set(0, 2.55, ardhaZ);
      monumentGroup.add(ardhaFloor);

      // 4 Grand Front Porch Columns with Rearing Horse/Yali Brackets (Image 6)
      [
        [-2.65, ardhaZ - 1.2, -0.35],
        [2.65, ardhaZ - 1.2, 0.35],
        [-2.65, ardhaZ + 1.4, -0.2],
        [2.65, ardhaZ + 1.4, 0.2]
      ].forEach(([cx, cz, dir]) => {
        const porchCol = createYaliSculptedColumn(4.2, dir);
        porchCol.position.set(cx, 2.65, cz);
        monumentGroup.add(porchCol);
      });

      // Carved Makara-Torana Multifoil Entrance Archway (seen over the porch portal in Images 4 & 5)
      const toranaArch = new THREE.Mesh(
        new THREE.TorusGeometry(1.75, 0.18, 12, 24, Math.PI),
        reliefSculptureMat
      );
      toranaArch.position.set(0, 5.3, ardhaZ + 1.42);
      monumentGroup.add(toranaArch);

      const ardhaChhajja = new THREE.Mesh(
        new THREE.BoxGeometry(7.8, 0.35, 5.2),
        darkPlinthStoneMat
      );
      ardhaChhajja.position.set(0, 6.85, ardhaZ);
      ardhaChhajja.castShadow = true;
      monumentGroup.add(ardhaChhajja);

      const ardhaRoof = createPhamsanaRoof(6.6, 4.8, 3.6, 7);
      ardhaRoof.position.set(0, 7.05, ardhaZ);
      monumentGroup.add(ardhaRoof);

      // Glowing Sanctum Inner Portal & Hanging Golden Temple Bells
      const portalGlow = new THREE.Mesh(
        new THREE.BoxGeometry(2.1, 3.3, 0.5),
        glowingSanctumMat
      );
      portalGlow.position.set(0, 4.4, 13.6);
      monumentGroup.add(portalGlow);

      const sanctumHalo = createGlowSprite(6.4, 0xff9436, 0.88);
      sanctumHalo.position.set(0, 4.5, 14.2);
      monumentGroup.add(sanctumHalo);
      flameSprites.push(sanctumHalo);

      // Architectural Scale Silhouettes on the Sopana Steps (Matching Image 1 & Image 4)
      [
        [0.45, 1.9, 17.8],
        [-0.7, 0.85, 19.6]
      ].forEach(([px, py, pz]) => {
        const personGroup = new THREE.Group();
        const pBody = new THREE.Mesh(
          new THREE.CylinderGeometry(0.14, 0.18, 1.15, 8),
          new THREE.MeshStandardMaterial({ color: 0xfaf0e4, roughness: 0.7 })
        );
        pBody.position.y = 0.58;
        personGroup.add(pBody);
        const pHead = new THREE.Mesh(
          new THREE.SphereGeometry(0.14, 10, 10),
          new THREE.MeshStandardMaterial({ color: 0x3b1e14, roughness: 0.6 })
        );
        pHead.position.y = 1.28;
        personGroup.add(pHead);
        personGroup.position.set(px, py, pz);
        monumentGroup.add(personGroup);
      });

      // I. Optional Vastu Purusha Mandala (81-Grid / Paramasaayika) Holographic Plan Overlay (Image 2)
      if (showVastuGrid || cameraPreset === 'vastuPlan') {
        const vastuGroup = new THREE.Group();
        const gridSize = 27.0;
        const divisions = 9; // 9x9 = 81 Pada Vastu Purusha Mandala Grid
        const gridHelper = new THREE.GridHelper(
          gridSize,
          divisions,
          0xffcc66,
          0xd8a25e
        );
        gridHelper.position.set(0, 0.52, 4.0);
        vastuGroup.add(gridHelper);

        // Outer Prakara Wall Alignment Frame (Image 2)
        const prakaraFrame = new THREE.GridHelper(38.0, 1, 0xffaa33, 0xffaa33);
        prakaraFrame.position.set(0, -1.75, 4.5);
        vastuGroup.add(prakaraFrame);

        // Brahmasthana Central Sacred Square Highlight
        const brahmaGeo = new THREE.RingGeometry(2.8, 3.1, 4);
        brahmaGeo.rotateX(-Math.PI / 2);
        brahmaGeo.rotateZ(Math.PI / 4);
        const brahmaMat = new THREE.MeshBasicMaterial({
          color: 0xffb84d,
          side: THREE.DoubleSide
        });
        const brahmaMesh = new THREE.Mesh(brahmaGeo, brahmaMat);
        brahmaMesh.position.set(0, 0.58, -3.8);
        vastuGroup.add(brahmaMesh);

        monumentGroup.add(vastuGroup);
      }
    } else if (preset === 'pagoda') {
      // =====================================================================
      // MONUMENT 2: FIVE-STORY JAPANESE GOJŪ-NO-TŌ PAGODA
      // =====================================================================
      const basePlinth = createPancharathaLayer(14.5, 1.85, 14.5, 0.08, darkPlinthStoneMat);
      basePlinth.position.y = -0.8;
      monumentGroup.add(basePlinth);

      for (let s = 0; s < 5; s++) {
        const yBase = 0.2 + s * 3.85;
        const coreW = 7.4 - s * 0.85;
        const roofW = 12.0 - s * 1.15;

        const core = new THREE.Mesh(new THREE.BoxGeometry(coreW, 2.8, coreW), mainStoneMat);
        core.position.y = yBase + 1.4;
        core.castShadow = true;
        core.receiveShadow = true;
        monumentGroup.add(core);

        const roof = new THREE.Mesh(
          new THREE.ConeGeometry(roofW * 0.78, 1.38, 4),
          darkPlinthStoneMat
        );
        roof.rotation.y = Math.PI / 4;
        roof.position.y = yBase + 3.2;
        roof.castShadow = true;
        monumentGroup.add(roof);
      }

      const sorin = new THREE.Mesh(
        new THREE.CylinderGeometry(0.18, 0.5, 6.4, 20),
        goldKalashaMat
      );
      sorin.position.y = 22.5;
      monumentGroup.add(sorin);
    } else {
      // =====================================================================
      // MONUMENT 3: MODERN SEISMIC DIAGRID HIGH-RISE TOWER (QUAKERESIST)
      // =====================================================================
      const basePad = new THREE.Mesh(
        new THREE.CylinderGeometry(9.6, 10.6, 1.6, 8),
        darkPlinthStoneMat
      );
      basePad.position.y = -0.8;
      monumentGroup.add(basePad);

      for (let f = 0; f < 10; f++) {
        const fy = f * 2.35;
        const radius = 6.2 - f * 0.28;
        const slab = new THREE.Mesh(
          new THREE.CylinderGeometry(radius, radius, 0.36, 8),
          mainStoneMat
        );
        slab.position.y = fy;
        slab.castShadow = true;
        monumentGroup.add(slab);

        for (let b = 0; b < 8; b++) {
          const ang = (b / 8) * Math.PI * 2;
          const strut = new THREE.Mesh(
            new THREE.CylinderGeometry(0.17, 0.17, 2.8, 8),
            goldKalashaMat
          );
          strut.position.set(
            Math.cos(ang) * (radius - 0.3),
            fy + 1.15,
            Math.sin(ang) * (radius - 0.3)
          );
          strut.rotation.z = (f % 2 === 0 ? 1 : -1) * 0.38;
          strut.rotation.y = -ang;
          monumentGroup.add(strut);
        }
      }
      const tmdOrb = new THREE.Mesh(new THREE.SphereGeometry(1.75, 28, 28), goldKalashaMat);
      tmdOrb.position.y = 23.3;
      monumentGroup.add(tmdOrb);
    }

    // 9. Archaeological Temple Parkland, Manicured Lawn, Crimson Bougainvillea Hedges & Banyan Trees (Images 4 & 5)
    const terrainGeo = new THREE.PlaneGeometry(240, 240, 112, 112);
    terrainGeo.rotateX(-Math.PI / 2);
    const posAttr = terrainGeo.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const vx = posAttr.getX(i);
      const vz = posAttr.getZ(i);
      const dist = Math.hypot(vx, vz - 4.0);
      if (dist < 32.0) {
        posAttr.setY(i, -1.95);
      } else {
        const factor = Math.min(1, (dist - 32.0) / 34);
        const h =
          (Math.sin(vx * 0.065) * Math.cos(vz * 0.065) * 3.8 +
            Math.sin(vx * 0.18 + vz * 0.14) * 1.2 +
            Math.cos(dist * 0.05) * 2.0) *
          factor;
        posAttr.setY(i, -1.95 + h);
      }
    }
    terrainGeo.computeVertexNormals();

    const isLushPark = timeOfDay === 'daylight' || timeOfDay === 'golden';
    const terrainMat = createPhysicalMaterial({
      color: new THREE.Color(isLushPark ? '#4f6e32' : '#271216'),
      normalMap: pbrMaps.normalMap,
      normalScale: new THREE.Vector2(0.85, 0.85),
      bumpMap: pbrMaps.bumpMap,
      bumpScale: 0.25,
      roughnessMap: pbrMaps.roughnessMap,
      roughness: isLushPark ? 0.78 : Math.max(0.14, 0.55 - effectiveWetness * 0.38),
      metalness: 0.08,
      clearcoat: isLushPark ? 0.05 : effectiveWetness * 0.9,
      envMapIntensity: 1.35
    });
    const terrainMesh = new THREE.Mesh(terrainGeo, terrainMat);
    terrainMesh.receiveShadow = true;
    scene.add(terrainMesh);

    // Sandstone Parikrama Flagstone Courtyard Apron around the Jagati Terrace (Images 4 & 5)
    const flagstoneApron = new THREE.Mesh(
      new THREE.BoxGeometry(34.5, 0.12, 45.0),
      mainStoneMat
    );
    flagstoneApron.position.set(0, -1.9, 4.8);
    flagstoneApron.receiveShadow = true;
    scene.add(flagstoneApron);

    // Manicured Topiary Shrubs & Flowering Crimson Bougainvillea Hedges in Foreground (Image 4 & 5)
    const greenShrubMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#2f5922'),
      roughness: 0.82
    });
    const crimsonHedgeMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#8f1d2c'),
      roughness: 0.75
    });

    // Foreground hedge row & shrubs (matching Image 4 lawn composition)
    const shrubCoords = [
      [-11.5, 25.5, 1.35, false],
      [-6.5, 25.8, 1.45, false],
      [-1.8, 25.6, 1.3, false],
      [3.5, 25.8, 1.4, true],
      [7.8, 25.8, 1.5, true],
      [12.2, 25.5, 1.35, true],
      [-15.8, 16.5, 1.6, false],
      [15.8, 16.5, 1.6, true]
    ];
    shrubCoords.forEach(([sx, sz, sr, isCrimson]) => {
      const bushGroup = new THREE.Group();
      for (let c = 0; c < 5; c++) {
        const puff = new THREE.Mesh(
          new THREE.DodecahedronGeometry(sr * (0.65 + (c % 2) * 0.25), 1),
          isCrimson && c % 2 === 0 ? crimsonHedgeMat : greenShrubMat
        );
        puff.position.set(
          (c - 2) * sr * 0.45,
          sr * 0.45 + (c % 2) * 0.2,
          ((c * 7) % 3 - 1) * 0.35
        );
        puff.castShadow = true;
        puff.receiveShadow = true;
        bushGroup.add(puff);
      }
      bushGroup.position.set(sx, -1.85, sz);
      scene.add(bushGroup);
    });

    // Flanking Sacred Banyan / Neem & Peepal Trees framing the Temple (Images 4 & 5)
    const trunkMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#4a3222'),
      roughness: 0.88
    });
    const canopyMat1 = new THREE.MeshStandardMaterial({
      color: new THREE.Color(timeOfDay === 'golden' ? '#4f5e28' : '#2d5720'),
      roughness: 0.78
    });
    const canopyMat2 = new THREE.MeshStandardMaterial({
      color: new THREE.Color(timeOfDay === 'golden' ? '#7a632e' : '#3e6e2c'),
      roughness: 0.75
    });

    const treePositions = [
      [-22.5, -6.0, 1.25],
      [23.0, -4.5, 1.35],
      [-24.0, 12.0, 1.05],
      [24.5, 14.0, 1.15],
      [-19.5, -20.0, 1.2],
      [20.5, -19.5, 1.1]
    ];
    treePositions.forEach(([tx, tz, tScale], idx) => {
      const treeGroup = new THREE.Group();
      const trunk = new THREE.Mesh(
        new THREE.CylinderGeometry(0.45 * tScale, 0.72 * tScale, 5.8 * tScale, 10),
        trunkMat
      );
      trunk.position.y = -1.9 + 2.9 * tScale;
      trunk.castShadow = true;
      treeGroup.add(trunk);

      const foliageCluster = new THREE.Group();
      const puffs = [
        [0, 6.5, 0, 3.2],
        [-2.1, 5.6, 1.2, 2.5],
        [2.2, 5.8, -1.1, 2.6],
        [0.8, 7.6, 1.4, 2.4],
        [-1.4, 7.2, -1.5, 2.3]
      ];
      puffs.forEach(([px, py, pz, pr], pIdx) => {
        const leafSphere = new THREE.Mesh(
          new THREE.DodecahedronGeometry(pr * tScale, 1),
          (idx + pIdx) % 2 === 0 ? canopyMat1 : canopyMat2
        );
        leafSphere.position.set(px * tScale, (-1.9 + py) * tScale, pz * tScale);
        leafSphere.castShadow = true;
        leafSphere.receiveShadow = true;
        foliageCluster.add(leafSphere);
      });
      treeGroup.add(foliageCluster);
      treeGroup.position.set(tx, 0, tz);
      scene.add(treeGroup);
      treeFoliageGroups.push(foliageCluster);
    });

    // V-Ray Mirror-Glossy Rainwater Courtyard Puddle Plane (when wet/stormy)
    if (effectiveWetness > 0.25) {
      const puddleGeo = new THREE.CircleGeometry(30.0, 64);
      puddleGeo.rotateX(-Math.PI / 2);
      const puddleMat = createPhysicalMaterial({
        color: new THREE.Color('#14040e'),
        normalMap: pbrMaps.normalMap,
        normalScale: new THREE.Vector2(0.18, 0.18),
        roughness: 0.03,
        metalness: 0.92,
        clearcoat: 1.0,
        clearcoatRoughness: 0.02,
        envMapIntensity: 2.6,
        transparent: true,
        opacity: Math.min(0.82, effectiveWetness * 0.85)
      });
      const puddleMesh = new THREE.Mesh(puddleGeo, puddleMat);
      puddleMesh.position.set(0, -1.83, 4.5);
      puddleMesh.receiveShadow = true;
      scene.add(puddleMesh);
    }

    // Monolithic Stone Deepastambha (Lamp Pillars) & Prakara Ruin Pillars
    const ruinCoords = [
      [-16.5, 19.5, 3.8, true],
      [16.5, 19.5, 3.8, true],
      [-18.5, -14.5, 3.4, false],
      [18.5, -14.5, 3.6, false]
    ];
    ruinCoords.forEach(([rx, rz, rh, hasTorch]) => {
      const pillar = new THREE.Mesh(
        new THREE.CylinderGeometry(0.42, 0.56, rh, 12),
        darkPlinthStoneMat
      );
      pillar.position.set(rx, -1.95 + rh / 2, rz);
      pillar.castShadow = true;
      pillar.receiveShadow = true;
      scene.add(pillar);

      if (hasTorch) {
        const bowl = new THREE.Mesh(
          new THREE.CylinderGeometry(0.65, 0.35, 0.32, 12),
          darkPlinthStoneMat
        );
        bowl.position.set(rx, -1.95 + rh + 0.12, rz);
        scene.add(bowl);

        const flameCore = new THREE.Mesh(
          new THREE.SphereGeometry(0.26, 10, 10),
          glowingSanctumMat
        );
        flameCore.position.set(rx, -1.95 + rh + 0.35, rz);
        scene.add(flameCore);

        const torchHalo = createGlowSprite(3.2, 0xff8a2b, 0.82);
        torchHalo.position.set(rx, -1.95 + rh + 0.45, rz);
        scene.add(torchHalo);
        flameSprites.push(torchHalo);
      }
    });

    // 10. Wind-Driven Monsoon Rain Streaks OR Golden Atmospheric Dust Motes / Birds
    const rainCount = weather === 'storm' ? 2200 : 260;
    const rainGeo = new THREE.BufferGeometry();
    const rainPositions = new Float32Array(rainCount * 3);
    for (let i = 0; i < rainCount; i++) {
      rainPositions[i * 3] = (Math.random() - 0.5) * 105;
      rainPositions[i * 3 + 1] = Math.random() * 58;
      rainPositions[i * 3 + 2] = (Math.random() - 0.5) * 105;
    }
    rainGeo.setAttribute('position', new THREE.BufferAttribute(rainPositions, 3));
    const rainMat = new THREE.PointsMaterial({
      color: weather === 'storm' ? 0xebd7c4 : 0xffe0a8,
      size: weather === 'storm' ? 0.22 : 0.32,
      transparent: true,
      opacity: weather === 'storm' ? 0.58 : 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const rainSystem = new THREE.Points(rainGeo, rainMat);
    scene.add(rainSystem);

    // 11. Real-Time Render Loop
    let animFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();
      skyUniforms.uTime.value = elapsed;

      const orb = orbitRef.current;
      if (autoRotate && !orb.isDragging && cameraPreset === 'threeQuarter') {
        orb.targetTheta += 0.0016;
      }

      orb.theta += (orb.targetTheta - orb.theta) * 0.075;
      orb.phi += (orb.targetPhi - orb.phi) * 0.075;
      orb.radius += (orb.targetRadius - orb.radius) * 0.075;
      orb.lookY += (orb.targetLookY - orb.lookY) * 0.075;
      orb.lookZ += (orb.targetLookZ - orb.lookZ) * 0.075;

      camera.position.x = orb.radius * Math.sin(orb.phi) * Math.sin(orb.theta);
      camera.position.y = Math.max(0.8, orb.radius * Math.cos(orb.phi) + orb.lookY * 0.45);
      camera.position.z = orb.lookZ + orb.radius * Math.sin(orb.phi) * Math.cos(orb.theta);
      camera.lookAt(0, orb.lookY, orb.lookZ);

      // Gentle Wind Sway on Banyan/Neem Tree Canopies
      treeFoliageGroups.forEach((fg, idx) => {
        fg.rotation.z = Math.sin(elapsed * 1.4 + idx) * 0.025;
        fg.rotation.x = Math.cos(elapsed * 1.1 + idx) * 0.018;
      });

      // Organic Flicker for Sanctum Lamps & Volumetric Halos
      const flicker = Math.sin(elapsed * 12.5) * 0.12 + Math.cos(elapsed * 27.0) * 0.08;
      sanctumLight1.intensity = (6.8 + flicker * 4.5) * vrayBloom;
      sanctumLight2.intensity = (4.8 - flicker * 3.0) * vrayBloom;
      flameSprites.forEach((sp, idx) => {
        const s = (idx === 0 ? 6.0 : 3.2) + Math.sin(elapsed * 10 + idx) * 0.32;
        sp.scale.set(s, s, 1);
      });

      // Dynamic Storm Lightning Strikes
      if (weather === 'storm') {
        if (Math.random() < 0.0055) {
          lightningLight.intensity = 9.5 + Math.random() * 7.0;
          skyUniforms.uLightning.value = 1.0;
        } else {
          lightningLight.intensity *= 0.84;
          skyUniforms.uLightning.value *= 0.86;
        }
      } else {
        lightningLight.intensity = 0;
        skyUniforms.uLightning.value = 0;
      }

      // Cloth Wave Simulation on Saffron Dhwaja Banner
      if (dhwajaMesh) {
        const fPos = dhwajaMesh.geometry.attributes.position;
        for (let i = 0; i < fPos.count; i++) {
          const vx = fPos.getX(i);
          const distFromPole = (vx + 1.3) / 2.6;
          const waveZ = Math.sin(elapsed * 10.0 - distFromPole * 5.2) * 0.32 * distFromPole;
          fPos.setZ(i, waveZ);
        }
        fPos.needsUpdate = true;
      }

      // Update Rain / Golden Dust Motes
      const rPos = rainSystem.geometry.attributes.position;
      for (let i = 0; i < rainCount; i++) {
        if (weather === 'storm') {
          let ry = rPos.getY(i) - 0.92;
          let rx = rPos.getX(i) + 0.15;
          if (ry < -2) {
            ry = 55;
            rx = (Math.random() - 0.5) * 105;
          }
          rPos.setY(i, ry);
          rPos.setX(i, rx);
        } else {
          let ry = rPos.getY(i) + 0.045;
          if (ry > 48) ry = 0;
          rPos.setY(i, ry);
        }
      }
      rPos.needsUpdate = true;

      renderer.render(scene, camera);
      animFrameId = requestAnimationFrame(animate);
    };

    animFrameId = requestAnimationFrame(animate);

    const handleResize = () => {
      if (!container) return;
      renderer.setSize(container.clientWidth, container.clientHeight);
      updateCameraViewOffset();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('resize', handleResize);
      envRT.dispose();
      pmremGenerator.dispose();
      renderer.dispose();
    };
  }, [
    preset,
    weather,
    timeOfDay,
    cameraPreset,
    showVastuGrid,
    wireframeOverlay,
    autoRotate,
    fullInteractive,
    vrayExposure,
    vrayWetness,
    vrayBloom,
    vrayPass
  ]);

  // Interactive Pointer & Wheel Orbit Controls
  const onPointerDown = (e) => {
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    const y = e.touches ? e.touches[0].clientY : e.clientY;
    orbitRef.current.isDragging = true;
    orbitRef.current.lastX = x;
    orbitRef.current.lastY = y;
  };

  const onPointerMove = (e) => {
    if (!orbitRef.current.isDragging) return;
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    const y = e.touches ? e.touches[0].clientY : e.clientY;
    const dx = x - orbitRef.current.lastX;
    const dy = y - orbitRef.current.lastY;

    orbitRef.current.targetTheta -= dx * 0.0075;
    orbitRef.current.targetPhi = Math.max(
      0.15,
      Math.min(1.52, orbitRef.current.targetPhi - dy * 0.0055)
    );

    orbitRef.current.lastX = x;
    orbitRef.current.lastY = y;
  };

  const onPointerUp = () => {
    orbitRef.current.isDragging = false;
  };

  const onWheel = (e) => {
    orbitRef.current.targetRadius = Math.max(
      14,
      Math.min(68, orbitRef.current.targetRadius + e.deltaY * 0.025)
    );
  };

  return (
    <div
      ref={mountRef}
      onMouseDown={onPointerDown}
      onMouseMove={onPointerMove}
      onMouseUp={onPointerUp}
      onMouseLeave={onPointerUp}
      onTouchStart={onPointerDown}
      onTouchMove={onPointerMove}
      onTouchEnd={onPointerUp}
      onWheel={onWheel}
      aria-label="V-Ray Photorealistic 3D Complete 5-Part Axial Indian Temple Complex (Garbhagriha Shikhara, Maha-Mandapa, Mandapa, Ardha-Mandapa, Carved Gajathara Elephant Plinth & Rearing Yali Pillars)"
      className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing select-none"
    />
  );
}

// ============================================================================
// MAIN APPLICATION COMPONENT
// ============================================================================
export default function App() {
  // Navigation state supporting all routes including `/events` and `/towers` (`3d`)
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'events' | 'schedule' | 'about' | 'gallery' | 'sponsors' | 'faq' | '3d' | 'portal' | 'register'
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Events Filtering, Accordion & Modal State
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEventModal, setSelectedEventModal] = useState(null);
  const [activeAccordionIdx, setActiveAccordionIdx] = useState(2); // Default expanded 03 CONzine or hovered panel

  // Schedule Day & Category Filter State
  const [scheduleDay, setScheduleDay] = useState('day1'); // 'day1' | 'day2'
  const [scheduleFilter, setScheduleFilter] = useState('ALL');

  // FAQ Open Accordion State
  const [openFaqIdx, setOpenFaqIdx] = useState(0);

  // Portal Sub-Tab State (matches screen recording at 01:16 - 01:22)
  const [portalSubTab, setPortalSubTab] = useState('registrations'); // 'registrations' | 'ticket' | 'schedule' | 'payments' | 'announcements'

  // Live Countdown Timer State (matches bottom hero bar in screen recording 00:01 - 00:11)
  const [countdown, setCountdown] = useState({ days: 33, hrs: 7, min: 41, sec: 12 });
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.sec > 0) return { ...prev, sec: prev.sec - 1 };
        if (prev.min > 0) return { ...prev, min: prev.min - 1, sec: 59 };
        if (prev.hrs > 0) return { ...prev, hrs: prev.hrs - 1, min: 59, sec: 59 };
        return { ...prev, days: Math.max(0, prev.days - 1), hrs: 23, min: 59, sec: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Three.js 3D Monument & Landscape Parameters
  const [monumentPreset, setMonumentPreset] = useState('shikhara'); // 'shikhara' | 'pagoda' | 'diagrid'
  const [weatherMode, setWeatherMode] = useState('storm'); // 'storm' | 'clear' | 'mist'
  const [timeOfDay, setTimeOfDay] = useState('sunset'); // 'sunset' | 'golden' | 'daylight' | 'night'
  const [cameraPreset, setCameraPreset] = useState('threeQuarter'); // 'threeQuarter' | 'frontElevation' | 'sideElevation' | 'plinthCloseup' | 'vastuPlan'
  const [showVastuGrid, setShowVastuGrid] = useState(false);
  const [wireframeOn, setWireframeOn] = useState(false);
  const [assemblyProgress, setAssemblyProgress] = useState(100);

  // V-Ray 6 Frame Buffer (VFB) Physical Camera & Render Pass Controls
  const [vfbOpen, setVfbOpen] = useState(false);
  const [vrayExposure, setVrayExposure] = useState(1.22);
  const [vrayWetness, setVrayWetness] = useState(0.32);
  const [vrayBloom, setVrayBloom] = useState(0.88);
  const [vrayPass, setVrayPass] = useState('beauty'); // 'beauty' | 'specular' | 'normals' | 'clay'

  // Registration & Delegate Pass State (Exact match to 01:04 - 01:15 in video)
  const [regForm, setRegForm] = useState({
    categoryType: 'Team', // 'Team' | 'Individual' | 'Faculty' | 'Delegate'
    competitionId: 'conmix-day1',
    fullName: 'Aditi Kulkarni',
    email: 'aditi.cv23@rvce.edu.in',
    phone: '+91 98450 67890',
    college: 'R.V. College of Engineering, Bengaluru',
    usn: '1RV23CV042',
    teamName: 'Concrete Titans',
    otherMembers: 'Rohan Deshmukh, Karthik Shetty',
    paymentMethod: 'UPI / QR Instant',
    selectedEvents: ['conmix-day1', 'conarch-day1']
  });

  const [generatedPasses, setGeneratedPasses] = useState([
    {
      passId: 'CF26-RVCE-0429',
      holderName: 'Aditi Kulkarni',
      college: 'R.V. College of Engineering, Bengaluru',
      usn: '1RV23CV042',
      teamName: 'Concrete Titans',
      events: ['CONmix: Mix Design Challenge', 'CONarch: Arch Design & Build'],
      issuedAt: '30 NOV & 01 DEC 2026',
      status: 'VERIFIED & CHECKED IN',
      gate: 'GATE 01 · CIVIL BLOCK',
      accessLevel: 'FULL CONCLAVE'
    }
  ]);
  const [regSuccessBanner, setRegSuccessBanner] = useState(false);

  // Source Code Exporter Modal State
  const [codeModalOpen, setCodeModalOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // Filtered events list matching the 8 filter tabs in screen recording (00:35)
  const filteredEvents = useMemo(() => {
    return EVENTS_DATA.filter((ev) => {
      const matchesCat =
        selectedCategory === 'ALL' ||
        ev.category === selectedCategory ||
        (ev.filterTags && ev.filterTags.includes(selectedCategory));
      const matchesSearch =
        ev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ev.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ev.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ev.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ev.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Filtered schedule list
  const filteredSchedule = useMemo(() => {
    const list = SCHEDULE_DATA[scheduleDay] || [];
    if (scheduleFilter === 'ALL') return list;
    return list.filter((slot) => slot.category === scheduleFilter);
  }, [scheduleDay, scheduleFilter]);

  // Navigate helper
  const navigateTo = (tab, eventToPreselect = null) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    if (eventToPreselect && tab === 'register') {
      setRegForm((prev) => ({
        ...prev,
        competitionId: eventToPreselect,
        selectedEvents: prev.selectedEvents.includes(eventToPreselect)
          ? prev.selectedEvents
          : [...prev.selectedEvents, eventToPreselect]
      }));
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toggle event in registration form
  const toggleRegEvent = (eventId) => {
    setRegForm((prev) => {
      const exists = prev.selectedEvents.includes(eventId);
      return {
        ...prev,
        competitionId: eventId,
        selectedEvents: exists
          ? prev.selectedEvents.filter((id) => id !== eventId)
          : [...prev.selectedEvents, eventId]
      };
    });
  };

  // Complete registration & issue pass
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const chosenEv = EVENTS_DATA.find((ev) => ev.id === regForm.competitionId) || EVENTS_DATA[0];
    const newPass = {
      passId: `CF26-RVCE-${Math.floor(1000 + Math.random() * 9000)}`,
      holderName: regForm.fullName || 'Aditi Kulkarni',
      college: regForm.college || 'R.V. College of Engineering, Bengaluru',
      usn: regForm.usn || '1RV23CV042',
      teamName: regForm.teamName || 'Concrete Titans',
      events: [chosenEv.title],
      issuedAt: '30 NOV & 01 DEC 2026',
      status: 'VERIFIED & CHECKED IN',
      gate: 'GATE 01 · CIVIL BLOCK',
      accessLevel: 'FULL CONCLAVE'
    };
    setGeneratedPasses((prev) => [newPass, ...prev]);
    setRegSuccessBanner(true);
    setTimeout(() => {
      setRegSuccessBanner(false);
      setPortalSubTab('ticket');
      navigateTo('portal');
    }, 900);
  };

  const selectedCompObj =
    EVENTS_DATA.find((ev) => ev.id === regForm.competitionId) || EVENTS_DATA[0];

  return (
    <div
      className="min-h-screen bg-[#fff8ef] bg-architectural-grid text-[#34252b] flex flex-col selection:bg-[#3b0924] selection:text-[#fff8ef] antialiased"
      style={{ fontFamily: "'Archivo', sans-serif" }}
    >
      {/* Google Fonts & Architectural Blueprint Grid Pattern Injection */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,400..900;1,400..900&family=Cormorant+Garamond:ital,wght@0,400..700;1,400..700&family=JetBrains+Mono:wght@400..800&display=swap');
        .font-serif-editorial { font-family: 'Cormorant Garamond', Georgia, serif; }
        .font-mono-tech { font-family: 'JetBrains Mono', monospace; }
        .bg-architectural-grid {
          background-color: #fff8ef;
          background-image:
            linear-gradient(to right, rgba(169, 139, 120, 0.14) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(169, 139, 120, 0.14) 1px, transparent 1px);
          background-size: 64px 64px;
        }
        .vertical-writing {
          writing-mode: vertical-rl;
          transform: rotate(180deg);
        }
      `}</style>

      {/* =====================================================================
          EXACT HEADER (Fixed top, h-20, bg-[#fff8ef]/95 backdrop-blur-md)
      ===================================================================== */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#fff8ef]/95 backdrop-blur-md border-b border-[#eadfd4] transition-all duration-300">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 h-20 flex items-center justify-between gap-2">
          {/* Left Brand + Department + ICI Badge */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <button
              onClick={() => navigateTo('home')}
              className="flex items-center gap-3 group text-left cursor-pointer"
            >
              <div className="size-10 rounded-xl border border-[#eadfd4] bg-white grid place-items-center shadow-xs group-hover:border-[#a98b78] transition-colors shrink-0">
                {/* RVCE Crest Badge */}
                <svg viewBox="0 0 40 40" className="size-7 text-[#3b0924]" fill="none">
                  <rect x="4" y="4" width="32" height="32" rx="6" stroke="currentColor" strokeWidth="2.2" />
                  <path d="M10 29L20 9L30 29H10Z" stroke="#a98b78" strokeWidth="2" fill="rgba(169,139,120,0.15)" />
                  <path d="M20 9V29M14 21H26" stroke="currentColor" strokeWidth="1.8" />
                  <circle cx="20" cy="15" r="2" fill="#3b0924" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-black text-base sm:text-lg tracking-tight text-[#3b0924] leading-none uppercase">
                  CONCRETE FAIR <span className="text-[#a98b78]">2026</span>
                </span>
                <span className="font-mono-tech text-[8px] text-[#77666a] tracking-wider uppercase mt-1 font-semibold">
                  RVCE CIVIL · WHERE CONCRETE MEETS CREATIVITY
                </span>
              </div>
            </button>

            <div className="hidden xl:block h-6 w-px bg-[#eadfd4]" />

            <div className="hidden xl:flex flex-col">
              <span className="text-[9px] font-mono-tech uppercase tracking-widest text-[#3b0924] font-bold">
                DEPT. OF CIVIL ENGINEERING
              </span>
              <span className="text-[8px] font-mono-tech text-[#77666a] tracking-wider">
                RV COLLEGE OF ENGINEERING · 13TH EDITION
              </span>
            </div>

            <div className="hidden 2xl:block h-6 w-px bg-[#eadfd4]" />

            <div className="hidden 2xl:flex items-center gap-2">
              <div className="size-8 rounded-lg border border-[#eadfd4] bg-white grid place-items-center shadow-2xs shrink-0">
                <Compass className="size-5 text-[#3b0924]" />
              </div>
              <div className="flex flex-col">
                <span className="text-[8px] font-mono-tech uppercase tracking-wider text-[#3b0924] font-bold leading-tight">
                  ICI STUDENT CHAPTER
                </span>
                <span className="text-[7px] font-mono-tech text-[#77666a] tracking-wider uppercase">
                  BENGALURU CENTRE
                </span>
              </div>
            </div>
          </div>

          {/* Center Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
            {[
              { id: 'home', label: 'Home' },
              { id: 'about', label: 'About' },
              { id: 'events', label: 'Events' },
              { id: 'schedule', label: 'Schedule' },
              { id: 'gallery', label: 'Gallery' },
              { id: 'sponsors', label: 'Sponsors' },
              { id: 'faq', label: 'FAQs' }
            ].map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => navigateTo(item.id)}
                  className={`text-xs tracking-wide transition-colors relative py-1 cursor-pointer flex items-center gap-1 ${
                    isActive
                      ? 'text-[#3b0924] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#3b0924]'
                      : 'text-[#77666a] hover:text-[#3b0924] font-medium'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => setCodeModalOpen(true)}
              title="Export Page Source Code"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono-tech font-semibold text-[#3b0924] bg-[#f4e9dc] hover:bg-[#eadfd4] border border-[#d8c2ab] transition-all cursor-pointer"
            >
              <Code2 className="size-3.5" />
              <span>Code</span>
            </button>

            <button
              onClick={() => navigateTo('portal')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'portal'
                  ? 'bg-[#f4e9dc] text-[#3b0924] border border-[#d8c2ab]'
                  : 'text-[#77666a] hover:text-[#3b0924] hover:bg-[#f4e9dc]'
              }`}
            >
              <Ticket className="size-3.5" />
              <span>My Pass</span>
            </button>

            <button
              onClick={() => navigateTo('register')}
              className="group relative inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#3b0924] hover:bg-[#521331] text-[#fff8ef] rounded-full text-xs font-semibold tracking-wide transition-all duration-300 shadow-xs hover:shadow-md active:scale-[0.98] cursor-pointer"
            >
              <span>Register Now</span>
              <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => navigateTo('events')}
              className="px-3 py-1.5 rounded-full text-[11px] font-bold bg-[#f4e9dc] text-[#3b0924] border border-[#d8c2ab]"
            >
              Events
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#77666a] hover:text-[#3b0924] rounded-lg hover:bg-[#f4e9dc] transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#fff8ef] border-b border-[#eadfd4] px-6 py-5 space-y-4 shadow-xl">
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'home', label: 'Home' },
                { id: 'events', label: '8 Flagship Events' },
                { id: 'schedule', label: '2-Day Schedule' },
                { id: '3d', label: '3D Structure (/towers)' },
                { id: 'about', label: 'About RVCE Civil' },
                { id: 'gallery', label: 'Lab Gallery' },
                { id: 'sponsors', label: 'Sponsors' },
                { id: 'faq', label: 'FAQs' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => navigateTo(item.id)}
                  className={`text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold border ${
                    activeTab === item.id
                      ? 'bg-[#3b0924] text-[#fff8ef] border-[#3b0924]'
                      : 'bg-[#f4e9dc]/60 text-[#34252b] border-[#eadfd4]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="pt-2 border-t border-[#eadfd4] flex flex-wrap items-center justify-between gap-2">
              <button
                onClick={() => navigateTo('portal')}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold bg-[#f4e9dc] text-[#3b0924] border border-[#d8c2ab]"
              >
                <Ticket className="size-3.5" />
                My Pass
              </button>
              <button
                onClick={() => navigateTo('register')}
                className="flex-1 justify-center inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#3b0924] text-[#fff8ef] rounded-full text-xs font-semibold"
              >
                <span>Register Now</span>
                <ArrowUpRight className="size-3.5" />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content Spacer for Fixed Header */}
      <main className="flex-1 pt-20">
        {/* ===================================================================
            VIEW 1: HOME (Exact Hero with V-Ray 3D Monument + Bottom Countdown Bar)
        =================================================================== */}
        {activeTab === 'home' && (
          <>
            {/* HERO SECTION — Exact match to screen recording 00:00 - 00:11 */}
            <section className="relative w-full min-h-[90dvh] lg:min-h-[94dvh] flex flex-col justify-between overflow-hidden bg-[#1d0411] border-b border-[#75435c]/60 select-none">
              {/* Interactive V-Ray Three.js WebGL 3D Monument & Landscape Layer (UNCHANGED) */}
              <div className="absolute inset-0 z-0 pointer-events-auto">
                <ThreeMonumentCanvas
                  preset={monumentPreset}
                  weather={weatherMode}
                  timeOfDay={timeOfDay}
                  cameraPreset={cameraPreset}
                  showVastuGrid={showVastuGrid}
                  wireframeOverlay={wireframeOn}
                  autoRotate={true}
                  fullInteractive={false}
                  vrayExposure={vrayExposure}
                  vrayWetness={vrayWetness}
                  vrayBloom={vrayBloom}
                  vrayPass={vrayPass}
                />
              </div>

              {/* Left & Bottom Gradient Overlays */}
              <div className="absolute inset-y-0 left-0 w-full lg:w-[48%] z-1 pointer-events-none bg-gradient-to-r from-[#1d0411]/95 via-[#1d0411]/65 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-28 z-1 pointer-events-none bg-gradient-to-t from-[#1d0411]/90 via-[#1d0411]/25 to-transparent" />

              {/* Top Hero Bar */}
              <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-10 pt-4 flex items-center justify-between pointer-events-none">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3b0924]/90 backdrop-blur-md border border-[#75435c]/80 pointer-events-auto shadow-2xs font-mono-tech text-[10px] sm:text-[11px] font-bold tracking-widest uppercase text-[#eadfd4]">
                  <span className="size-2 rounded-full bg-[#d8c2ab] animate-pulse" />
                  <span className="text-white">RVCE CIVIL</span>
                  <span className="text-[#a98b78]">·</span>
                  <span className="text-[#eadfd4]">13TH EDITION · EST. 1963</span>
                </div>

                <div className="flex items-center gap-2.5 pointer-events-auto">
                  <span className="font-mono-tech text-[10px] tracking-wider uppercase text-[#eadfd4] hidden md:inline">
                    DRAG TO EXPLORE
                  </span>
                  <button
                    onClick={() => setVfbOpen(!vfbOpen)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-mono-tech uppercase tracking-wider transition-all shadow-2xs cursor-pointer ${
                      vfbOpen
                        ? 'bg-[#d8c2ab] text-[#1d0411] border-[#d8c2ab] font-bold'
                        : 'bg-[#3b0924]/90 hover:bg-[#521331] text-[#d8c2ab] border-[#75435c]'
                    }`}
                  >
                    <Sliders className="size-3" />
                    <span>V-Ray VFB</span>
                  </button>
                  <button
                    onClick={() => navigateTo('3d')}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#521331] hover:bg-[#75435c] text-white border border-[#75435c] font-mono-tech text-[10px] font-semibold tracking-wider uppercase transition-all shadow-2xs cursor-pointer"
                  >
                    <span>3D Structure</span>
                    <ArrowUpRight className="size-3 text-[#d8c2ab]" />
                  </button>
                </div>
              </div>

              {/* Toggleable V-Ray Frame Buffer (VFB) Floating Settings Panel */}
              {vfbOpen && (
                <div className="relative z-20 w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-10 pt-2 flex justify-end pointer-events-none">
                  <div className="w-full max-w-xs bg-[#1d0411]/95 backdrop-blur-md border border-[#75435c] rounded-2xl p-4 text-white shadow-2xl pointer-events-auto space-y-3">
                    <div className="flex items-center justify-between border-b border-[#75435c]/60 pb-2">
                      <span className="font-mono-tech text-[10px] uppercase tracking-widest text-[#d8c2ab] font-bold">
                        V-RAY 6 FRAME BUFFER (PBR)
                      </span>
                      <button
                        onClick={() => setVfbOpen(false)}
                        className="text-[#d8c2ab] hover:text-white cursor-pointer"
                      >
                        <X className="size-3.5" />
                      </button>
                    </div>
                    <div>
                      <span className="font-mono-tech text-[9px] text-[#d8c2ab] uppercase block mb-1">
                        RENDER ELEMENT PASS
                      </span>
                      <div className="grid grid-cols-4 gap-1">
                        {[
                          { id: 'beauty', label: 'Beauty' },
                          { id: 'specular', label: 'Specular' },
                          { id: 'normals', label: 'Normals' },
                          { id: 'clay', label: 'Clay' }
                        ].map((p) => (
                          <button
                            key={p.id}
                            onClick={() => setVrayPass(p.id)}
                            className={`py-1 rounded text-[9px] font-mono-tech uppercase cursor-pointer border ${
                              vrayPass === p.id
                                ? 'bg-[#d8c2ab] text-[#1d0411] border-[#d8c2ab] font-bold'
                                : 'bg-[#2a0519] text-white/80 border-[#75435c]'
                            }`}
                          >
                            {p.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2 text-[10px] font-mono-tech">
                      <div>
                        <div className="flex justify-between text-[#d8c2ab]">
                          <span>CAMERA EXPOSURE (EV)</span>
                          <span>{vrayExposure.toFixed(2)}</span>
                        </div>
                        <input
                          type="range"
                          min="0.6"
                          max="1.8"
                          step="0.05"
                          value={vrayExposure}
                          onChange={(e) => setVrayExposure(parseFloat(e.target.value))}
                          className="w-full accent-[#d8c2ab] cursor-pointer"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between text-[#d8c2ab]">
                          <span>WET STONE CLEARCOAT</span>
                          <span>{Math.round(vrayWetness * 100)}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.05"
                          value={vrayWetness}
                          onChange={(e) => setVrayWetness(parseFloat(e.target.value))}
                          className="w-full accent-[#d8c2ab] cursor-pointer"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between text-[#d8c2ab]">
                          <span>LENS GLARE &amp; LAMP BLOOM</span>
                          <span>{Math.round(vrayBloom * 100)}%</span>
                        </div>
                        <input
                          type="range"
                          min="0.2"
                          max="1.5"
                          step="0.05"
                          value={vrayBloom}
                          onChange={(e) => setVrayBloom(parseFloat(e.target.value))}
                          className="w-full accent-[#d8c2ab] cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Center-Left Hero Card — Exact match to 00:01 - 00:11 in recording (13th EDITION, 800+ PARTICIPANTS, 08 FLAGSHIP EVENTS) */}
              <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 my-auto py-6 sm:py-8 flex flex-col items-start pointer-events-none">
                <div className="pointer-events-auto w-full max-w-lg lg:max-w-[480px]">
                  <div className="bg-[#3b0924]/95 backdrop-blur-md p-6 sm:p-7 rounded-3xl border border-[#75435c] shadow-[0_25px_60px_-15px_rgba(42,5,25,0.7)] space-y-4 hover:border-[#d8c2ab]/50 transition-all duration-300">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-0.5 bg-[#d8c2ab]" />
                      <span className="font-mono-tech text-[10px] sm:text-[11px] tracking-[0.22em] text-[#d8c2ab] uppercase font-bold">
                        RVCE CIVIL ENGINEERING · 13TH EDITION
                      </span>
                    </div>

                    <h1 className="font-black text-4xl sm:text-5xl lg:text-[50px] tracking-tight text-white leading-[0.9] uppercase">
                      CONCRETE
                      <br />
                      FAIR <span className="text-[#d8c2ab]">2026</span>
                    </h1>

                    <div className="space-y-1.5 border-l-2 border-[#d8c2ab] pl-3.5 py-0.5">
                      <div className="font-mono-tech text-[11px] tracking-[0.18em] text-[#d8c2ab] uppercase font-bold">
                        // WHERE CONCRETE MEETS CREATIVITY //
                      </div>
                      <p className="text-xs sm:text-[13px] font-serif-editorial italic text-[#eadfd4] leading-snug">
                        Learn by doing. Compete with purpose. Connect with industry.
                      </p>
                      <p className="text-xs text-[#eadfd4]/90 leading-relaxed">
                        A national-level platform organized by the Department of Civil Engineering at RV College of
                        Engineering, in association with the ICI Chapter.
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-mono-tech text-white font-semibold pt-1">
                      <Calendar className="size-3.5 text-[#d8c2ab] shrink-0" />
                      <span>30 NOV &amp; 01 DEC 2026</span>
                      <span className="text-[#75435c]">·</span>
                      <span className="text-[#eadfd4]">RVCE CAMPUS, BENGALURU</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 pt-1">
                      <button
                        onClick={() => navigateTo('register')}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#521331] hover:bg-[#75435c] text-[#fff8ef] hover:text-white border border-[#d8c2ab]/40 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
                      >
                        <span>Get Tickets</span>
                        <ArrowUpRight className="size-3.5 text-[#d8c2ab]" />
                      </button>

                      <button
                        onClick={() => navigateTo('events')}
                        className="inline-flex items-center gap-2 px-5 py-3 bg-[#2a0519]/80 hover:bg-[#521331] text-white border border-[#75435c] rounded-full text-xs font-medium tracking-wide transition-all duration-200 shadow-2xs hover:shadow-xs cursor-pointer"
                      >
                        <span>Explore 8 Events</span>
                      </button>
                    </div>

                    {/* Exact 3 Stats from Video 00:01 - 00:11 */}
                    <div className="grid grid-cols-3 gap-2 pt-4 border-t border-[#75435c]">
                      <div>
                        <div className="font-serif-editorial font-bold text-2xl sm:text-[26px] text-white leading-none">
                          13th
                        </div>
                        <div className="font-mono-tech text-[8px] uppercase tracking-widest text-[#d8c2ab] mt-1 font-semibold">
                          EDITION · EST. 1963
                        </div>
                      </div>
                      <div>
                        <div className="font-serif-editorial font-bold text-2xl sm:text-[26px] text-white leading-none">
                          800+
                        </div>
                        <div className="font-mono-tech text-[8px] uppercase tracking-widest text-[#d8c2ab] mt-1 font-semibold">
                          PARTICIPANTS
                        </div>
                      </div>
                      <div>
                        <div className="font-serif-editorial font-bold text-2xl sm:text-[26px] text-white leading-none">
                          08
                        </div>
                        <div className="font-mono-tech text-[8px] uppercase tracking-widest text-[#d8c2ab] mt-1 font-semibold">
                          FLAGSHIP EVENTS
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Hero Telemetry & Live Countdown Bar (Exact match to video 00:00 - 00:11) */}
              <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 pb-5 flex flex-wrap items-end justify-between gap-4 pointer-events-none">
                {/* Left Location Pill */}
                <div className="pointer-events-auto inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-[#3b0924]/95 backdrop-blur-md border border-[#75435c] shadow-lg font-mono-tech text-[10px] tracking-widest uppercase">
                  <span className="size-2 rounded-full bg-[#d8c2ab]" />
                  <span className="text-white font-bold">RVCE CAMPUS</span>
                  <span className="text-[#75435c]">·</span>
                  <span className="text-[#d8c2ab]">MYSORE ROAD, BENGALURU</span>
                </div>

                {/* Center Live Countdown Pill */}
                <div className="pointer-events-auto flex items-center gap-5 px-5 py-2.5 rounded-2xl bg-[#3b0924]/95 backdrop-blur-md border border-[#75435c] shadow-lg text-white">
                  <div className="pr-3 border-r border-[#75435c]/80">
                    <span className="font-mono-tech text-[8px] tracking-widest uppercase text-[#d8c2ab] block">
                      CONCLAVE INAUGURATION
                    </span>
                    <span className="font-mono-tech text-[10px] font-bold text-white uppercase">
                      30 NOV 2026 · 09:00 IST
                    </span>
                  </div>
                  <div className="flex items-center gap-4 font-serif-editorial">
                    {[
                      { val: String(countdown.days).padStart(2, '0'), label: 'DAYS' },
                      { val: String(countdown.hrs).padStart(2, '0'), label: 'HRS' },
                      { val: String(countdown.min).padStart(2, '0'), label: 'MIN' },
                      { val: String(countdown.sec).padStart(2, '0'), label: 'SEC' }
                    ].map((unit, idx) => (
                      <div key={unit.label} className="flex items-center gap-3">
                        <div className="text-center">
                          <div className="text-xl sm:text-2xl font-bold leading-none text-white">
                            {unit.val}
                          </div>
                          <div className="font-mono-tech text-[7px] tracking-widest text-[#d8c2ab] mt-0.5">
                            {unit.label}
                          </div>
                        </div>
                        {idx < 3 && <span className="text-[#75435c] font-mono-tech text-xs">:</span>}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Temple Architecture Quick Link Pill */}
                <button
                  onClick={() => navigateTo('3d')}
                  className="pointer-events-auto inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#3b0924]/95 hover:bg-[#521331] backdrop-blur-md border border-[#75435c] shadow-lg font-mono-tech text-[10px] tracking-widest uppercase text-[#eadfd4] transition-colors cursor-pointer"
                >
                  <span>Temple Architecture</span>
                  <ArrowRight className="size-3 text-[#d8c2ab]" />
                </button>
              </div>
            </section>

            {/* HOME SECTION 2: OFFICIAL EVENTS PREVIEW (3-Column Technical Grid matching 00:36) */}
            <section className="py-20 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                <div>
                  <span className="font-mono-tech text-[10px] uppercase tracking-[0.22em] text-[#a98b78] font-bold block mb-2">
                    CONCRETE FAIR 2026 · EIGHT CORE COMPETITIONS · ONE UNIFIED COMMUNITY
                  </span>
                  <h2 className="font-serif-editorial text-4xl sm:text-5xl text-[#3b0924] tracking-tight uppercase leading-none">
                    OFFICIAL EVENTS, CHALLENGES &amp; CONTESTS
                  </h2>
                </div>
                <button
                  onClick={() => navigateTo('events')}
                  className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#3b0924] text-[#fff8ef] text-xs font-bold hover:bg-[#521331] transition-all duration-300 shadow-sm cursor-pointer"
                >
                  <span>Explore All 12 Sessions</span>
                  <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {EVENTS_DATA.slice(0, 6).map((ev) => (
                  <div
                    key={ev.id}
                    onClick={() => setSelectedEventModal(ev)}
                    className="group bg-[#fff8ef] hover:bg-white border border-[#eadfd4] hover:border-[#3b0924] rounded-xl overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-2xs hover:shadow-[0_20px_40px_-15px_rgba(59,9,36,0.18)] hover:-translate-y-1 cursor-pointer"
                  >
                    {/* Top Image Header with Exact Badges from Video 00:38 */}
                    <div className="relative h-52 w-full overflow-hidden bg-[#1d0411]">
                      <img
                        src={ev.image}
                        alt={ev.title}
                        loading="lazy"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1d0411]/85 via-[#1d0411]/20 to-transparent" />

                      {/* Top-Left Pill: CF-01 · 30 Nov '26 */}
                      <div className="absolute top-3 left-3">
                        <span className="font-mono-tech text-[10px] font-bold px-2.5 py-1 rounded bg-[#fff8ef]/95 text-[#34252b] shadow-2xs">
                          {ev.specTag}
                        </span>
                      </div>

                      {/* Bottom-Left Venue Pill & Bottom-Right Time Pill */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
                        <span className="font-mono-tech text-[10px] text-white bg-[#1d0411]/80 backdrop-blur-xs px-2.5 py-1 rounded flex items-center gap-1.5 border border-white/15">
                          <MapPin className="size-3 text-[#d8c2ab]" />
                          <span className="truncate max-w-[190px]">{ev.venue}</span>
                        </span>
                        <span className="font-mono-tech text-[10px] font-bold text-white bg-[#1d0411]/80 backdrop-blur-xs px-2.5 py-1 rounded border border-white/15 shrink-0">
                          {ev.time}
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-serif-editorial font-semibold text-2xl text-[#34252b] group-hover:text-[#3b0924] transition-colors mb-2">
                          {ev.title}
                        </h3>
                        <p className="text-xs text-[#77666a] leading-relaxed mb-6 line-clamp-3">
                          {ev.shortDesc}
                        </p>
                      </div>

                      <div>
                        {/* Team Size Row */}
                        <div className="py-3 border-t border-b border-[#eadfd4] flex items-center justify-between text-xs mb-4">
                          <span className="text-[#77666a] flex items-center gap-1.5 font-mono-tech text-[11px]">
                            <Users className="size-3.5 text-[#a98b78]" />
                            <span>Team Size</span>
                          </span>
                          <span className="font-mono-tech text-[11px] font-bold text-[#34252b]">
                            {ev.teamSize}
                          </span>
                        </div>

                        {/* Registration Fee & REGISTER + Button */}
                        <div
                          className="flex items-center justify-between"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div>
                            <span className="font-mono-tech text-[9px] uppercase tracking-wider text-[#a98b78] block">
                              REGISTRATION FEE
                            </span>
                            <span className="font-serif-editorial font-bold text-xl text-[#34252b]">
                              {ev.entryFee}
                            </span>
                          </div>
                          <button
                            onClick={() => navigateTo('register', ev.id)}
                            className="px-4 py-2 rounded bg-[#3b0924] hover:bg-[#521331] text-[#fff8ef] font-mono-tech text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5"
                          >
                            <span>REGISTER</span>
                            <ArrowUpRight className="size-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {/* ===================================================================
            VIEW 2: DEDICATED `/events` PAGE (Exact Match to Video 00:30 - 00:51)
            Includes 5-Panel Horizontal Hover-Expanding Accordion + 12-Card Grid
        =================================================================== */}
        {activeTab === 'events' && (
          <section className="py-12 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10">
            {/* Editorial Header */}
            <div className="mb-10">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-5 h-px bg-[#a98b78]" />
                <span className="font-mono-tech text-[10px] uppercase tracking-[0.22em] text-[#a98b78] font-bold">
                  CONCRETE FAIR 2026 · EIGHT CORE COMPETITIONS · ONE UNIFIED COMMUNITY
                </span>
              </div>
              <h1 className="font-serif-editorial text-4xl sm:text-6xl text-[#34252b] tracking-tight uppercase leading-none mb-3">
                OFFICIAL EVENTS, CHALLENGES &amp; CONTESTS
              </h1>
              <p className="font-serif-editorial italic text-lg sm:text-xl text-[#77666a]">
                Combining hands-on civil engineering challenges with creative and communication-led events across Day 1
                and Day 2.
              </p>
            </div>

            {/* 5-PANEL INTERACTIVE HORIZONTAL HOVER ACCORDION (Exact match to video 00:30 - 00:36) */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-[#a98b78] font-semibold">
                  FEATURED FLAGSHIP SHOWCASE (05 INTERACTIVE MODULES)
                </span>
                <span className="font-mono-tech text-[10px] text-[#77666a] hidden sm:inline">
                  Hover to expand specification
                </span>
              </div>

              <div className="flex flex-col lg:flex-row h-[520px] lg:h-[440px] w-full rounded-3xl overflow-hidden border border-[#3b0924]/20 shadow-xl bg-[#1d0411]">
                {[
                  EVENTS_DATA[0], // 01 CONmix
                  EVENTS_DATA[1], // 02 CONarch
                  EVENTS_DATA[2], // 03 CONzine
                  EVENTS_DATA[3], // 04 CONmake
                  EVENTS_DATA[5]  // 05 CONscope
                ].map((ev, idx) => {
                  const isExpanded = activeAccordionIdx === idx;
                  const panelNum = `0${idx + 1}`;
                  return (
                    <div
                      key={ev.id}
                      onMouseEnter={() => setActiveAccordionIdx(idx)}
                      onClick={() => setActiveAccordionIdx(idx)}
                      className={`relative overflow-hidden transition-all duration-500 ease-out cursor-pointer border-b lg:border-b-0 lg:border-r border-white/15 flex flex-col justify-between ${
                        isExpanded ? 'flex-[4.2] p-6 sm:p-8' : 'flex-[0.65] p-4 items-center'
                      }`}
                    >
                      {/* Background Image & Burgundy Vignette */}
                      <img
                        src={ev.image}
                        alt={ev.title}
                        className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ${
                          isExpanded ? 'scale-100 opacity-65' : 'scale-110 opacity-35 grayscale-[30%]'
                        }`}
                      />
                      <div
                        className={`absolute inset-0 transition-opacity duration-500 ${
                          isExpanded
                            ? 'bg-gradient-to-t from-[#1d0411] via-[#2a0519]/70 to-[#1d0411]/30'
                            : 'bg-[#2a0519]/80 hover:bg-[#3b0924]/70'
                        }`}
                      />

                      {/* Top Number & Status */}
                      <div className="relative z-10 w-full flex items-center justify-between">
                        <span className="font-serif-editorial text-2xl sm:text-3xl text-white/90 font-semibold">
                          {panelNum}
                        </span>
                        {isExpanded && (
                          <span className="font-mono-tech text-[10px] uppercase tracking-widest px-3 py-1 rounded-full bg-[#3b0924]/90 text-[#d8c2ab] border border-[#75435c]">
                            {ev.code} · {ev.category}
                          </span>
                        )}
                      </div>

                      {/* Collapsed Vertical Title */}
                      {!isExpanded && (
                        <div className="relative z-10 my-auto hidden lg:flex flex-col items-center gap-3">
                          <span className="vertical-writing font-serif-editorial text-xl tracking-wide text-white/90 whitespace-nowrap">
                            {ev.title}
                          </span>
                          <span className="vertical-writing font-mono-tech text-[9px] uppercase tracking-widest text-[#d8c2ab]/80">
                            {ev.category}
                          </span>
                        </div>
                      )}

                      {/* Expanded Full Specification Content */}
                      {isExpanded && (
                        <div className="relative z-10 max-w-xl space-y-3 mt-auto animate-fadeIn">
                          <div className="font-mono-tech text-[10px] uppercase tracking-widest text-[#d8c2ab]">
                            {ev.code} · {ev.category}
                          </div>
                          <h2 className="font-serif-editorial text-3xl sm:text-4xl text-white font-semibold leading-tight">
                            {ev.title}
                          </h2>
                          <p className="text-xs sm:text-sm text-[#eadfd4]/90 leading-relaxed line-clamp-2">
                            {ev.shortDesc}
                          </p>

                          <div className="flex flex-wrap items-center gap-4 pt-1 font-mono-tech text-[11px] text-[#d8c2ab]">
                            <span className="flex items-center gap-1.5">
                              <Users className="size-3.5" />
                              {ev.teamSize.split(' ')[0]}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <MapPin className="size-3.5" />
                              {ev.venue}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Calendar className="size-3.5" />
                              {ev.day} · {ev.time}
                            </span>
                          </div>

                          <div
                            className="flex flex-wrap items-center gap-3 pt-2"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button
                              onClick={() => navigateTo('register', ev.id)}
                              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#521331] hover:bg-[#75435c] text-white border border-[#d8c2ab]/40 text-xs font-bold transition-all cursor-pointer"
                            >
                              <span>Register for Event</span>
                              <ArrowUpRight className="size-3.5 text-[#d8c2ab]" />
                            </button>
                            <button
                              onClick={() => setSelectedEventModal(ev)}
                              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-semibold backdrop-blur-xs transition-all cursor-pointer"
                            >
                              <span>Specifications</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Search Bar & 8 Category Filter Tabs (Exact match to video 00:36) */}
            <div className="space-y-4 mb-10">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-[#fff8ef] border border-[#eadfd4] rounded-xl px-4 py-2.5">
                <div className="flex items-center gap-3 flex-1">
                  <Search className="size-4 text-[#a98b78]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search event, code (e.g. CF-01), venue..."
                    className="w-full bg-transparent text-xs text-[#34252b] placeholder-[#a98b78] outline-none font-mono-tech"
                  />
                </div>
                <span className="font-mono-tech text-[11px] text-[#77666a] shrink-0">
                  <strong className="text-[#3b0924]">{filteredEvents.length}</strong> of {EVENTS_DATA.length} Events
                  Showing
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {[
                  'ALL',
                  'TECHNICAL',
                  'NON-TECHNICAL',
                  'MATERIAL INNOVATION',
                  'STRUCTURAL DESIGN',
                  'COMPUTATIONAL BIM',
                  'FIELD',
                  'QUIZZES & CULTURAL',
                  'SYMPOSIUM & LECTURE'
                ].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded font-mono-tech text-[10px] uppercase tracking-wider font-bold transition-all cursor-pointer border ${
                      selectedCategory === cat
                        ? 'bg-[#3b0924] text-[#fff8ef] border-[#3b0924]'
                        : 'bg-[#fff8ef] text-[#77666a] border-[#eadfd4] hover:border-[#a98b78] hover:text-[#3b0924]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* 3-Column 12-Event Cards Grid (Exact match to video 00:37 - 00:48) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((ev) => (
                <div
                  key={ev.id}
                  onClick={() => setSelectedEventModal(ev)}
                  className="group bg-[#fff8ef] hover:bg-white border border-[#eadfd4] hover:border-[#3b0924] rounded-xl overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-2xs hover:shadow-[0_20px_40px_-15px_rgba(59,9,36,0.18)] hover:-translate-y-1 cursor-pointer"
                >
                  {/* Top Image Header with Floating Venue & Time Pills */}
                  <div className="relative h-52 w-full overflow-hidden bg-[#1d0411]">
                    <img
                      src={ev.image}
                      alt={ev.title}
                      loading="lazy"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1d0411]/85 via-[#1d0411]/20 to-transparent" />

                    {/* Top-Left Pill: CF-01 · 30 Nov '26 */}
                    <div className="absolute top-3 left-3">
                      <span className="font-mono-tech text-[10px] font-bold px-2.5 py-1 rounded bg-[#fff8ef]/95 text-[#34252b] shadow-2xs">
                        {ev.specTag}
                      </span>
                    </div>

                    {/* Bottom-Left Venue Pill & Bottom-Right Time Pill */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
                      <span className="font-mono-tech text-[10px] text-white bg-[#1d0411]/80 backdrop-blur-xs px-2.5 py-1 rounded flex items-center gap-1.5 border border-white/15">
                        <MapPin className="size-3 text-[#d8c2ab]" />
                        <span className="truncate max-w-[190px]">{ev.venue}</span>
                      </span>
                      <span className="font-mono-tech text-[10px] font-bold text-white bg-[#1d0411]/80 backdrop-blur-xs px-2.5 py-1 rounded border border-white/15 shrink-0">
                        {ev.time}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif-editorial font-semibold text-2xl text-[#34252b] group-hover:text-[#3b0924] transition-colors mb-2">
                        {ev.title}
                      </h3>
                      <p className="text-xs text-[#77666a] leading-relaxed mb-6 line-clamp-3">
                        {ev.shortDesc}
                      </p>
                    </div>

                    <div>
                      <div className="py-3 border-t border-b border-[#eadfd4] flex items-center justify-between text-xs mb-4">
                        <span className="text-[#77666a] flex items-center gap-1.5 font-mono-tech text-[11px]">
                          <Users className="size-3.5 text-[#a98b78]" />
                          <span>Team Size</span>
                        </span>
                        <span className="font-mono-tech text-[11px] font-bold text-[#34252b]">
                          {ev.teamSize}
                        </span>
                      </div>

                      <div
                        className="flex items-center justify-between"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div>
                          <span className="font-mono-tech text-[9px] uppercase tracking-wider text-[#a98b78] block">
                            REGISTRATION FEE
                          </span>
                          <span className="font-serif-editorial font-bold text-xl text-[#34252b]">
                            {ev.entryFee}
                          </span>
                        </div>
                        <button
                          onClick={() => navigateTo('register', ev.id)}
                          className="px-4 py-2 rounded bg-[#3b0924] hover:bg-[#521331] text-[#fff8ef] font-mono-tech text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5"
                        >
                          <span>REGISTER</span>
                          <ArrowUpRight className="size-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ===================================================================
            VIEW 3: INTERACTIVE 3D STRUCTURE LAB (`/towers` / `3d`)
            Exact match to Video 00:12 - 00:30 (Framed Viewport + Scrubber + Dossier)
        =================================================================== */}
        {activeTab === '3d' && (
          <section className="pb-16">
            {/* Sub-Header Bar (00:12 in video) */}
            <div className="bg-[#fff8ef] border-b border-[#eadfd4]">
              <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 h-14 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => navigateTo('home')}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3b0924] text-[#fff8ef] font-mono-tech text-[10px] uppercase tracking-wider font-bold cursor-pointer"
                  >
                    <span>← CONCRETE FAIR 2026</span>
                  </button>
                  <span className="font-mono-tech text-[10px] uppercase tracking-widest text-[#77666a] hidden sm:inline">
                    INDIAN TEMPLE MONUMENT · 3D STUDY
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-mono-tech text-[10px] text-[#77666a] hidden md:inline">
                    ● Interactive 3D Stage · Drag to Orbit
                  </span>
                  <button
                    onClick={() => navigateTo('events')}
                    className="px-4 py-1.5 rounded-full bg-[#3b0924] hover:bg-[#521331] text-[#fff8ef] font-mono-tech text-[10px] uppercase tracking-wider font-bold cursor-pointer"
                  >
                    EXPLORE CONCLAVE →
                  </button>
                </div>
              </div>
            </div>

            <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10 pt-6">
              {/* Top Spec Pill Strip */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f4e9dc] border border-[#d8c2ab] font-mono-tech text-[10px] uppercase tracking-widest text-[#3b0924] font-bold">
                  <span>● ARCHITECTURE · VEDIC STONE SHIKHARA</span>
                  <span className="text-[#a98b78]">|</span>
                  <span className="text-[#77666a]">RVCE Civil Engineering Conclave 2026</span>
                </div>

                {/* Camera & Weather Quick Controls */}
                <div className="flex flex-wrap items-center gap-1.5">
                  {[
                    { id: 'threeQuarter', label: '3/4 View' },
                    { id: 'frontElevation', label: 'Front' },
                    { id: 'sideElevation', label: 'Profile' },
                    { id: 'plinthCloseup', label: 'Plinth & Yali' },
                    { id: 'vastuPlan', label: 'Vastu Plan' }
                  ].map((cam) => (
                    <button
                      key={cam.id}
                      onClick={() => {
                        setMonumentPreset('shikhara');
                        setCameraPreset(cam.id);
                      }}
                      className={`px-2.5 py-1 rounded-full font-mono-tech text-[9px] uppercase cursor-pointer border ${
                        cameraPreset === cam.id
                          ? 'bg-[#3b0924] text-[#fff8ef] border-[#3b0924] font-bold'
                          : 'bg-white text-[#77666a] border-[#eadfd4] hover:border-[#3b0924]'
                      }`}
                    >
                      {cam.label}
                    </button>
                  ))}
                  <button
                    onClick={() =>
                      setWeatherMode(
                        weatherMode === 'storm' ? 'clear' : weatherMode === 'clear' ? 'mist' : 'storm'
                      )
                    }
                    className="px-2.5 py-1 rounded-full bg-white border border-[#eadfd4] font-mono-tech text-[9px] uppercase text-[#3b0924] font-bold cursor-pointer"
                  >
                    WEATHER: {weatherMode.toUpperCase()}
                  </button>
                  <button
                    onClick={() =>
                      setTimeOfDay(
                        timeOfDay === 'sunset'
                          ? 'golden'
                          : timeOfDay === 'golden'
                          ? 'daylight'
                          : timeOfDay === 'daylight'
                          ? 'night'
                          : 'sunset'
                      )
                    }
                    className="px-2.5 py-1 rounded-full bg-white border border-[#eadfd4] font-mono-tech text-[9px] uppercase text-[#3b0924] font-bold cursor-pointer"
                  >
                    TIME: {timeOfDay.toUpperCase()}
                  </button>
                </div>
              </div>

              {/* Framed Rounded-2xl 3D Stage Viewport (Exact match to video 00:13 - 00:29) */}
              <div className="relative w-full h-[540px] sm:h-[600px] rounded-2xl overflow-hidden border border-[#d8c2ab] shadow-2xl bg-[#1d0411] flex flex-col justify-between select-none">
                {/* Existing V-Ray 6 3D Monument Canvas (UNCHANGED) */}
                <ThreeMonumentCanvas
                  preset={monumentPreset}
                  weather={weatherMode}
                  timeOfDay={timeOfDay}
                  cameraPreset={cameraPreset}
                  showVastuGrid={showVastuGrid}
                  wireframeOverlay={wireframeOn}
                  autoRotate={true}
                  fullInteractive={true}
                  vrayExposure={vrayExposure}
                  vrayWetness={vrayWetness}
                  vrayBloom={vrayBloom}
                  vrayPass={vrayPass}
                />

                {/* Top Viewport Overlay Header */}
                <div className="relative z-10 px-6 pt-5 flex flex-wrap items-center justify-between gap-4 pointer-events-none">
                  <div className="font-serif-editorial text-lg sm:text-xl tracking-widest text-white uppercase font-semibold">
                    CONCRETE <span className="text-[#d8c2ab]">FAIR</span>
                  </div>
                  <div className="font-mono-tech text-[9px] tracking-[0.25em] text-[#eadfd4]/80 uppercase hidden lg:block">
                    RVCE CIVIL ENGINEERING CONCLAVE · 2026
                  </div>
                  <div className="flex items-center gap-2 pointer-events-auto">
                    <span className="px-3 py-1 rounded bg-[#1d0411]/75 border border-white/15 font-mono-tech text-[9px] text-[#eadfd4] uppercase tracking-wider">
                      ARCHITECTURE / INDIA · WEATHER / {weatherMode.toUpperCase()} · TIME / {timeOfDay.toUpperCase()}
                    </span>
                    <button
                      onClick={() => {
                        setCameraPreset('threeQuarter');
                        setAssemblyProgress(100);
                      }}
                      className="px-3 py-1 rounded bg-[#3b0924]/90 hover:bg-[#521331] border border-[#75435c] font-mono-tech text-[9px] text-[#d8c2ab] uppercase tracking-wider cursor-pointer"
                    >
                      ↻ REBUILD
                    </button>
                  </div>
                </div>

                {/* Middle Left & Right Editorial Overlay Text (TRADITION / CIVIL FAIR) */}
                <div className="relative z-10 px-6 sm:px-10 my-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pointer-events-none">
                  <div className="max-w-xs space-y-3">
                    <span className="font-mono-tech text-[9px] uppercase tracking-[0.25em] text-[#d8c2ab] block">
                      NATIONAL CONCLAVE / 2026
                    </span>
                    <h2 className="font-serif-editorial text-3xl sm:text-4xl text-white uppercase tracking-wide leading-none">
                      TRADITION
                    </h2>
                    <p className="font-serif-editorial italic text-sm text-[#eadfd4]/90 leading-relaxed">
                      “Vedic masonry, Roman precision, and timeless monolithic endurance rise from the ground up —
                      where tradition meets tomorrow.”
                    </p>
                  </div>

                  <div className="text-left md:text-right space-y-1">
                    <h2 className="font-serif-editorial text-3xl sm:text-4xl text-white uppercase tracking-wide leading-none">
                      CIVIL
                      <br />
                      FAIR
                    </h2>
                    <span className="font-mono-tech text-[9px] uppercase tracking-[0.22em] text-[#d8c2ab] block">
                      BENGALURU · EST. 1963
                    </span>
                  </div>
                </div>

                {/* Bottom Timeline Scrubber Bar inside Viewport (00:18 - 00:28 in video) */}
                <div className="relative z-10 px-6 pb-5 space-y-3 pointer-events-auto bg-gradient-to-t from-[#1d0411]/90 via-[#1d0411]/40 to-transparent pt-6">
                  <div className="flex items-center justify-between">
                    <div className="mx-auto px-4 py-1.5 rounded bg-[#1d0411]/85 border border-[#d8c2ab]/40 font-mono-tech text-[10px] tracking-[0.2em] text-[#d8c2ab] uppercase">
                      {assemblyProgress < 30
                        ? 'SVASTIKA BASE · MANDAPA PLINTH'
                        : assemblyProgress < 70
                        ? 'GARBHAGRIHA · CARVED SANDSTONE JANGHA'
                        : assemblyProgress < 95
                        ? 'SHIKHARA · NAGARA PYRAMIDAL TOWER'
                        : 'TRADITION MEETS TOMORROW / CONCRETE FAIR 2026'}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setAssemblyProgress((p) => (p >= 100 ? 25 : 100))}
                      className="text-white/80 hover:text-white font-mono-tech text-xs cursor-pointer"
                    >
                      ❚❚
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={assemblyProgress}
                      onChange={(e) => setAssemblyProgress(Number(e.target.value))}
                      className="flex-1 accent-[#d8c2ab] h-1 bg-white/20 rounded-lg cursor-pointer"
                    />
                    <span className="font-mono-tech text-[10px] text-[#eadfd4]">
                      {(assemblyProgress * 0.25).toFixed(2)}s / 25.00s
                    </span>
                  </div>
                </div>
              </div>

              {/* Below-Stage Architectural Dossier Card (Exact match to video 00:13 - 00:30) */}
              <div className="mt-6 bg-[#fff8ef] border border-[#eadfd4] rounded-2xl p-6 sm:p-8 shadow-xs">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left Column */}
                  <div className="lg:col-span-4 lg:border-r border-[#eadfd4] lg:pr-8 space-y-3">
                    <span className="font-mono-tech text-[9px] uppercase tracking-[0.22em] text-[#a98b78] font-bold block">
                      — ARCHITECTURAL DOSSIER
                    </span>
                    <h3 className="font-serif-editorial text-3xl text-[#34252b]">
                      Vedic Stone Shikhara
                    </h3>
                    <p className="text-xs text-[#77666a] font-mono-tech">
                      Monolithic Cut-Stone Masonry · Ascending Nagara Spire · RVCE
                    </p>
                    <div className="inline-block px-3 py-1 rounded bg-[#f4e9dc] border border-[#d8c2ab] font-mono-tech text-[9px] uppercase tracking-wider text-[#3b0924] font-bold">
                      CLASSICAL INDIAN TEMPLE ARCHITECTURE (NAGARA &amp; DRAVIDA SYNTHESIS)
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="lg:col-span-8 space-y-5">
                    <div>
                      <span className="font-mono-tech text-[9px] uppercase tracking-[0.22em] text-[#a98b78] font-bold block mb-2">
                        STRUCTURAL MECHANICS &amp; ASSEMBLY NOTES
                      </span>
                      <p className="font-serif-editorial text-lg text-[#34252b] leading-relaxed">
                        Monolithic cut-stone sanctuary featuring a soaring Shikhara tower rising over a stepped
                        adhisthana plinth. Engineered with dry-friction interlocking stone masonry, corbelled
                        garbhagriha pillars, and crowning amalaka finial.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {[
                        { stage: 'FOUNDATION', val: 'Interlocking Stone Plinth' },
                        { stage: 'SUPERSTRUCTURE', val: 'Corbelled Shikhara Masonry' },
                        { stage: 'CROWN / APEX', val: 'Monolithic Amalaka Finial' }
                      ].map((item) => (
                        <div
                          key={item.stage}
                          className="p-3.5 rounded-xl bg-[#f4e9dc]/60 border border-[#eadfd4]"
                        >
                          <span className="font-mono-tech text-[8px] uppercase tracking-widest text-[#a98b78] block">
                            {item.stage}
                          </span>
                          <span className="font-bold text-xs text-[#34252b] mt-1 block">
                            {item.val}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-[#eadfd4] flex flex-wrap items-center justify-between gap-4 text-xs">
                      <span className="font-mono-tech text-[10px] text-[#77666a]">
                        ● Concrete Fair 2026 · RVCE Department of Civil Engineering
                      </span>
                      <div className="flex items-center gap-4 font-mono-tech text-[11px] font-bold text-[#3b0924]">
                        <button
                          onClick={() => navigateTo('events')}
                          className="hover:underline cursor-pointer"
                        >
                          View Competitions ↗
                        </button>
                        <button
                          onClick={() => navigateTo('schedule')}
                          className="hover:underline cursor-pointer"
                        >
                          Schedule ↗
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ===================================================================
            VIEW 4: SCHEDULE (`/schedule` — Exact match to Video 00:51 - 00:56)
        =================================================================== */}
        {activeTab === 'schedule' && (
          <section className="py-12 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10">
            {/* Header & Action Buttons */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#eadfd4] mb-8">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-5 h-px bg-[#a98b78]" />
                  <span className="font-mono-tech text-[10px] uppercase tracking-[0.22em] text-[#a98b78] font-bold">
                    CONCRETE FAIR 2026 // 30 NOV — 01 DEC 2026
                  </span>
                </div>
                <h1 className="font-serif-editorial text-4xl sm:text-6xl text-[#34252b] uppercase leading-none mb-3">
                  CONCLAVE ITINERARY
                  <br />
                  &amp; TIMELINE
                </h1>
                <p className="font-serif-editorial italic text-lg sm:text-xl text-[#77666a]">
                  Two intensive days of destructive testing, algorithmic modeling sprints, keynote symposia, and prize
                  ceremonies.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => window.print()}
                  className="px-5 py-3 rounded border border-[#34252b] bg-[#fff8ef] hover:bg-[#f4e9dc] text-[#34252b] font-mono-tech text-[10px] uppercase tracking-wider font-bold cursor-pointer flex items-center gap-2"
                >
                  <Download className="size-3.5" />
                  <span>DOWNLOAD SCHEDULE (PDF)</span>
                </button>
                <button
                  onClick={() => navigateTo('register')}
                  className="px-5 py-3 rounded bg-[#3b0924] hover:bg-[#521331] text-[#fff8ef] font-mono-tech text-[10px] uppercase tracking-wider font-bold cursor-pointer flex items-center gap-2"
                >
                  <span>REGISTER PASSES</span>
                  <ArrowUpRight className="size-3.5" />
                </button>
              </div>
            </div>

            {/* Day Switcher & Category Filter Pills (00:52 in video) */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-10">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setScheduleDay('day1')}
                  className={`px-4 py-2 rounded font-mono-tech text-[10px] uppercase tracking-wider font-bold cursor-pointer border ${
                    scheduleDay === 'day1'
                      ? 'bg-[#3b0924] text-[#fff8ef] border-[#3b0924]'
                      : 'bg-[#fff8ef] text-[#77666a] border-[#eadfd4]'
                  }`}
                >
                  DAY 01 // 30 NOV 2026 — GENESIS &amp; TRIALS
                </button>
                <button
                  onClick={() => setScheduleDay('day2')}
                  className={`px-4 py-2 rounded font-mono-tech text-[10px] uppercase tracking-wider font-bold cursor-pointer border ${
                    scheduleDay === 'day2'
                      ? 'bg-[#3b0924] text-[#fff8ef] border-[#3b0924]'
                      : 'bg-[#fff8ef] text-[#77666a] border-[#eadfd4]'
                  }`}
                >
                  DAY 02 // 01 DEC 2026 — FINALS &amp; VALEDICTORY
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                {['ALL', 'CEREMONIAL', 'TESTING LAB', 'WORKSHOP', 'COMPETITION', 'COMPUTATIONAL'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setScheduleFilter(cat)}
                    className={`px-3 py-1.5 rounded font-mono-tech text-[9px] uppercase tracking-wider font-bold cursor-pointer border ${
                      scheduleFilter === cat
                        ? 'bg-[#3b0924] text-[#fff8ef] border-[#3b0924]'
                        : 'bg-[#fff8ef] text-[#77666a] border-[#eadfd4] hover:border-[#a98b78]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Vertical Timeline Rows (00:52 - 00:55 in video) */}
            <div className="divide-y divide-[#eadfd4] border-t border-b border-[#eadfd4]">
              {filteredSchedule.map((slot, idx) => (
                <div
                  key={idx}
                  className="py-7 grid grid-cols-1 md:grid-cols-12 gap-4 items-start hover:bg-[#f4e9dc]/35 transition-colors px-3 rounded-xl"
                >
                  <div className="md:col-span-3">
                    <div className="flex items-center gap-2 font-serif-editorial text-xl text-[#34252b] font-semibold">
                      <Clock className="size-4 text-[#a98b78]" />
                      <span>{slot.time}</span>
                    </div>
                    <span className="font-mono-tech text-[9px] uppercase tracking-widest text-[#a98b78] font-bold block mt-1 pl-6">
                      ● {slot.category}
                    </span>
                  </div>

                  <div className="md:col-span-6 space-y-1.5">
                    <h3 className="font-serif-editorial text-2xl text-[#34252b] font-semibold">
                      {slot.title}
                    </h3>
                    <p className="text-xs text-[#77666a] leading-relaxed">{slot.desc}</p>
                    <div className="font-mono-tech text-[10px] text-[#77666a] pt-1">
                      Speaker / Spec: <strong className="text-[#34252b]">{slot.speaker}</strong>
                    </div>
                  </div>

                  <div className="md:col-span-3 md:text-right font-mono-tech text-[11px] text-[#77666a]">
                    [{slot.venue}]
                  </div>
                </div>
              ))}
            </div>

            {/* Campus Venue & Reporting Guidelines Callout Box (00:54 in video) */}
            <div className="mt-10 p-6 rounded-xl bg-[#f4e9dc]/70 border border-[#d8c2ab] flex items-start gap-4">
              <MapPin className="size-5 text-[#3b0924] shrink-0 mt-1" />
              <div className="space-y-1">
                <h4 className="font-serif-editorial text-xl text-[#34252b] font-semibold">
                  Campus Venue &amp; Reporting Guidelines
                </h4>
                <p className="text-xs text-[#77666a] leading-relaxed">
                  All participating contingents must report to the Civil Engineering Registration Desk before 08:30 AM
                  on 30 November to receive their laminated RFID pass and safety equipment docket. Slump-cone and UTM
                  testing bay access is strictly staggered according to assigned time-slots.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* ===================================================================
            VIEW 5: ABOUT, GALLERY & SPONSORS (Exact match to Video 01:26 - 01:41)
        =================================================================== */}
        {(activeTab === 'about' || activeTab === 'gallery' || activeTab === 'sponsors') && (
          <section className="py-12 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10 space-y-16">
            {/* Editorial Top Heading */}
            <div className="border-b border-[#eadfd4] pb-8">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-5 h-px bg-[#a98b78]" />
                <span className="font-mono-tech text-[10px] uppercase tracking-[0.22em] text-[#a98b78] font-bold">
                  LEGACY · INSTITUTION · EXCELLENCE
                </span>
              </div>
              <h1 className="font-serif-editorial text-4xl sm:text-6xl text-[#34252b] uppercase leading-none mb-3">
                ABOUT CONCRETE FAIR &amp;
                <br />
                RVCE CIVIL ENGINEERING
              </h1>
              <p className="font-serif-editorial italic text-lg sm:text-xl text-[#77666a]">
                “Where classical mechanics meet physical yield points, shaping sustainable skylines across decades.”
              </p>
            </div>

            {/* Six Decades of Structural Excellence + Archival Lab Card (01:26 in video) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-7 space-y-5">
                <h2 className="font-serif-editorial text-3xl text-[#34252b]">
                  Six Decades of Structural Excellence
                </h2>
                <p className="text-xs sm:text-sm text-[#77666a] leading-relaxed">
                  The Department of Civil Engineering at R.V. College of Engineering (RVCE), established in 1963, is
                  among the oldest and most prestigious engineering departments in Karnataka. Recognized as a premier
                  research hub affiliated with Visvesvaraya Technological University (VTU) and accredited by the
                  National Board of Accreditation (NBA), the department has pioneered research in structural materials,
                  geotechnics, environmental hydraulics, and disaster-resilient infrastructure.
                </p>
                <p className="text-xs sm:text-sm text-[#77666a] leading-relaxed">
                  Concrete Fair was founded as a biennial national conclave to bridge the gap between textbook
                  mechanics and field-scale monolithic construction. In its 13th edition, Concrete Fair 2026 brings
                  together over 1,200 delegates, undergraduate researchers, licensed structural engineers, and
                  corporate infrastructure heads for 48 hours of intense testing, prototyping, and knowledge exchange.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3">
                  <div className="p-5 rounded-xl bg-[#fff8ef] border border-[#eadfd4]">
                    <span className="font-mono-tech text-[9px] uppercase tracking-widest text-[#a98b78] block">
                      ACCREDITATION
                    </span>
                    <div className="font-serif-editorial text-2xl text-[#34252b] font-semibold mt-1">
                      NBA Tier-1 &amp; NABL
                    </div>
                    <span className="text-xs text-[#77666a] mt-1 block">
                      Calibrated materials testing wing
                    </span>
                  </div>
                  <div className="p-5 rounded-xl bg-[#fff8ef] border border-[#eadfd4]">
                    <span className="font-mono-tech text-[9px] uppercase tracking-widest text-[#a98b78] block">
                      CONCLAVE EDITION
                    </span>
                    <div className="font-serif-editorial text-2xl text-[#34252b] font-semibold mt-1">
                      13th Edition (2026)
                    </div>
                    <span className="text-xs text-[#77666a] mt-1 block">
                      Continuing legacy of excellence
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Archival Testing Lab Photo Card */}
              <div className="lg:col-span-5 bg-[#fff8ef] border border-[#eadfd4] rounded-xl overflow-hidden shadow-xs">
                <div className="relative h-64 bg-[#1d0411]">
                  <img
                    src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80"
                    alt="RVCE Heavy Structures & Materials Testing Bay"
                    className="w-full h-full object-cover grayscale contrast-125 opacity-90"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#1d0411]/80 text-white font-mono-tech text-[9px] uppercase">
                    ARCHIVAL // RVCE CIVIL LAB
                  </div>
                  <div className="absolute bottom-3 left-3 text-white font-serif-editorial text-lg">
                    Heavy Structures &amp; Materials Testing Bay
                  </div>
                </div>
                <div className="p-6 space-y-2">
                  <span className="font-mono-tech text-[9px] uppercase tracking-widest text-[#a98b78] font-bold block">
                    LABORATORY INFRASTRUCTURE
                  </span>
                  <h3 className="font-serif-editorial text-xl text-[#34252b] font-semibold">
                    Specialized Testing Facilities
                  </h3>
                  <ul className="space-y-1.5 text-xs text-[#77666a] font-mono-tech pt-1">
                    <li>• 2,000 kN Universal Testing Machine (UTM)</li>
                    <li>• Optical Surveying &amp; Geomatics Hub</li>
                    <li>• Structural Model Fabrication Yard</li>
                    <li>• CAD &amp; Smart City Computational Studio</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Four Pillars of Technical Excellence (01:28 in video) */}
            <div className="pt-8 border-t border-[#eadfd4]">
              <span className="font-mono-tech text-[9px] uppercase tracking-widest text-[#a98b78] font-bold block mb-1">
                02 // WHAT MAKES US DIFFERENT
              </span>
              <h2 className="font-serif-editorial text-3xl text-[#34252b] uppercase mb-8">
                FOUR PILLARS OF TECHNICAL EXCELLENCE
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {[
                  {
                    num: 'PILLAR 01',
                    title: 'Code to Concrete',
                    desc: 'Move beyond theory through mix design, concrete testing and cube-based challenges.'
                  },
                  {
                    num: 'PILLAR 02',
                    title: 'Design to Delivery',
                    desc: 'Translate ideas into drawings, models, structures and smart planning concepts.'
                  },
                  {
                    num: 'PILLAR 03',
                    title: 'Field to Problem-Solving',
                    desc: 'Bring surveying, escape-room logic and real-world case studies into learning.'
                  },
                  {
                    num: 'PILLAR 04',
                    title: 'Technical + Creative',
                    desc: 'Balance engineering evaluation with debate, short films, quizzes and teamwork.'
                  }
                ].map((pillar) => (
                  <div
                    key={pillar.num}
                    className="p-6 rounded-xl bg-[#fff8ef] border border-[#eadfd4] space-y-2"
                  >
                    <span className="font-mono-tech text-[9px] uppercase tracking-widest text-[#a98b78] font-bold block">
                      {pillar.num}
                    </span>
                    <h3 className="font-serif-editorial text-xl text-[#34252b] font-semibold">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-[#77666a] leading-relaxed">{pillar.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10 pt-6 border-t border-[#eadfd4] flex flex-wrap items-center justify-between gap-4">
                <span className="font-serif-editorial italic text-lg text-[#77666a]">
                  Interested in faculty partnership or corporate sponsorship?
                </span>
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => navigateTo('events')}
                    className="px-5 py-2.5 rounded border border-[#d8c2ab] bg-[#fff8ef] hover:bg-[#f4e9dc] text-[#34252b] font-mono-tech text-[10px] uppercase tracking-wider font-bold cursor-pointer"
                  >
                    BROWSE COMPETITIONS
                  </button>
                  <button
                    onClick={() => navigateTo('register')}
                    className="px-5 py-2.5 rounded bg-[#3b0924] hover:bg-[#521331] text-[#fff8ef] font-mono-tech text-[10px] uppercase tracking-wider font-bold cursor-pointer"
                  >
                    REGISTER DELEGATE PASS →
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ===================================================================
            VIEW 6: FAQs (`/faq` — Exact match to Video 01:43 - 01:44)
        =================================================================== */}
        {activeTab === 'faq' && (
          <section className="py-12 max-w-4xl mx-auto px-4 sm:px-8">
            <div className="mb-8 border-b border-[#eadfd4] pb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-5 h-px bg-[#a98b78]" />
                <span className="font-mono-tech text-[10px] uppercase tracking-[0.22em] text-[#a98b78] font-bold">
                  TECHNICAL GUIDELINES &amp; LOGISTICS
                </span>
              </div>
              <h1 className="font-serif-editorial text-4xl sm:text-5xl text-[#34252b] uppercase leading-tight mb-2">
                FREQUENTLY ASKED QUESTIONS &amp;
                <br />
                SPECIFICATIONS
              </h1>
              <p className="font-serif-editorial italic text-lg text-[#77666a]">
                Essential directives regarding testing bay safety, outstation lodging, team eligibility, and
                institutional citations.
              </p>
            </div>

            {/* Mandatory Lab Safety Callout Box (01:44 in video) */}
            <div className="mb-8 p-5 rounded-xl bg-[#f4e9dc]/80 border border-[#d8c2ab] flex items-start gap-3.5">
              <ShieldCheck className="size-5 text-[#3b0924] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h3 className="font-serif-editorial text-lg text-[#34252b] font-semibold">
                  Mandatory Laboratory Safety Protocol (IS 456 &amp; NABL)
                </h3>
                <p className="text-xs text-[#77666a] leading-relaxed">
                  All participants entering the Materials Testing Lab must wear closed-toe footwear. Safety goggles and
                  protective helmets are provided at Registration Desk C.
                </p>
              </div>
            </div>

            {/* Expandable SPEC_01 to SPEC_05 Accordions */}
            <div className="divide-y divide-[#eadfd4] border-t border-b border-[#eadfd4]">
              {FAQ_DATA.map((item, idx) => {
                const isOpen = openFaqIdx === idx;
                return (
                  <div key={idx} className="py-5">
                    <button
                      onClick={() => setOpenFaqIdx(isOpen ? -1 : idx)}
                      className="w-full flex items-center justify-between gap-4 text-left cursor-pointer"
                    >
                      <div className="flex items-baseline gap-4">
                        <span className="font-mono-tech text-[10px] text-[#a98b78] font-bold shrink-0">
                          {item.code}
                        </span>
                        <span className="font-serif-editorial text-xl text-[#34252b] font-semibold">
                          {item.q}
                        </span>
                      </div>
                      <ChevronDown
                        className={`size-4 text-[#77666a] transition-transform duration-200 shrink-0 ${
                          isOpen ? 'rotate-180 text-[#3b0924]' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="mt-3 pl-0 sm:pl-20 pr-4 text-xs text-[#77666a] leading-relaxed">
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Conclave Secretariat & Helpdesk Directory (01:43 in video) */}
            <div className="mt-12 p-6 sm:p-8 rounded-xl bg-[#fff8ef] border border-[#eadfd4] space-y-5">
              <div>
                <h3 className="font-serif-editorial text-2xl text-[#34252b]">
                  Conclave Secretariat &amp; Helpdesk Directory
                </h3>
                <p className="text-xs text-[#77666a]">
                  For urgent clarification on technical rulebooks or institutional invoice requests, reach out to our
                  coordinators:
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                {[
                  {
                    role: 'TECHNICAL CONVENOR',
                    email: 'convenor.cf26@rvce.edu.in',
                    ext: 'Ext: 412 (Heavy Structures Lab)'
                  },
                  {
                    role: 'REGISTRATION & LODGING',
                    email: 'hospitality.cf26@rvce.edu.in',
                    ext: 'Student Desk: +91 80 6717 8021'
                  },
                  {
                    role: 'SPONSORSHIP & INDUSTRY',
                    email: 'partners.cf26@rvce.edu.in',
                    ext: 'ICI Chapter Office, Civil Block'
                  }
                ].map((c) => (
                  <div key={c.role} className="space-y-1">
                    <span className="font-mono-tech text-[9px] uppercase tracking-widest text-[#a98b78] font-bold block">
                      {c.role}
                    </span>
                    <div className="font-mono-tech text-xs font-bold text-[#34252b]">{c.email}</div>
                    <div className="font-mono-tech text-[10px] text-[#77666a]">{c.ext}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ===================================================================
            VIEW 7: REGISTER NOW (`/register` — Exact match to Video 01:04 - 01:15)
        =================================================================== */}
        {activeTab === 'register' && (
          <section className="py-12 max-w-3xl mx-auto px-4 sm:px-8">
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-5 h-px bg-[#a98b78]" />
                <span className="font-mono-tech text-[10px] uppercase tracking-[0.22em] text-[#a98b78] font-bold">
                  REGISTRATION DESK // CONCRETE FAIR 2026
                </span>
              </div>
              <h1 className="font-serif-editorial text-4xl sm:text-5xl text-[#34252b] uppercase leading-none mb-2">
                DELEGATE &amp; CONTINGENT
                <br />
                REGISTRATION
              </h1>
              <p className="font-serif-editorial italic text-base sm:text-lg text-[#77666a]">
                Register for individual competitions, multi-member technical sprints, and accredited masterclasses.
              </p>
            </div>

            {regSuccessBanner && (
              <div className="mb-6 p-4 rounded-xl bg-[#3b0924] text-[#fff8ef] flex items-center gap-3 shadow-md">
                <CheckCircle2 className="size-5 text-[#d8c2ab]" />
                <span className="text-xs sm:text-sm font-bold">
                  Registration confirmed! Issuing your Digital Conclave Pass...
                </span>
              </div>
            )}

            <form
              onSubmit={handleRegisterSubmit}
              className="bg-[#fff8ef] border border-[#eadfd4] rounded-xl p-6 sm:p-8 shadow-xs space-y-8"
            >
              {/* STEP 01 // SELECT DELEGATE CATEGORY */}
              <div>
                <label className="block font-mono-tech text-[10px] uppercase tracking-widest text-[#a98b78] font-bold mb-3">
                  01 // SELECT DELEGATE CATEGORY
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: 'Team', sub: '2–5 Members' },
                    { id: 'Individual', sub: 'Solo Event' },
                    { id: 'Faculty', sub: 'ICI / Faculty' },
                    { id: 'Delegate', sub: 'Visitor Pass' }
                  ].map((cat) => {
                    const active = regForm.categoryType === cat.id;
                    return (
                      <button
                        type="button"
                        key={cat.id}
                        onClick={() => setRegForm({ ...regForm, categoryType: cat.id })}
                        className={`p-3.5 rounded-lg border text-left transition-all cursor-pointer ${
                          active
                            ? 'bg-[#f4e9dc] border-[#3b0924] text-[#3b0924]'
                            : 'bg-white border-[#eadfd4] text-[#34252b] hover:border-[#a98b78]'
                        }`}
                      >
                        <div className="font-serif-editorial font-bold text-base">{cat.id}</div>
                        <div className="font-mono-tech text-[9px] text-[#77666a] mt-0.5">{cat.sub}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* STEP 02 // SELECT COMPETITION OR SYMPOSIUM */}
              <div>
                <label className="block font-mono-tech text-[10px] uppercase tracking-widest text-[#a98b78] font-bold mb-3">
                  02 // SELECT COMPETITION OR SYMPOSIUM
                </label>
                <select
                  value={regForm.competitionId}
                  onChange={(e) => setRegForm({ ...regForm, competitionId: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white border border-[#34252b] font-mono-tech text-xs font-bold text-[#34252b] outline-none cursor-pointer"
                >
                  {EVENTS_DATA.map((ev) => (
                    <option key={ev.id} value={ev.id}>
                      [{ev.code}] {ev.title} — {ev.entryFee} ({ev.day})
                    </option>
                  ))}
                </select>

                <div className="mt-2.5 px-4 py-2.5 rounded-lg bg-[#f4e9dc]/70 border border-[#eadfd4] flex items-center justify-between font-mono-tech text-[10px] text-[#77666a]">
                  <span>Venue: {selectedCompObj.venue}</span>
                  <span>Time: {selectedCompObj.time}</span>
                </div>
              </div>

              {/* STEP 03 // PRIMARY DELEGATE CREDENTIALS */}
              <div>
                <label className="block font-mono-tech text-[10px] uppercase tracking-widest text-[#a98b78] font-bold mb-3">
                  03 // PRIMARY DELEGATE CREDENTIALS
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <span className="font-mono-tech text-[9px] text-[#77666a] block mb-1">
                      Full Legal Name *
                    </span>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Aditi Kulkarni"
                      value={regForm.fullName}
                      onChange={(e) => setRegForm({ ...regForm, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#eadfd4] focus:border-[#3b0924] text-xs text-[#34252b] outline-none"
                    />
                  </div>
                  <div>
                    <span className="font-mono-tech text-[9px] text-[#77666a] block mb-1">
                      Institutional Email *
                    </span>
                    <input
                      type="email"
                      required
                      placeholder="e.g. name@rvce.edu.in"
                      value={regForm.email}
                      onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#eadfd4] focus:border-[#3b0924] text-xs text-[#34252b] outline-none"
                    />
                  </div>
                  <div>
                    <span className="font-mono-tech text-[9px] text-[#77666a] block mb-1">
                      College / University Name *
                    </span>
                    <input
                      type="text"
                      required
                      placeholder="e.g. RV College of Engineering"
                      value={regForm.college}
                      onChange={(e) => setRegForm({ ...regForm, college: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#eadfd4] focus:border-[#3b0924] text-xs text-[#34252b] outline-none"
                    />
                  </div>
                  <div>
                    <span className="font-mono-tech text-[9px] text-[#77666a] block mb-1">
                      Student USN / Faculty Employee ID *
                    </span>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 1RV23CV042"
                      value={regForm.usn}
                      onChange={(e) => setRegForm({ ...regForm, usn: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#eadfd4] focus:border-[#3b0924] text-xs text-[#34252b] outline-none"
                    />
                  </div>

                  {regForm.categoryType === 'Team' && (
                    <>
                      <div>
                        <span className="font-mono-tech text-[9px] text-[#77666a] block mb-1">
                          Team Name
                        </span>
                        <input
                          type="text"
                          placeholder="e.g. Concrete Titans"
                          value={regForm.teamName}
                          onChange={(e) => setRegForm({ ...regForm, teamName: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#eadfd4] focus:border-[#3b0924] text-xs text-[#34252b] outline-none"
                        />
                      </div>
                      <div>
                        <span className="font-mono-tech text-[9px] text-[#77666a] block mb-1">
                          Other Team Members (comma separated)
                        </span>
                        <input
                          type="text"
                          placeholder="e.g. Member 2, Member 3"
                          value={regForm.otherMembers}
                          onChange={(e) => setRegForm({ ...regForm, otherMembers: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#eadfd4] focus:border-[#3b0924] text-xs text-[#34252b] outline-none"
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Calculated Entry Fee & Payment Method Tabs (01:10 in video) */}
              <div className="pt-4 border-t border-[#eadfd4] space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono-tech text-xs text-[#77666a]">Calculated Entry Fee:</span>
                  <span className="font-serif-editorial font-bold text-2xl text-[#34252b]">
                    {selectedCompObj.entryFee}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2.5">
                  {['UPI / QR Instant', 'Debit / Credit Card', 'Institutional Waiver'].map((pm) => (
                    <button
                      type="button"
                      key={pm}
                      onClick={() => setRegForm({ ...regForm, paymentMethod: pm })}
                      className={`py-2 px-3 rounded border font-mono-tech text-[10px] cursor-pointer transition-all ${
                        regForm.paymentMethod === pm
                          ? 'bg-[#f4e9dc] border-[#3b0924] text-[#3b0924] font-bold'
                          : 'bg-white border-[#eadfd4] text-[#77666a]'
                      }`}
                    >
                      {pm}
                    </button>
                  ))}
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded bg-[#3b0924] hover:bg-[#521331] text-[#fff8ef] font-mono-tech text-[11px] uppercase tracking-widest font-bold cursor-pointer transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <ShieldCheck className="size-4 text-[#d8c2ab]" />
                  <span>COMPLETE REGISTRATION &amp; ISSUE DIGITAL PASS</span>
                </button>
              </div>
            </form>
          </section>
        )}

        {/* ===================================================================
            VIEW 8: MY PASS PORTAL (`/portal` — Exact match to Video 01:16 - 01:22)
        =================================================================== */}
        {activeTab === 'portal' && (
          <section className="py-10 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10">
            {/* Top Status Strip */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-6 border-b border-[#eadfd4] font-mono-tech text-[10px] text-[#77666a]">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-emerald-600" />
                <span className="uppercase tracking-widest font-bold text-[#34252b]">
                  CONCRETE FAIR 2026 · DELEGATE PORTAL // 30 NOV — 01 DEC 2026
                </span>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigateTo('home')}
                  className="hover:text-[#3b0924] cursor-pointer"
                >
                  ← PUBLIC WEBSITE
                </button>
                <button
                  onClick={() => navigateTo('register')}
                  className="hover:text-[#3b0924] cursor-pointer"
                >
                  + NEW REGISTRATION
                </button>
              </div>
            </div>

            {/* Participant Header Card (Aditi Kulkarni — 01:16 in video) */}
            <div className="bg-[#fff8ef] border border-[#eadfd4] rounded-xl p-6 mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="size-12 rounded-lg bg-[#f4e9dc] border border-[#d8c2ab] grid place-items-center font-serif-editorial text-xl font-bold text-[#3b0924]">
                  AK
                </div>
                <div>
                  <span className="font-mono-tech text-[9px] uppercase tracking-widest text-[#a98b78] block">
                    PRIMARY DELEGATE · USN: {generatedPasses[0]?.usn || '1RV23CV042'}
                  </span>
                  <h1 className="font-serif-editorial text-2xl sm:text-3xl text-[#34252b] font-semibold">
                    Concrete Fair 2026 — Participant Dashboard
                  </h1>
                  <p className="text-xs text-[#77666a]">
                    {generatedPasses[0]?.holderName || 'Aditi Kulkarni'} ·{' '}
                    {generatedPasses[0]?.college || 'R.V. College of Engineering, Bengaluru'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="px-4 py-2 rounded-lg bg-[#f4e9dc]/70 border border-[#d8c2ab] text-right">
                  <span className="font-mono-tech text-[9px] text-[#77666a] block">
                    PASS ID: {generatedPasses[0]?.passId || 'CF26-RVCE-0429'}
                  </span>
                  <span className="font-mono-tech text-[9px] font-bold text-emerald-700 uppercase">
                    ● VERIFIED &amp; CHECKED IN
                  </span>
                </div>
              </div>
            </div>

            {/* 5 Sub-Navigation Tabs (01:16 - 01:22 in video) */}
            <div className="flex flex-wrap items-center gap-2 border-b border-[#eadfd4] pb-3 mb-8">
              {[
                { id: 'registrations', label: 'MY REGISTRATIONS (4)' },
                { id: 'ticket', label: 'DIGITAL TICKET / QR' },
                { id: 'schedule', label: 'MY EVENT SCHEDULE' },
                { id: 'payments', label: 'PAYMENTS & RECEIPTS' },
                { id: 'announcements', label: 'ANNOUNCEMENTS (4)' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setPortalSubTab(tab.id)}
                  className={`px-4 py-2 rounded font-mono-tech text-[10px] uppercase tracking-wider font-bold cursor-pointer transition-all border ${
                    portalSubTab === tab.id
                      ? 'bg-[#3b0924] text-[#fff8ef] border-[#3b0924]'
                      : 'bg-[#fff8ef] text-[#77666a] border-[#eadfd4] hover:border-[#a98b78]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* SUB-TAB 1: MY REGISTRATIONS (4) */}
            {portalSubTab === 'registrations' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <span className="font-mono-tech text-[9px] uppercase tracking-widest text-[#a98b78] block">
                      ACTIVE CONCLAVE DOCKET
                    </span>
                    <h2 className="font-serif-editorial text-3xl text-[#34252b]">
                      My Registered Conclave Events (4)
                    </h2>
                  </div>
                  <button
                    onClick={() => navigateTo('register')}
                    className="px-4 py-2 rounded bg-[#3b0924] text-[#fff8ef] font-mono-tech text-[10px] uppercase tracking-wider font-bold cursor-pointer"
                  >
                    + REGISTER ANOTHER EVENT
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      code: 'CF26-EVT-01',
                      status: 'CONFIRMED',
                      title: 'CONmix: Mix Design Challenge',
                      session: 'Day 01 // 30 Nov · 09:30 – 13:30',
                      venue: 'Concrete & Materials Testing Lab',
                      team: 'Concrete Titans (3 Members)',
                      ppe: 'Closed-toe footwear & safety goggles required',
                      fee: '₹ 450'
                    },
                    {
                      code: 'CF26-WKS-02',
                      status: 'CONFIRMED',
                      title: 'CONarch: Arch Design & Build',
                      session: 'Day 01 // 30 Nov · 11:00 – 15:00',
                      venue: 'Structural Fabrication Yard',
                      team: 'Concrete Titans (3 Members)',
                      ppe: 'Hard hat & gloves issued at Yard Gate',
                      fee: '₹ 300'
                    },
                    {
                      code: 'CF26-KEY-01',
                      status: 'CONFIRMED',
                      title: 'Ancient Foundations — Heritage Structures Keynote',
                      session: 'Day 01 // 30 Nov · 09:00 – 10:15',
                      venue: 'RVCE Civil Auditorium',
                      team: 'Individual Delegate Seat',
                      ppe: 'Standard Delegate Badge required',
                      fee: 'Complimentary'
                    },
                    {
                      code: 'CF26-SYM-04',
                      status: 'CONFIRMED',
                      title: 'CONzine: Smart City Designing',
                      session: 'Day 01 // 30 Nov · 14:00 – 17:00',
                      venue: 'CAD & GIS Modeling Studio',
                      team: 'Concrete Titans (2 Members)',
                      ppe: 'Workstation ID assigned on arrival',
                      fee: '₹ 400'
                    }
                  ].map((item) => (
                    <div
                      key={item.code}
                      className="bg-[#fff8ef] border border-[#eadfd4] rounded-xl p-6 space-y-4 shadow-2xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono-tech text-[10px] px-2.5 py-0.5 rounded bg-[#f4e9dc] border border-[#d8c2ab] text-[#34252b] font-bold">
                          {item.code}
                        </span>
                        <span className="font-mono-tech text-[9px] px-2.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
                          ● {item.status}
                        </span>
                      </div>

                      <h3 className="font-serif-editorial text-2xl text-[#34252b] font-semibold">
                        {item.title}
                      </h3>

                      <div className="space-y-1.5 text-xs border-t border-b border-[#eadfd4] py-3 font-mono-tech">
                        <div className="flex justify-between">
                          <span className="text-[#77666a]">Session:</span>
                          <span className="text-[#34252b] font-semibold">{item.session}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#77666a]">Reporting:</span>
                          <span className="text-[#34252b]">{item.venue}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#77666a]">Team:</span>
                          <span className="text-[#34252b]">{item.team}</span>
                        </div>
                      </div>

                      <div className="px-3 py-1.5 rounded bg-[#f4e9dc]/60 font-mono-tech text-[10px] text-[#77666a]">
                        PPE Notice: {item.ppe}
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <span className="font-mono-tech text-xs font-bold text-[#34252b]">
                          Fee: {item.fee}
                        </span>
                        <button
                          onClick={() => setPortalSubTab('ticket')}
                          className="font-mono-tech text-[10px] font-bold text-[#3b0924] hover:underline cursor-pointer"
                        >
                          View Ticket QR →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SUB-TAB 2: DIGITAL TICKET / QR (Exact match to Video 01:17) */}
            {portalSubTab === 'ticket' && (
              <div>
                <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                  <div>
                    <span className="font-mono-tech text-[9px] uppercase tracking-widest text-[#a98b78] block">
                      SECURITY CREDENTIAL
                    </span>
                    <h2 className="font-serif-editorial text-3xl text-[#34252b]">
                      Digital Conclave Pass &amp; Entry Badge
                    </h2>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => window.print()}
                      className="px-4 py-2 rounded border border-[#eadfd4] bg-white font-mono-tech text-[10px] uppercase font-bold text-[#34252b] cursor-pointer"
                    >
                      🖨 PRINT LANYARD BADGE
                    </button>
                    <button
                      onClick={() => window.print()}
                      className="px-4 py-2 rounded bg-[#3b0924] text-[#fff8ef] font-mono-tech text-[10px] uppercase font-bold cursor-pointer"
                    >
                      ⬇ DOWNLOAD PASS (PDF)
                    </button>
                  </div>
                </div>

                {/* Centered Vertical Lanyard Badge Card (01:17 in video) */}
                <div className="max-w-sm mx-auto bg-[#fff8ef] border-2 border-[#d8c2ab] rounded-2xl p-7 text-center shadow-lg space-y-5 relative">
                  <div className="w-12 h-2 rounded-full bg-[#eadfd4] mx-auto" />
                  <div>
                    <div className="font-serif-editorial text-lg tracking-widest uppercase text-[#34252b]">
                      CONCRETE FAIR 2026
                    </div>
                    <div className="font-mono-tech text-[8px] uppercase tracking-widest text-[#a98b78]">
                      RV COLLEGE OF ENGINEERING · DEPT. OF CIVIL ENGINEERING
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#eadfd4]">
                    <span className="font-mono-tech text-[9px] uppercase tracking-widest text-[#a98b78] block">
                      DELEGATE CREDENTIAL
                    </span>
                    <h3 className="font-serif-editorial text-3xl text-[#34252b] font-semibold mt-1">
                      {generatedPasses[0]?.holderName || 'Aditi Kulkarni'}
                    </h3>
                    <p className="text-xs text-[#77666a] mt-0.5">
                      {generatedPasses[0]?.college || 'R.V. College of Engineering, Bengaluru'}
                    </p>
                    <span className="inline-block mt-2 px-3 py-1 rounded bg-[#3b0924] text-[#fff8ef] font-mono-tech text-[9px] uppercase tracking-wider font-bold">
                      UG STUDENT DELEGATE · USN: {generatedPasses[0]?.usn || '1RV23CV042'}
                    </span>
                  </div>

                  <div className="py-4 flex flex-col items-center justify-center">
                    <div className="p-4 rounded-xl bg-white border border-[#eadfd4] shadow-2xs">
                      <QrCode className="size-28 text-[#34252b]" />
                    </div>
                    <span className="font-mono-tech text-[9px] uppercase tracking-widest text-[#77666a] mt-3">
                      SCAN AT LAB BAY OR AUDITORIUM TURNSTILE
                    </span>
                  </div>

                  <div className="pt-4 border-t border-[#eadfd4] grid grid-cols-3 gap-2 font-mono-tech text-[9px] text-left">
                    <div>
                      <span className="text-[#a98b78] block">PASS ID</span>
                      <strong className="text-[#34252b]">
                        {generatedPasses[0]?.passId || 'CF26-RVCE-0429'}
                      </strong>
                    </div>
                    <div className="text-center">
                      <span className="text-[#a98b78] block">GATE</span>
                      <strong className="text-[#34252b]">GATE 01 · CIVIL</strong>
                    </div>
                    <div className="text-right">
                      <span className="text-[#a98b78] block">ACCESS LEVEL</span>
                      <strong className="text-[#34252b]">FULL CONCLAVE</strong>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SUB-TAB 3 & 4: SCHEDULE OR PAYMENTS */}
            {(portalSubTab === 'schedule' || portalSubTab === 'payments') && (
              <div className="bg-[#fff8ef] border border-[#eadfd4] rounded-xl p-6 space-y-4">
                <h2 className="font-serif-editorial text-2xl text-[#34252b]">
                  {portalSubTab === 'schedule'
                    ? 'Personal Conclave Timetable & Reporting Slots'
                    : 'Verified Payment Receipts & Institutional Invoices'}
                </h2>
                <p className="text-xs text-[#77666a]">
                  All registered sessions for {generatedPasses[0]?.holderName || 'Aditi Kulkarni'} (Pass ID:{' '}
                  {generatedPasses[0]?.passId || 'CF26-RVCE-0429'}) are confirmed and synced with the Civil Block RFID
                  turnstiles.
                </p>
              </div>
            )}

            {/* SUB-TAB 5: ANNOUNCEMENTS (4) (Exact match to Video 01:20 - 01:22) */}
            {portalSubTab === 'announcements' && (
              <div className="space-y-4">
                <div className="mb-6">
                  <span className="font-mono-tech text-[9px] uppercase tracking-widest text-[#a98b78] block">
                    OFFICIAL DISPATCHES &amp; ALERTS
                  </span>
                  <h2 className="font-serif-editorial text-3xl text-[#34252b]">
                    Conclave Announcements &amp; Safety Bulletins
                  </h2>
                </div>

                {[
                  {
                    tag: 'URGENT',
                    to: 'TO: CONMIX PARTICIPANTS',
                    date: '30 Nov · 07:30',
                    title: 'CONmix Cube Mould & Admixture Calibration Protocol',
                    desc: 'All registered CONmix teams must report to Concrete Testing Lab Bay A at 09:00 AM sharp for cement batch weight verification and slump cone calibration.',
                    author: 'Prof. Radhakrishna (Lab Convenor)'
                  },
                  {
                    tag: 'NOTICE',
                    to: 'TO: ALL DELEGATES',
                    date: '30 Nov · 08:00',
                    title: 'Safety Footwear & Goggles Mandatory at Bay A',
                    desc: 'Closed-toe boots and polycarbonate eye protection are strictly enforced in Heavy Testing Bay A and Structural Fabrication Yard. Equipment is available at the Safety Counter.',
                    author: 'Safety Committee'
                  },
                  {
                    tag: 'SCHEDULE',
                    to: 'TO: ALL DELEGATES',
                    date: '30 Nov · 08:30',
                    title: 'Keynote Seating Protocol: Main Auditorium',
                    desc: 'Doors open at 08:30 AM for the Inaugural Address. Digital QR badge required for express turnstile entry.',
                    author: 'Organizing Secretariat'
                  },
                  {
                    tag: 'BULLETIN',
                    to: 'TO: VOLUNTEERS',
                    date: '30 Nov · 07:45',
                    title: 'Day 01 Volunteer Briefing at 07:45 AM',
                    desc: 'All student volunteers must assemble at the Civil Department Foyer for UTM sensor calibration checks and delegate registration desk assignments.',
                    author: 'Student Coordinator Desk'
                  }
                ].map((ann, i) => (
                  <div
                    key={i}
                    className="bg-[#fff8ef] border border-[#eadfd4] rounded-xl p-6 space-y-2"
                  >
                    <div className="flex items-center justify-between font-mono-tech text-[10px]">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-[#f4e9dc] text-[#3b0924] font-bold">
                          {ann.tag}
                        </span>
                        <span className="text-[#a98b78]">{ann.to}</span>
                      </div>
                      <span className="text-[#77666a]">{ann.date}</span>
                    </div>
                    <h3 className="font-serif-editorial text-2xl text-[#34252b] font-semibold">
                      {ann.title}
                    </h3>
                    <p className="text-xs text-[#77666a] leading-relaxed">{ann.desc}</p>
                    <div className="font-mono-tech text-[10px] text-[#a98b78] pt-1">
                      Dispatched by: <strong className="text-[#34252b]">{ann.author}</strong>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </main>

      {/* =====================================================================
          EVENT RULEBOOK & DETAILS MODAL
      ===================================================================== */}
      {selectedEventModal && (
        <div className="fixed inset-0 z-50 bg-[#1d0411]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#fff8ef] border border-[#d8c2ab] rounded-3xl max-w-2xl w-full max-h-[88vh] overflow-y-auto p-6 sm:p-8 shadow-2xl">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#eadfd4]">
              <div>
                <span className="font-mono-tech text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#3b0924] text-[#fff8ef]">
                  {selectedEventModal.code} · {selectedEventModal.category}
                </span>
                <h2 className="font-black text-2xl text-[#3b0924] mt-2">{selectedEventModal.title}</h2>
                <p className="font-serif-editorial italic text-base text-[#75435c]">{selectedEventModal.subtitle}</p>
              </div>
              <button
                onClick={() => setSelectedEventModal(null)}
                className="p-2 rounded-full bg-[#f4e9dc] text-[#3b0924] hover:bg-[#eadfd4] cursor-pointer"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="py-5 space-y-5 text-xs sm:text-sm">
              <p className="text-[#34252b] leading-relaxed">{selectedEventModal.shortDesc}</p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#f4e9dc] p-4 rounded-2xl border border-[#d8c2ab]">
                <div>
                  <span className="font-mono-tech text-[9px] text-[#77666a] block">1ST PRIZE</span>
                  <span className="font-black text-base text-[#3b0924]">{selectedEventModal.firstPrize}</span>
                </div>
                <div>
                  <span className="font-mono-tech text-[9px] text-[#77666a] block">2ND PRIZE</span>
                  <span className="font-black text-base text-[#3b0924]">{selectedEventModal.secondPrize}</span>
                </div>
                <div>
                  <span className="font-mono-tech text-[9px] text-[#77666a] block">ENTRY FEE</span>
                  <span className="font-bold text-[#34252b]">{selectedEventModal.entryFee}</span>
                </div>
                <div>
                  <span className="font-mono-tech text-[9px] text-[#77666a] block">TEAM SIZE</span>
                  <span className="font-bold text-[#34252b]">{selectedEventModal.teamSize}</span>
                </div>
              </div>

              <div>
                <h4 className="font-mono-tech text-[10px] uppercase tracking-wider text-[#3b0924] font-bold mb-2">
                  // OFFICIAL COMPETITION RULES &amp; SPECIFICATIONS
                </h4>
                <ul className="space-y-2">
                  {selectedEventModal.rules.map((r, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-[#34252b]">
                      <span className="font-mono-tech font-bold text-[#3b0924]">0{i + 1}.</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#eadfd4] flex flex-wrap items-center justify-between gap-2 text-xs">
                <div>
                  <span className="font-mono-tech text-[9px] text-[#77666a] block uppercase">
                    FACULTY &amp; STUDENT COORDINATORS
                  </span>
                  <span className="font-bold text-[#3b0924]">{selectedEventModal.coordinators.join(' · ')}</span>
                </div>
                <span className="font-mono-tech text-[10px] text-[#75435c] font-bold">{selectedEventModal.venue}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-[#eadfd4] flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedEventModal(null)}
                className="px-4 py-2.5 rounded-full border border-[#eadfd4] text-xs font-bold text-[#77666a] cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const id = selectedEventModal.id;
                  setSelectedEventModal(null);
                  navigateTo('register', id);
                }}
                className="px-6 py-2.5 rounded-full bg-[#3b0924] hover:bg-[#521331] text-[#fff8ef] text-xs font-bold cursor-pointer flex items-center gap-1.5"
              >
                <span>Register for This Event</span>
                <ArrowUpRight className="size-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          SOURCE CODE EXPORTER MODAL (One-click copy for the user)
      ===================================================================== */}
      {codeModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#1d0411]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1d0411] text-[#fff8ef] border border-[#75435c] rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#75435c]">
              <div className="flex items-center gap-2.5">
                <Code2 className="size-5 text-[#d8c2ab]" />
                <div>
                  <h3 className="font-black text-lg text-white uppercase">
                    CONCRETE FAIR 2026 — THREE.JS + REACT SOURCE CODE
                  </h3>
                  <p className="font-mono-tech text-[10px] text-[#d8c2ab]">
                    Includes Three.js WebGL Vedic Stone Shikhara, PBR Sandstone Generator &amp; /events Catalog
                  </p>
                </div>
              </div>
              <button
                onClick={() => setCodeModalOpen(false)}
                className="p-2 rounded-full bg-[#3b0924] text-[#d8c2ab] hover:text-white cursor-pointer"
              >
                <X className="size-4" />
              </button>
            </div>

            <pre className="my-4 p-4 rounded-2xl bg-[#2a0519] border border-[#75435c] font-mono-tech text-[11px] text-[#d8c2ab] overflow-x-auto max-h-[55vh] leading-relaxed">
{`/* Concrete Fair 2026 | RVCE Civil Engineering Design Tokens & Three.js Setup */
import * as THREE from 'three';

:root {
  --bg-cream: #fff8ef;
  --bg-elevated: #f4e9dc;
  --border-sand: #eadfd4;
  --accent-tan: #d8c2ab;
  --text-bronze: #a98b78;
  --text-muted: #77666a;
  --text-primary: #34252b;
  --brand-burgundy: #3b0924;
  --brand-burgundy-hover: #521331;
  --brand-burgundy-border: #75435c;
  --hero-wine-dark: #1d0411;
}

/* Full runnable React + Three.js source is available in App.jsx in the code editor! */`}
            </pre>

            <div className="flex items-center justify-between">
              <span className="text-xs text-[#d8c2ab]">
                Tip: Copy the full `App.jsx` code directly from the right-hand editor panel.
              </span>
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(document.documentElement.outerHTML);
                  setCopiedCode(true);
                  setTimeout(() => setCopiedCode(false), 2000);
                }}
                className="px-5 py-2.5 rounded-full bg-[#d8c2ab] text-[#1d0411] font-bold text-xs flex items-center gap-1.5 cursor-pointer"
              >
                {copiedCode ? <Check className="size-4" /> : <Copy className="size-4" />}
                <span>{copiedCode ? 'Copied DOM Snapshot!' : 'Copy Rendered HTML'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          SIGNATURE FOOTER WITH FLOATING "LET'S BUILD WHAT'S NEXT." CARD
          (Exact match to Video 00:54 - 01:03 & 01:28)
      ===================================================================== */}
      <footer className="bg-[#240515] text-[#fff8ef] border-t border-[#75435c]/40 pt-14 pb-10 mt-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-10 space-y-12">
          {/* Floating Cream CTA Card ("LET'S BUILD WHAT'S NEXT.") */}
          <div className="bg-[#fff8ef] text-[#34252b] rounded-3xl p-8 sm:p-10 shadow-2xl border border-[#eadfd4] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <span className="font-mono-tech text-[10px] uppercase tracking-[0.22em] text-[#a98b78] font-bold block">
                GET IN TOUCH · RSVP
              </span>
              <h2 className="font-black text-3xl sm:text-4xl text-[#3b0924] tracking-tight uppercase leading-none">
                LET&apos;S BUILD WHAT&apos;S NEXT.
              </h2>
              <p className="text-xs sm:text-sm text-[#77666a] leading-relaxed">
                Partner with Concrete Fair 2026 and help shape the next generation of civil engineering talent.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href="mailto:ici@rvce.edu.in"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#3b0924] hover:bg-[#521331] text-[#fff8ef] text-xs font-bold tracking-wide transition-all"
              >
                <span>Partner With Us</span>
                <ArrowUpRight className="size-3.5" />
              </a>
              <button
                onClick={() => navigateTo('register')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#f4e9dc] hover:bg-[#eadfd4] text-[#3b0924] border border-[#d8c2ab] text-xs font-bold tracking-wide transition-all cursor-pointer"
              >
                <span>Register for Events</span>
              </button>
            </div>
          </div>

          {/* 4-Column Institutional Footer Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-4 border-t border-white/10 text-xs">
            <div className="space-y-2">
              <span className="font-mono-tech text-[9px] uppercase tracking-widest text-[#d8c2ab] block">
                CONTACT
              </span>
              <div className="font-bold text-sm text-white">ici@rvce.edu.in</div>
              <div className="font-mono-tech text-[11px] text-[#eadfd4]/75 space-y-0.5">
                <div>Pranav: +91 63628 73049</div>
                <div>Shashank: +91 94838 97048</div>
              </div>
            </div>

            <div className="space-y-2">
              <span className="font-mono-tech text-[9px] uppercase tracking-widest text-[#d8c2ab] block">
                INSTAGRAM
              </span>
              <div className="font-bold text-sm text-white">@icirvce</div>
              <p className="text-[11px] text-[#eadfd4]/75 leading-relaxed">
                Follow for announcements, rulebooks, behind-the-scenes, and schedule updates.
              </p>
            </div>

            <div className="space-y-2">
              <span className="font-mono-tech text-[9px] uppercase tracking-widest text-[#d8c2ab] block">
                ORGANIZED BY
              </span>
              <div className="font-bold text-sm text-white">
                Department of Civil Engineering
                <br />
                RV College of Engineering
              </div>
              <p className="text-[11px] text-[#eadfd4]/75">
                Mysore Road, Bengaluru, Karnataka 560059
              </p>
            </div>

            <div className="space-y-2">
              <span className="font-mono-tech text-[9px] uppercase tracking-widest text-[#d8c2ab] block">
                CONCLAVE DATES
              </span>
              <div className="font-bold text-sm text-white">30 NOV &amp; 01 DEC 2026</div>
              <p className="font-serif-editorial italic text-sm text-[#d8c2ab]">
                “Where Concrete Meets Creativity”
              </p>
              <div className="font-mono-tech text-[10px] text-[#eadfd4]/70">
                13TH EDITION · 800+ PARTICIPANTS
              </div>
            </div>
          </div>

          {/* Bottom Copyright & Quick Links Bar */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono-tech text-[10px] text-[#eadfd4]/60">
            <div>CONCRETE FAIR 2026 · WHERE CONCRETE MEETS CREATIVITY</div>
            <div className="flex flex-wrap items-center gap-5">
              <button onClick={() => navigateTo('home')} className="hover:text-white cursor-pointer">
                Home
              </button>
              <button onClick={() => navigateTo('events')} className="hover:text-white cursor-pointer">
                Events
              </button>
              <button onClick={() => navigateTo('schedule')} className="hover:text-white cursor-pointer">
                Schedule
              </button>
              <button onClick={() => navigateTo('register')} className="hover:text-white cursor-pointer">
                Register
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}