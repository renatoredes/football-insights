import { Match, TeamStats, HeadToHead, BetRecommendation, AnalysisResult } from '@/types/football';

const arsenalMatches: Match[] = [
  {
    id: '1',
    date: '2024-12-21',
    homeTeam: 'Arsenal',
    awayTeam: 'Crystal Palace',
    homeScore: 3,
    awayScore: 1,
    homeCorners: 7,
    awayCorners: 4,
    homeYellowCards: 2,
    awayYellowCards: 3,
    homeRedCards: 0,
    awayRedCards: 0,
    isHome: true,
  },
  {
    id: '2',
    date: '2024-12-14',
    homeTeam: 'Everton',
    awayTeam: 'Arsenal',
    homeScore: 0,
    awayScore: 2,
    homeCorners: 3,
    awayCorners: 8,
    homeYellowCards: 4,
    awayYellowCards: 1,
    homeRedCards: 0,
    awayRedCards: 0,
    isHome: false,
  },
  {
    id: '3',
    date: '2024-12-07',
    homeTeam: 'Arsenal',
    awayTeam: 'Monaco',
    homeScore: 3,
    awayScore: 0,
    homeCorners: 9,
    awayCorners: 2,
    homeYellowCards: 1,
    awayYellowCards: 2,
    homeRedCards: 0,
    awayRedCards: 0,
    isHome: true,
  },
  {
    id: '4',
    date: '2024-12-01',
    homeTeam: 'Arsenal',
    awayTeam: 'Man United',
    homeScore: 2,
    awayScore: 0,
    homeCorners: 6,
    awayCorners: 3,
    homeYellowCards: 2,
    awayYellowCards: 4,
    homeRedCards: 0,
    awayRedCards: 1,
    isHome: true,
  },
  {
    id: '5',
    date: '2024-11-23',
    homeTeam: 'West Ham',
    awayTeam: 'Arsenal',
    homeScore: 2,
    awayScore: 5,
    homeCorners: 4,
    awayCorners: 7,
    homeYellowCards: 3,
    awayYellowCards: 2,
    homeRedCards: 0,
    awayRedCards: 0,
    isHome: false,
  },
];

const crystalPalaceMatches: Match[] = [
  {
    id: '6',
    date: '2024-12-21',
    homeTeam: 'Arsenal',
    awayTeam: 'Crystal Palace',
    homeScore: 3,
    awayScore: 1,
    homeCorners: 7,
    awayCorners: 4,
    homeYellowCards: 2,
    awayYellowCards: 3,
    homeRedCards: 0,
    awayRedCards: 0,
    isHome: false,
  },
  {
    id: '7',
    date: '2024-12-15',
    homeTeam: 'Crystal Palace',
    awayTeam: 'Brighton',
    homeScore: 1,
    awayScore: 1,
    homeCorners: 5,
    awayCorners: 6,
    homeYellowCards: 2,
    awayYellowCards: 2,
    homeRedCards: 0,
    awayRedCards: 0,
    isHome: true,
  },
  {
    id: '8',
    date: '2024-12-08',
    homeTeam: 'Man City',
    awayTeam: 'Crystal Palace',
    homeScore: 2,
    awayScore: 2,
    homeCorners: 8,
    awayCorners: 3,
    homeYellowCards: 1,
    awayYellowCards: 3,
    homeRedCards: 0,
    awayRedCards: 0,
    isHome: false,
  },
  {
    id: '9',
    date: '2024-12-01',
    homeTeam: 'Crystal Palace',
    awayTeam: 'Newcastle',
    homeScore: 0,
    awayScore: 1,
    homeCorners: 4,
    awayCorners: 5,
    homeYellowCards: 3,
    awayYellowCards: 2,
    homeRedCards: 1,
    awayRedCards: 0,
    isHome: true,
  },
  {
    id: '10',
    date: '2024-11-24',
    homeTeam: 'Aston Villa',
    awayTeam: 'Crystal Palace',
    homeScore: 2,
    awayScore: 1,
    homeCorners: 6,
    awayCorners: 4,
    homeYellowCards: 2,
    awayYellowCards: 4,
    homeRedCards: 0,
    awayRedCards: 0,
    isHome: false,
  },
];

export function calculateTeamStats(teamName: string, matches: Match[]): TeamStats {
  const totalGoalsScored = matches.reduce((acc, m) => {
    return acc + (m.isHome ? m.homeScore : m.awayScore);
  }, 0);

  const totalGoalsConceded = matches.reduce((acc, m) => {
    return acc + (m.isHome ? m.awayScore : m.homeScore);
  }, 0);

  const totalCorners = matches.reduce((acc, m) => {
    return acc + (m.isHome ? m.homeCorners : m.awayCorners);
  }, 0);

  const totalYellowCards = matches.reduce((acc, m) => {
    return acc + (m.isHome ? m.homeYellowCards : m.awayYellowCards);
  }, 0);

  const totalRedCards = matches.reduce((acc, m) => {
    return acc + (m.isHome ? m.homeRedCards : m.awayRedCards);
  }, 0);

  const wins = matches.filter(m => {
    const scored = m.isHome ? m.homeScore : m.awayScore;
    const conceded = m.isHome ? m.awayScore : m.homeScore;
    return scored > conceded;
  }).length;

  const draws = matches.filter(m => m.homeScore === m.awayScore).length;
  const losses = matches.length - wins - draws;

  return {
    teamName,
    matches,
    totalGoalsScored,
    totalGoalsConceded,
    avgGoalsScored: totalGoalsScored / matches.length,
    avgGoalsConceded: totalGoalsConceded / matches.length,
    totalCorners,
    avgCorners: totalCorners / matches.length,
    totalYellowCards,
    totalRedCards,
    avgCards: (totalYellowCards + totalRedCards) / matches.length,
    wins,
    draws,
    losses,
  };
}

