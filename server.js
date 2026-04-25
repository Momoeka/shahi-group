const path = require('path');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: process.env.NODE_ENV === 'production' ? '7d' : 0,
}));
app.use('/images', express.static(path.join(__dirname, 'images'), {
  maxAge: process.env.NODE_ENV === 'production' ? '30d' : 0,
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const siteData = {
  brand: {
    name: 'Shahi Group',
    tagline: 'Inching Closer Towards Perfection',
    founded: 2021,
    address: 'B-23, Second Floor, Sector-C, Indrapuri, Bhopal 462022, MP, India',
    phones: ['+91 70005 10947', '+91 96086 33273'],
    email: 'info@shahisurvey.in',
    website: 'shahisurvey.com',
    socials: {
      facebook: 'https://facebook.com/shahiacademy',
      instagram: 'https://instagram.com/shahi_survey_academy',
      youtube: 'https://youtube.com/@shahisurveyacademy',
    },
    regions: ['Madhya Pradesh', 'Rajasthan', 'Karnataka'],
  },
  divisions: [
    {
      num: '01',
      slug: 'enterprises',
      name: 'Shahi Enterprises',
      role: 'Hardware & Dealership',
      brand: 'Authorised Leica partner',
      tagline: 'The instruments that build the country.',
      copy: 'Wholesale trader and service provider for the surveying sector. From total stations and DGPS to 3D scanners and hydrographic gear — the same Leica equipment our field crews carry every day.',
      capabilities: [
        'Total Station & Robotic Total Station',
        'DGPS — centimeter-level GNSS positioning',
        'Automatic & Digital Level instruments',
        'Cable Locator — underground utility detection',
        'Laser Distance Meter',
        '3D Scanner — point-cloud capture',
        'Marine & Hydrographic equipment',
      ],
      image: '/images/div-enterprises.png',
    },
    {
      num: '02',
      slug: 'construction',
      name: 'Shahi Construction',
      role: 'Field Operations',
      brand: 'Surveying + Civil Works',
      tagline: 'Boots in the dirt. Numbers on the page.',
      copy: 'Field operations arm — surveying and civil works on real infrastructure. Solar farms, dams, state highways, and government projects across MP, Rajasthan, and Karnataka. Equipment rental and turnkey delivery.',
      capabilities: [
        'Land & Topographic surveying',
        'Engineering & Construction surveying',
        'Solar pile alignment & ramming',
        'DPR (Detailed Project Report) preparation',
        'Soil investigation & traffic surveys',
        'Structural & architectural design',
        'Equipment rental',
      ],
      image: '/images/div-construction.png',
    },
    {
      num: '03',
      slug: 'academy',
      name: 'Shahi Survey Academy',
      role: 'Training & Certification',
      brand: 'Hands-on Leica gear',
      tagline: 'The same instruments. The same expertise.',
      copy: 'Training arm. Hands-on instruction on the real Leica equipment used by our Construction division. Courses for fresh graduates, working professionals, and government officers — including W.R.D., WALMI, and Oriental Group cohorts.',
      capabilities: [
        'Total Station — ₹25,000 · 1 week',
        'DGPS — ₹30,000 · 1 week',
        'Auto Level, Digital Level, Drone',
        'AutoCAD · QGIS · STAAD Pro',
        'MS Road · Water Gems',
        'Topography, contour, layout, area & volume',
        'Government & enterprise cohorts',
      ],
      image: '/images/div-academy.png',
    },
  ],
  projects: [
    {
      tag: 'Renewables',
      title: '300 MW Solar Ramming',
      location: 'Bikaner, Rajasthan',
      metric: '1,50,000 piles · 200 acres · 6 months',
      copy: 'Pile alignment, ramming, and survey for one of the largest single-site utility-scale solar engagements in the region.',
      image: '/images/project-bikaner-solar.png',
    },
    {
      tag: 'Hydrography',
      title: 'Dam & Reservoir Survey',
      location: 'Madhya Pradesh',
      metric: '10,000 hectares · 3 months',
      copy: 'Catchment-area survey using Leica DGPS and Total Station. Deliverables: contour map, river cross-section, longitudinal section.',
      image: '/images/project-dam.jpeg',
    },
    {
      tag: 'Infrastructure',
      title: '110 KM Road Corridor',
      location: 'State Highway',
      metric: 'Topography + centerline marking',
      copy: 'Linear-corridor survey with DGPS and Total Station for alignment; Auto-Level and Digital Level for original ground level capture.',
      image: '/images/project-road.jpeg',
    },
    {
      tag: 'Ongoing',
      title: 'Karnataka State Highway',
      location: 'Karnataka',
      metric: 'DGPS topographic surveys',
      copy: 'Active state highway improvement project. Centimeter-level precision with real-time data updates across a large-scale corridor.',
      image: '/images/project-karnataka.jpeg',
    },
  ],
  stats: [
    { value: 300, suffix: ' MW', label: 'Solar Capacity Surveyed' },
    { value: 150000, suffix: '', label: 'Piles Installed (6 months)' },
    { value: 10000, suffix: ' ha', label: 'Dam Catchment Surveyed' },
    { value: 110, suffix: ' KM', label: 'Road Corridor Mapped' },
    { value: 15, suffix: '+', label: 'Enterprise & Govt Clients' },
    { value: 3, suffix: '', label: 'Active Divisions' },
  ],
  testimonials: [
    {
      name: 'Hariom Saran',
      role: 'Founder, Satyakabir',
      initials: 'HS',
      quote: 'Meticulous and accurate. Their land-survey team delivered a comprehensive evaluation that we trusted from day one.',
    },
    {
      name: 'Sandeep Patel',
      role: 'Project Manager',
      initials: 'SP',
      quote: 'The course material was carefully designed. Instructors showed real knowledge and patience throughout the program.',
    },
    {
      name: 'Veer Mehra',
      role: 'Project Manager',
      initials: 'VM',
      quote: 'The DGPS training delivered the knowledge and abilities we needed for real-world application on live sites.',
    },
  ],
  clients: [
    { name: 'TATA Power Solar', logo: '/images/tata logo.png' },
    { name: 'Adani Power',       logo: '/images/adani logo.png' },
    { name: 'Siemens Gamesa',    logo: '/images/seimens logo.png' },
    { name: 'L&T',               logo: '/images/lnt logo.png' },
    { name: 'NCC',               logo: '/images/ncc logo.png' },
    { name: 'MPRDC',             logo: '/images/mprdc logo.jpg' },
    { name: 'SAGE University',   logo: '/images/sage logo.png' },
  ],
};

app.get('/', (req, res) => {
  res.render('index', { site: siteData });
});

app.post('/contact', (req, res) => {
  // Hook up to email / CRM later. For now: log + acknowledge.
  console.log('[contact]', new Date().toISOString(), req.body);
  res.json({ ok: true, message: 'Thanks — we will be in touch shortly.' });
});

app.use((req, res) => {
  res.status(404).send('Not found');
});

app.listen(PORT, () => {
  console.log(`Shahi Group site running on http://localhost:${PORT}`);
});
