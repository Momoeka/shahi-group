export const siteConfig = {
  name: "Shahi Group",
  tagline: "Inching Closer Towards Perfection",
  founded: 2021,
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://shahisurvey.com",
  email: "info@shahisurvey.in",
  phones: ["+917000510947", "+919608633273"],
  phonesDisplay: ["+91 70005 10947", "+91 96086 33273"],
  address: "B-23, Second Floor, Sector-C, Indrapuri, Bhopal 462022, MP, India",
  addressShort: "Indrapuri, Bhopal",
  regions: ["Madhya Pradesh", "Rajasthan", "Karnataka"],
  socials: {
    facebook: "https://facebook.com/shahiacademy",
    instagram: "https://instagram.com/shahi_survey_academy",
    youtube: "https://youtube.com/@shahisurveyacademy",
  },
} as const;