export function generateRecommendations(
  team1Stats: TeamStats,
  team2Stats: TeamStats
): BetRecommendation[] {
  const recommendations: BetRecommendation[] = [];

  // Goals analysis
  const avgTotalGoals = team1Stats.avgGoalsScored + team1Stats.avgGoalsConceded +
    team2Stats.avgGoalsScored + team2Stats.avgGoalsConceded;
  const expectedGoals = avgTotalGoals / 2;

  if (expectedGoals >= 3) {
    recommendations.push({
      type: 'Over/Under Gols',
      recommendation: 'Over 2.5 Gols',
      confidence: expectedGoals >= 3.5 ? 'high' : 'medium',
      reasoning: `Média de ${expectedGoals.toFixed(1)} gols por jogo combinado. ${team1Stats.teamName} marca ${team1Stats.avgGoalsScored.toFixed(1)} gols/jogo.`,
      value: expectedGoals,
    });
  } else if (expectedGoals <= 2) {
    recommendations.push({
      type: 'Over/Under Gols',
      recommendation: 'Under 2.5 Gols',
      confidence: expectedGoals <= 1.5 ? 'high' : 'medium',
      reasoning: `Média de apenas ${expectedGoals.toFixed(1)} gols por jogo. Jogos tendem a ser mais fechados.`,
      value: expectedGoals,
    });
  }

  // Corners analysis
  const avgTotalCorners = team1Stats.avgCorners + team2Stats.avgCorners;
  if (avgTotalCorners >= 9) {
    recommendations.push({
      type: 'Escanteios',
      recommendation: 'Over 9.5 Escanteios',
      confidence: avgTotalCorners >= 11 ? 'high' : 'medium',
      reasoning: `Média combinada de ${avgTotalCorners.toFixed(1)} escanteios. ${team1Stats.teamName}: ${team1Stats.avgCorners.toFixed(1)}/jogo.`,
      value: avgTotalCorners,
    });
  } else {
    recommendations.push({
      type: 'Escanteios',
      recommendation: 'Under 9.5 Escanteios',
      confidence: avgTotalCorners <= 7 ? 'high' : 'low',
      reasoning: `Média combinada de ${avgTotalCorners.toFixed(1)} escanteios por jogo.`,
      value: avgTotalCorners,
    });
  }

  // Cards analysis
  const avgTotalCards = team1Stats.avgCards + team2Stats.avgCards;
  if (avgTotalCards >= 5) {
    recommendations.push({
      type: 'Cartões',
      recommendation: 'Over 4.5 Cartões',
      confidence: avgTotalCards >= 6 ? 'high' : 'medium',
      reasoning: `Média de ${avgTotalCards.toFixed(1)} cartões por jogo. Partida pode ser disputada.`,
      value: avgTotalCards,
    });
  }

  // BTTS (Both Teams To Score)
  const team1ScoresOften = team1Stats.avgGoalsScored >= 1.2;
  const team2ScoresOften = team2Stats.avgGoalsScored >= 1;
  const team1ConcedesOften = team1Stats.avgGoalsConceded >= 0.8;
  const team2ConcedesOften = team2Stats.avgGoalsConceded >= 1;

  if (team1ScoresOften && team2ScoresOften && team1ConcedesOften && team2ConcedesOften) {
    recommendations.push({
      type: 'Ambas Marcam',
      recommendation: 'Sim - Ambas Marcam',
      confidence: 'medium',
      reasoning: `${team1Stats.teamName} marca ${team1Stats.avgGoalsScored.toFixed(1)} e sofre ${team1Stats.avgGoalsConceded.toFixed(1)} gols/jogo.`,
      value: (team1Stats.avgGoalsScored + team2Stats.avgGoalsScored) / 2,
    });
  }

  return recommendations;
}

export function getMockAnalysis(team1: string, team2: string): AnalysisResult {
  // Use mock data for demo
  const team1Stats = calculateTeamStats(team1 || 'Arsenal', arsenalMatches);
  const team2Stats = calculateTeamStats(team2 || 'Crystal Palace', crystalPalaceMatches);

  const headToHead: HeadToHead = {
    matches: [arsenalMatches[0]], // The direct match
    team1Wins: 1,
    team2Wins: 0,
    draws: 0,
    avgGoals: 4,
    avgCorners: 11,
  };

  const recommendations = generateRecommendations(team1Stats, team2Stats);

  return {
    team1Stats: { ...team1Stats, teamName: team1 || 'Arsenal' },
    team2Stats: { ...team2Stats, teamName: team2 || 'Crystal Palace' },
    headToHead,
    recommendations,
  };
}
