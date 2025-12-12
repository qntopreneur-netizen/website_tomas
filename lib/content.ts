export interface Benefit {
  title: string;
  description: string;
  icon: string;
}

export interface TeamMember {
  firstName: string;
  role: string;
  level: number; // 1 = Owner, 2 = Managers, 3 = Team Captains, 4 = Poule Captains
  image?: string;
}

export interface TeamLevel {
  level: number;
  title: string;
  members: TeamMember[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

// Content gebaseerd op high-endmarketing.nl / The Sales Agency
export const benefits: Benefit[] = [
  {
    title: "Lucratieve Bonussen",
    description: "Verdien extra met onze uitgebreide bonusstructuur. Hoe meer je verkoopt, hoe meer je verdient. Onbeperkte groeimogelijkheden.",
    icon: "Gift",
  },
  {
    title: "Intensieve Training",
    description: "Professionele sales training van ervaren professionals. Leer de beste technieken en ontwikkel jezelf tot topverkoper.",
    icon: "GraduationCap",
  },
  {
    title: "Persoonlijke Begeleiding",
    description: "Altijd ondersteuning van ervaren coaches. We helpen je groeien en zorgen dat je je doelen behaalt.",
    icon: "Users",
  },
  {
    title: "Carrière Groei",
    description: "Ontwikkel jezelf en groei binnen het bedrijf. Van junior naar senior, de mogelijkheden zijn eindeloos.",
    icon: "TrendingUp",
  },
];

export const teamHierarchy: TeamLevel[] = [
  {
    level: 1,
    title: "Owner & Founder",
    members: [
      {
        firstName: "Tomás",
        role: "Owner & Founder",
        level: 1,
        image: "/tomas.jpg",
      },
    ],
  },
  {
    level: 2,
    title: "Managers",
    members: [
      {
        firstName: "Rachid",
        role: "Manager",
        level: 2,
        image: "/rachid.jpg",
      },
      {
        firstName: "Arvid",
        role: "Manager",
        level: 2,
        image: "/arvid.jpg",
      },
    ],
  },
  {
    level: 3,
    title: "Team Captains",
    members: [
      {
        firstName: "Noah",
        role: "Team Captain",
        level: 3,
      },
    ],
  },
  {
    level: 4,
    title: "Poule Captains",
    members: [
      {
        firstName: "Dylaro",
        role: "Poule Captain",
        level: 4,
      },
      {
        firstName: "Joris",
        role: "Poule Captain",
        level: 4,
      },
      {
        firstName: "Ibi",
        role: "Poule Captain",
        level: 4,
      },
    ],
  },
];

// Legacy export voor backward compatibility (alleen voor homepage)
export const teamMembers = teamHierarchy
  .flatMap((level) => level.members)
  .filter((member) => member.level <= 2); // Alleen Owner en Managers voor homepage

export const faqItems: FAQItem[] = [
  {
    question: "Wat zijn de vereisten om te solliciteren bij The Sales Agency?",
    answer: "We zoeken ambitieuze, gemotiveerde mensen met een passie voor sales en resultaat. Leeftijd minimaal 16 jaar.  Ervaring is niet vereist - we trainen je vanaf de basis. Belangrijk is dat je gedreven bent, sociaal bent en graag wilt groeien in je carrière.",
  },
  {
    question: "Wat biedt The Sales Agency precies?",
    answer: "The Sales Agency biedt een complete sales training, lucratieve bonussen, flexibele werktijden en onbeperkte groeimogelijkheden. We investeren in jouw ontwikkeling en zorgen dat je alle tools krijgt om succesvol te zijn in sales.",
  },
  {
    question: "Hoe werkt het sollicitatieproces?",
    answer: "Solliciteren kun je simpel doen door op de 'SOLLICITEER NU' knop te klikken, vul je gegevens in en wij zullen zo snel mogelijk contact met je opnemen om een sollicitatiegesprek in te plannen.",
  },
  {
    question: "Is ervaring in sales vereist?",
    answer: "Nee, ervaring is niet vereist. We trainen je vanaf de basis met onze bewezen methodes. Wat wel belangrijk is, is dat je ambitieus bent, sociaal bent en gemotiveerd om te leren en te groeien.",
  },
  {
    question: "Wat verdien ik bij The Sales Agency?",
    answer: "Bij The Sales Agency verdien je een goed basis salaris plus lucratieve bonussen. Hoe meer je verkoopt, hoe meer je verdient. De mogelijkheden zijn onbeperkt en we belonen hard werken en resultaat.",
  },
  {
    question: "Wat maakt The Sales Agency anders dan andere werkgevers?",
    answer: "Bij The Sales Agency investeren we echt in jouw ontwikkeling. Je krijgt intensieve training, persoonlijke begeleiding en alle tools om succesvol te zijn. We geloven in groei en bieden onbeperkte mogelijkheden voor ambitieuze mensen.",
  },
];

