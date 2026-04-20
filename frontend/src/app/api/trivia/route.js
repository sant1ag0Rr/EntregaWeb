import { NextResponse } from 'next/server';

const countries = [
  { name: 'Colombia', flag: 'https://flagcdn.com/w320/co.png' },
  { name: 'Argentina', flag: 'https://flagcdn.com/w320/ar.png' },
  { name: 'Brasil', flag: 'https://flagcdn.com/w320/br.png' },
  { name: 'Italia', flag: 'https://flagcdn.com/w320/it.png' },
  { name: 'Francia', flag: 'https://flagcdn.com/w320/fr.png' },
  { name: 'España', flag: 'https://flagcdn.com/w320/es.png' },
  { name: 'Inglaterra', flag: 'https://flagcdn.com/w320/gb-eng.png' },
  { name: 'Alemania', flag: 'https://flagcdn.com/w320/de.png' }
];

const teams = [
  { team: 'Atlético Nacional', country: 'Colombia' },
  { team: 'Millonarios', country: 'Colombia' },
  { team: 'Boca Juniors', country: 'Argentina' },
  { team: 'River Plate', country: 'Argentina' },
  { team: 'Flamengo', country: 'Brasil' },
  { team: 'Palmeiras', country: 'Brasil' },
  { team: 'Juventus', country: 'Italia' },
  { team: 'AC Milan', country: 'Italia' },
  { team: 'Paris Saint-Germain', country: 'Francia' },
  { team: 'Olympique de Marseille', country: 'Francia' },
  { team: 'Real Madrid', country: 'España' },
  { team: 'FC Barcelona', country: 'España' },
  { team: 'Manchester United', country: 'Inglaterra' },
  { team: 'Liverpool', country: 'Inglaterra' },
  { team: 'Bayern Munich', country: 'Alemania' },
  { team: 'Borussia Dortmund', country: 'Alemania' }
];

function getRandomOptions(correctAnswer, allOptions) {
  const options = new Set([correctAnswer]);
  while (options.size < 4) {
    const randomOption = allOptions[Math.floor(Math.random() * allOptions.length)];
    options.add(randomOption);
  }
  return Array.from(options).sort(() => Math.random() - 0.5);
}

export async function GET() {
  const allCountryNames = countries.map(c => c.name);
  const questions = [];

  // Generate 5 football questions
  const shuffledTeams = [...teams].sort(() => Math.random() - 0.5).slice(0, 5);
  shuffledTeams.forEach((t, index) => {
    questions.push({
      id: `futbol-${index}`,
      type: 'futbol',
      question: '¿De qué país es este equipo?',
      text: t.team,
      options: getRandomOptions(t.country, allCountryNames),
      answer: t.country
    });
  });

  // Generate 5 geography questions
  const shuffledCountries = [...countries].sort(() => Math.random() - 0.5).slice(0, 5);
  shuffledCountries.forEach((c, index) => {
    questions.push({
      id: `geografia-${index}`,
      type: 'geografia',
      question: '¿A qué país pertenece esta bandera?',
      image: c.flag,
      options: getRandomOptions(c.name, allCountryNames),
      answer: c.name
    });
  });

  // Shuffle all questions
  const finalQuestions = questions.sort(() => Math.random() - 0.5);

  return NextResponse.json({ questions: finalQuestions });
}
