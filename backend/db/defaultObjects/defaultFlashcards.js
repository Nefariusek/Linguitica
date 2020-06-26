const defaultFlashcards = [
  {
    polish: 'fiszka',
    german: 'die Vokabelkartei',
    polish_tips: 'ryba',
    german_tips: 'die Speicherkarte',
    category: 'ogólne',
    tags: ['słówka', 'ogólne'],
    level: 'A1',
  },
  {
    polish: 'mieć',
    german: 'haben',
    polish_tips: '',
    german_tips: '',
    category: 'ogólne',
    tags: ['słówka', 'ogólne'],
    level: 'A1',
  },
  {
    polish: 'jeść',
    german: 'essen',
    polish_tips: '',
    german_tips: '',
    category: 'ogólne',
    tags: ['słówka', 'ogólne'],
    level: 'A1',
  },
  {
    polish: 'samochód',
    german: 'das Auto',
    polish_tips: '',
    german_tips: '',
    category: 'pojazdy',
    tags: ['słówka', 'pojazdy'],
    level: 'A1',
  },
  {
    polish: 'rower',
    german: 'das Fahrrad',
    polish_tips: '',
    german_tips: '',
    category: 'pojazdy',
    tags: ['słówka', 'pojazdy'],
    level: 'A1',
  },
  {
    polish: 'dom',
    german: 'das Haus',
    polish_tips: '',
    german_tips: '',
    category: 'dom',
    tags: ['słówka', 'dom'],
    level: 'A1',
  },
  {
    polish: 'syn',
    german: 'der Sohn',
    polish_tips: '',
    german_tips: '',
    category: 'rodzina',
    tags: ['słówka', 'rodzina'],
    level: 'A1',
  },
  {
    polish: 'powiadomienie',
    german: 'der Bescheid',
    polish_tips: '',
    german_tips: '',
    category: 'technologia',
    tags: ['słówka', 'technologia'],
    level: 'B1',
  },
  {
    polish: 'miotła',
    german: 'der Besen',
    polish_tips: '',
    german_tips: '',
    category: 'dom',
    tags: ['słówka', 'dom'],
    level: 'A2',
  },
  {
    polish: 'awantura',
    german: 'der Krach',
    polish_tips: '',
    german_tips: '',
    category: 'emocje',
    tags: ['słówka', 'emocje'],
    level: 'B2',
  },
  {
    polish: 'żołnież',
    german: 'der Kragen',
    polish_tips: '',
    german_tips: '',
    category: 'zawody',
    tags: ['słówka', 'zawody'],
    level: 'B2',
  },
  {
    polish: 'lada sklepowa',
    german: 'die Theke',
    polish_tips: '',
    german_tips: '',
    category: 'praca',
    tags: ['słówka', 'praca'],
    level: 'C2',
  },
  {
    polish: 'termy',
    german: 'die Therme',
    polish_tips: '',
    german_tips: '',
    category: 'podróże',
    tags: ['słówka', 'podróże'],
    level: 'C2',
  },
  {
    polish: 'termometr',
    german: 'das Thermometer',
    polish_tips: '',
    german_tips: '',
    category: 'medycyna',
    tags: ['słówka', 'medycyna'],
    level: 'C2',
  },
  {
    polish: 'tron',
    german: 'der Thron',
    polish_tips: '',
    german_tips: '',
    category: 'dom',
    tags: ['słówka', 'dom'],
    level: 'B2',
  },
  {
    polish: 'eutanazja',
    german: 'die Euthanasie',
    polish_tips: '',
    german_tips: '',
    category: 'medycyna',
    tags: ['słówka', 'medycyna'],
    level: 'C1',
  },
  {
    polish: 'oaza',
    german: 'die Oase',
    polish_tips: '',
    german_tips: '',
    category: 'podróże',
    tags: ['słówka', 'podróże'],
    level: 'B2',
  },
  {
    polish: 'ludobójstwo',
    german: 'der Genozid',
    polish_tips: '',
    german_tips: '',
    category: 'historia',
    tags: ['słówka', 'historia'],
    level: 'C2',
  },
  {
    polish: 'pech',
    german: 'das Pech',
    polish_tips: '',
    german_tips: '',
    category: 'emocje',
    tags: ['słówka', 'emocje'],
    level: 'A2',
  },
  {
    polish: 'ból',
    german: 'die Pein',
    polish_tips: '',
    german_tips: '',
    category: 'medycyna',
    tags: ['słówka', 'medycyna'],
    level: 'C2',
  },
  {
    polish: 'osoba',
    german: 'die Person',
    polish_tips: '',
    german_tips: '',
    category: 'ogólne',
    tags: ['słówka', 'ogólne'],
    level: 'A1',
  },
  {
    polish: 'zero',
    german: 'null',
    polish_tips: '',
    german_tips: '',
    category: 'liczby',
    tags: ['słówka', 'liczby'],
    level: 'A1',
  },
  {
    polish: 'jeden',
    german: 'eins',
    polish_tips: '',
    german_tips: '',
    category: 'liczby',
    tags: ['słówka', 'liczby'],
    level: 'A1',
  },
  {
    polish: 'dwa',
    german: 'zwei',
    polish_tips: '',
    german_tips: '',
    category: 'liczby',
    tags: ['słówka', 'liczby'],
    level: 'A1',
  },
  {
    polish: 'trzy',
    german: 'drei',
    polish_tips: '',
    german_tips: '',
    category: 'liczby',
    tags: ['słówka', 'liczby'],
    level: 'A1',
  },
  {
    polish: 'cztery',
    german: 'vier',
    polish_tips: '',
    german_tips: '',
    category: 'liczby',
    tags: ['słówka', 'liczby'],
    level: 'A1',
  },
  {
    polish: 'sześć',
    german: 'sechs',
    polish_tips: '',
    german_tips: '',
    category: 'liczby',
    tags: ['słówka', 'liczby'],
    level: 'A1',
  },
  {
    polish: 'siedem',
    german: 'sieben',
    polish_tips: '',
    german_tips: '',
    category: 'liczby',
    tags: ['słówka', 'liczby'],
    level: 'A1',
  },
  {
    polish: 'osiem',
    german: 'acht',
    polish_tips: '',
    german_tips: '',
    category: 'liczby',
    tags: ['słówka', 'liczby'],
    level: 'A1',
  },
  {
    polish: 'dziewięć',
    german: 'neun',
    polish_tips: '',
    german_tips: '',
    category: 'liczby',
    tags: ['słówka', 'liczby'],
    level: 'A1',
  },
  {
    polish: 'dziesięć',
    german: 'zehn',
    polish_tips: '',
    german_tips: '',
    category: 'liczby',
    tags: ['słówka', 'liczby'],
    level: 'A1',
  },
  {
    polish: 'jedenaście',
    german: 'elf',
    polish_tips: '',
    german_tips: '',
    category: 'liczby',
    tags: ['słówka', 'liczby'],
    level: 'A1',
  },
  {
    polish: 'dwanaście',
    german: 'zwölf',
    polish_tips: '',
    german_tips: '',
    category: 'liczby',
    tags: ['słówka', 'liczby'],
    level: 'A1',
  },
  {
    polish: 'styczeń',
    german: 'Januar',
    polish_tips: '',
    german_tips: '',
    category: 'czas',
    tags: ['słówka', 'czas'],
    level: 'A1',
  },
  {
    polish: 'luty',
    german: 'Februar',
    polish_tips: '',
    german_tips: '',
    category: 'czas',
    tags: ['słówka', 'czas'],
    level: 'A1',
  },
  {
    polish: 'marzec',
    german: 'März',
    polish_tips: '',
    german_tips: '',
    category: 'czas',
    tags: ['słówka', 'czas'],
    level: 'A1',
  },
  {
    polish: 'kwiecień',
    german: 'April',
    polish_tips: '',
    german_tips: '',
    category: 'czas',
    tags: ['słówka', 'czas'],
    level: 'A1',
  },
  {
    polish: 'maj',
    german: 'Mai',
    polish_tips: '',
    german_tips: '',
    category: 'czas',
    tags: ['słówka', 'czas'],
    level: 'A1',
  },
  {
    polish: 'czerwiec',
    german: 'Juni',
    polish_tips: '',
    german_tips: '',
    category: 'czas',
    tags: ['słówka', 'czas'],
    level: 'A1',
  },
  {
    polish: 'lipiec',
    german: 'Juli',
    polish_tips: '',
    german_tips: '',
    category: 'czas',
    tags: ['słówka', 'czas'],
    level: 'A1',
  },
  {
    polish: 'sierpień',
    german: 'August',
    polish_tips: '',
    german_tips: '',
    category: 'czas',
    tags: ['słówka', 'czas'],
    level: 'A1',
  },
  {
    polish: 'wrzesień',
    german: 'September',
    polish_tips: '',
    german_tips: '',
    category: 'czas',
    tags: ['słówka', 'czas'],
    level: 'A1',
  },
  {
    polish: 'listopad',
    german: 'November',
    polish_tips: '',
    german_tips: '',
    category: 'czas',
    tags: ['słówka', 'czas'],
    level: 'A1',
  },
  {
    polish: 'październik',
    german: 'Oktober',
    polish_tips: '',
    german_tips: '',
    category: 'czas',
    tags: ['słówka', 'czas'],
    level: 'A1',
  },
  {
    polish: 'grudzień',
    german: 'Dezember',
    polish_tips: '',
    german_tips: '',
    category: 'czas',
    tags: ['słówka', 'czas'],
    level: 'A1',
  },
  {
    polish: 'poniedziałek',
    german: 'Montag',
    polish_tips: '',
    german_tips: '',
    category: 'czas',
    tags: ['słówka', 'czas'],
    level: 'A1',
  },
  {
    polish: 'wtorek',
    german: 'Dienstag',
    polish_tips: '',
    german_tips: '',
    category: 'czas',
    tags: ['słówka', 'czas'],
    level: 'A1',
  },
  {
    polish: 'środa',
    german: 'Mittwoch',
    polish_tips: '',
    german_tips: '',
    category: 'czas',
    tags: ['słówka', 'czas'],
    level: 'A1',
  },
  {
    polish: 'czwartek',
    german: 'Donnerstag',
    polish_tips: '',
    german_tips: '',
    category: 'czas',
    tags: ['słówka', 'czas'],
    level: 'A1',
  },
  {
    polish: 'piątek',
    german: 'Freitag',
    polish_tips: '',
    german_tips: '',
    category: 'czas',
    tags: ['słówka', 'czas'],
    level: 'A1',
  },
  {
    polish: 'sobota',
    german: 'Samstag',
    polish_tips: '',
    german_tips: '',
    category: 'czas',
    tags: ['słówka', 'czas'],
    level: 'A1',
  },
  {
    polish: 'niedziela',
    german: 'Sonntag',
    polish_tips: '',
    german_tips: '',
    category: 'czas',
    tags: ['słówka', 'czas'],
    level: 'A1',
  },
  {
    polish: 'tata',
    german: 'der Vater',
    polish_tips: '',
    german_tips: '',
    category: 'rodzina',
    tags: ['słówka', 'rodzina'],
    level: 'A1',
  },
  {
    polish: 'mama',
    german: 'die Mutter',
    polish_tips: '',
    german_tips: '',
    category: 'rodzina',
    tags: ['słówka', 'rodzina'],
    level: 'A1',
  },
  {
    polish: 'mamusia',
    german: 'die Mutti',
    polish_tips: '',
    german_tips: '',
    category: 'rodzina',
    tags: ['słówka', 'rodzina'],
    level: 'A1',
  },
  {
    polish: 'tatuś',
    german: 'der Vati',
    polish_tips: '',
    german_tips: '',
    category: 'rodzina',
    tags: ['słówka', 'rodzina'],
    level: 'A1',
  },
  {
    polish: 'rodzice',
    german: 'die Eltern',
    polish_tips: '',
    german_tips: '',
    category: 'rodzina',
    tags: ['słówka', 'rodzina'],
    level: 'A1',
  },
  {
    polish: 'dziecko',
    german: 'das Kind',
    polish_tips: '',
    german_tips: '',
    category: 'rodzina',
    tags: ['słówka', 'rodzina'],
    level: 'A1',
  },
  {
    polish: 'dzieci',
    german: 'die Kinder',
    polish_tips: '',
    german_tips: '',
    category: 'rodzina',
    tags: ['słówka', 'rodzina'],
    level: 'A1',
  },
  {
    polish: 'brat',
    german: 'der Bruder',
    polish_tips: '',
    german_tips: '',
    category: 'rodzina',
    tags: ['słówka', 'rodzina'],
    level: 'A1',
  },
  {
    polish: 'siostra',
    german: 'die Schwester',
    polish_tips: '',
    german_tips: '',
    category: 'rodzina',
    tags: ['słówka', 'rodzina'],
    level: 'A1',
  },
  {
    polish: 'córka',
    german: 'die Tochter',
    polish_tips: '',
    german_tips: '',
    category: 'rodzina',
    tags: ['słówka', 'rodzina'],
    level: 'A1',
  },
  {
    polish: 'dziadek',
    german: 'die Großvater',
    polish_tips: '',
    german_tips: '',
    category: 'rodzina',
    tags: ['słówka', 'rodzina'],
    level: 'A1',
  },
  {
    polish: 'prababka',
    german: 'die Urgroßmutter',
    polish_tips: '',
    german_tips: '',
    category: 'rodzina',
    tags: ['słówka', 'rodzina'],
    level: 'B1',
  },
  {
    polish: 'dziadziuś',
    german: 'der Opa',
    polish_tips: '',
    german_tips: '',
    category: 'rodzina',
    tags: ['słówka', 'rodzina'],
    level: 'A1',
  },
  {
    polish: 'babcia',
    german: 'die Großmutter',
    polish_tips: '',
    german_tips: '',
    category: 'rodzina',
    tags: ['słówka', 'rodzina'],
    level: 'A1',
  },
  {
    polish: 'dziadkowie',
    german: 'die Großeltern',
    polish_tips: '',
    german_tips: '',
    category: 'rodzina',
    tags: ['słówka', 'rodzina'],
    level: 'A1',
  },
  {
    polish: 'wujek',
    german: 'der Onkel',
    polish_tips: '',
    german_tips: '',
    category: 'rodzina',
    tags: ['słówka', 'rodzina'],
    level: 'A1',
  },
  {
    polish: 'ciocia',
    german: 'die Tante',
    polish_tips: '',
    german_tips: '',
    category: 'rodzina',
    tags: ['słówka', 'rodzina'],
    level: 'A1',
  },
  {
    polish: 'pradziadek',
    german: 'der Urgroßvater',
    polish_tips: '',
    german_tips: '',
    category: 'rodzina',
    tags: ['słówka', 'rodzina'],
    level: 'B1',
  },
  {
    polish: 'pasierb',
    german: 'der Stiefsohn',
    polish_tips: '',
    german_tips: '',
    category: 'rodzina',
    tags: ['słówka', 'rodzina'],
    level: 'A2',
  },
  {
    polish: 'ojczym',
    german: 'der Stiefvater',
    polish_tips: '',
    german_tips: '',
    category: 'rodzina',
    tags: ['słówka', 'rodzina'],
    level: 'A2',
  },
  {
    polish: 'kochanek',
    german: 'der Liebhaber',
    polish_tips: '',
    german_tips: '',
    category: 'rodzina',
    tags: ['słówka', 'rodzina'],
    level: 'A2',
  },
  {
    polish: 'babcia',
    german: 'die Oma',
    polish_tips: '',
    german_tips: '',
    category: 'rodzina',
    tags: ['słówka', 'rodzina'],
    level: 'A2',
  },
  {
    polish: 'doświadczenie',
    german: 'die Erfahrung',
    polish_tips: '',
    german_tips: '',
    category: 'praca',
    tags: ['słówka', 'praca'],
    level: 'A1',
  },
  {
    polish: 'rezultat',
    german: 'das Ergebnis',
    polish_tips: '',
    german_tips: '',
    category: 'praca',
    tags: ['słówka', 'praca'],
    level: 'A1',
  },
  {
    polish: 'ankieta',
    german: 'die Umfrage',
    polish_tips: '',
    german_tips: '',
    category: 'praca',
    tags: ['słówka', 'praca'],
    level: 'A1',
  },
  {
    polish: 'kilka razy',
    german: 'mehrmals',
    polish_tips: '',
    german_tips: '',
    category: 'czas',
    tags: ['słówka', 'czas'],
    level: 'A2',
  },
  {
    polish: 'urządzenie',
    german: 'das Gerät',
    polish_tips: '',
    german_tips: '',
    category: 'technika',
    tags: ['słówka', 'technika'],
    level: 'A1',
  },
  {
    polish: 'preferować',
    german: 'bevorzugen',
    polish_tips: '',
    german_tips: '',
    category: 'ogólne',
    tags: ['słówka', 'ogólne'],
    level: 'B2',
  },
  {
    polish: 'przenośny',
    german: 'tragbar',
    polish_tips: '',
    german_tips: '',
    category: 'technika',
    tags: ['słówka', 'technika'],
    level: 'B2',
  },
  {
    polish: 'życie',
    german: 'das Leben',
    polish_tips: '',
    german_tips: '',
    category: 'ogólne',
    tags: ['słówka', 'ogólne'],
    level: 'B2',
  },
  {
    polish: 'rzadko',
    german: 'selten',
    polish_tips: '',
    german_tips: '',
    category: 'czas',
    tags: ['słówka', 'czas'],
    level: 'A2',
  },
  {
    polish: 'używać',
    german: 'nutzen',
    polish_tips: '',
    german_tips: '',
    category: 'ogólne',
    tags: ['słówka', 'ogólne'],
    level: 'A2',
  },
  {
    polish: 'poświęcać',
    german: 'widmen',
    polish_tips: '',
    german_tips: '',
    category: 'ogólne',
    tags: ['słówka', 'ogólne'],
    level: 'B2',
  },
  {
    polish: 'róg alpejski',
    german: 'das Alphorn',
    polish_tips: '',
    german_tips: '',
    category: 'ogólne',
    tags: ['słówka', 'hobby'],
    level: 'A1',
  },
  {
    polish: 'ławka',
    german: 'die Bank',
    polish_tips: '',
    german_tips: '',
    category: 'ogólne',
    tags: ['słówka', 'ogólne'],
    level: 'A1',
  },
  {
    polish: 'węgorz',
    german: 'der Aal',
    polish_tips: '',
    german_tips: '',
    category: 'ogólne',
    tags: ['słówka', 'zwierzęta'],
    level: 'C2',
  },
  {
    polish: 'bożek',
    german: 'der Abgott',
    polish_tips: '',
    german_tips: '',
    category: 'ogólne',
    tags: ['słówka', 'hobby'],
    level: 'C2',
  },
  {
    polish: 'dostawa',
    german: 'die Ablieferung',
    polish_tips: '',
    german_tips: '',
    category: 'ogólne',
    tags: ['słówka', 'praca'],
    level: 'C2',
  },
  {
    polish: 'malować',
    german: 'malen',
    polish_tips: '',
    german_tips: '',
    category: 'ogólne',
    tags: ['słówka', 'hobby'],
    level: 'A1',
  },
  {
    polish: 'gotować',
    german: 'kochen',
    polish_tips: '',
    german_tips: '',
    category: 'ogólne',
    tags: ['słówka', 'praca'],
    level: 'A1',
  },
  {
    polish: 'uczyć się',
    german: 'lernen',
    polish_tips: '',
    german_tips: '',
    category: 'ogólne',
    tags: ['słówka', 'praca'],
    level: 'A1',
  },
  {
    polish: 'pytać',
    german: 'fragen',
    polish_tips: '',
    german_tips: '',
    category: 'ogólne',
    tags: ['słówka', 'praca'],
    level: 'A1',
  },
  {
    polish: 'dostosować się do',
    german: 'anpassen sich an + Akk',
    polish_tips: '',
    german_tips: '',
    category: 'ogólne',
    tags: ['słówka', 'rekcja czasownika'],
    level: 'B1',
  },
  {
    polish: 'odpowiadać na',
    german: 'antworten auf + Akk',
    polish_tips: '',
    german_tips: '',
    category: 'ogólne',
    tags: ['słówka', 'rekcja czasownika'],
    level: 'B1',
  },
  {
    polish: 'pracować nad',
    german: 'arbeiten an + Dat',
    polish_tips: '',
    german_tips: '',
    category: 'ogólne',
    tags: ['słówka', 'rekcja czasownika'],
    level: 'B1',
  },
  {
    polish: 'pracować z',
    german: 'arbeiten mit + Dat',
    polish_tips: '',
    german_tips: '',
    category: 'ogólne',
    tags: ['słówka', 'rekcja czasownika'],
    level: 'B1',
  },
  {
    polish: 'podziękować za',
    german: 'bedanken sich bei + Dat',
    polish_tips: '',
    german_tips: '',
    category: 'ogólne',
    tags: ['słówka', 'rekcja czasownika'],
    level: 'B1',
  },
  {
    polish: 'zaczynać od',
    german: 'beginnen mit + Dat',
    polish_tips: '',
    german_tips: '',
    category: 'ogólne',
    tags: ['słówka', 'rekcja czasownika'],
    level: 'B1',
  },
  {
    polish: 'zaczynać od',
    german: 'anfangen mit + Dat',
    polish_tips: '',
    german_tips: '',
    category: 'ogólne',
    tags: ['słówka', 'rekcja czasownika'],
    level: 'B1',
  },
  {
    polish: 'składać się z',
    german: 'bestehen aus + Dat',
    polish_tips: '',
    german_tips: '',
    category: 'ogólne',
    tags: ['słówka', 'rekcja czasownika'],
    level: 'B1',
  },
  {
    polish: 'myśleć o',
    german: 'denken an + Akk',
    polish_tips: '',
    german_tips: '',
    category: 'ogólne',
    tags: ['słówka', 'rekcja czasownika'],
    level: 'B1',
  },
];

module.exports = defaultFlashcards;
