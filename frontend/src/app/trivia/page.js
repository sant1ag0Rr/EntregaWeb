import TriviaGame from '@/components/TriviaGame';

export const metadata = {
  title: 'Trivia - Football & Culture',
  description: 'Pon a prueba tus conocimientos sobre fútbol y geografía.',
};

export default function TriviaPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Minijuego de Trivia
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Adivina el país por el equipo de fútbol o por su bandera. ¡Demuestra cuánto sabes!
          </p>
        </div>
        
        <TriviaGame />
      </div>
    </main>
  );
}
