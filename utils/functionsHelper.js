import axios from 'axios';
import { useRouter } from 'next/router';
import cookie from 'js-cookie';

import baseURL from './baseURL';
import catchErrors from './catchErrors';

export const searchTournaments = async (
  { search, filters },
  setError,
  setLoading,
  toast,
  setStatus
) => {
  setLoading(true);
  try {
    const res = await axios.post(`${baseURL}/api/tournaments/search`, {
      search,
      filters
    });
    toast.info(res.data.msg);
    setStatus('confirm');
    return res.data;
  } catch (error) {
    const errorMsg = catchErrors(error);
    setError(errorMsg);
    toast.error(errorMsg);
  }
  setLoading(false);
};

export const searchTeams = async (
  { search, filters },
  setError,
  setLoading,
  toast,
  setStatus
) => {
  setLoading(true);
  try {
    const res = await axios.post(`${baseURL}/api/teams/search`, {
      search,
      filters
    });
    toast.info(res.data.msg);
    setStatus('confirm');
    return res.data;
  } catch (error) {
    const errorMsg = catchErrors(error);
    setError(errorMsg);
    toast.error(errorMsg);
  }
  setLoading(false);
};

// search ranking
export const searchRanks = async (
  { search, filters },
  selectedGame,
  setError,
  setLoading,
  toast,
  setStatus
) => {
  setLoading(true);
  try {
    const res = await axios.post(`${baseURL}/api/rankings/bywinnings100/${selectedGame?._id}?searchText`, {
      search,
      filters
    });
    toast.info(res.data.msg);
    setStatus('confirm');
    return res?.data;
  } catch (error) {
    const errorMsg = catchErrors(error);
    setError(errorMsg);
    toast.error(errorMsg);
  }
  setLoading(false);
};



export const searchJobs = async (
  { search, filters },
  setError,
  setLoading,
  toast,
  setStatus
) => {
  setLoading(true);
  try {
    const res = await axios.post(`${baseURL}/api/jobs/search`, {
      search,
      filters
    });
    toast.info(res.data.msg);
    setStatus('confirm');
    return res.data;
  } catch (error) {
    const errorMsg = catchErrors(error);
    setError(errorMsg);
    toast.error(errorMsg);
  }
  setLoading(false);
};

export const logoutUser = () => {
  const router = useRouter();
  cookie.remove('token');
  router.push('/login');
};

export const getTournaments = async () => {
  const { data } = await axios.get(`${baseURL}/api/tournaments`, {});
  return data;
};

//Get Teams, Ranking, Tournaments
export const getTeamsRankingTournaments = async (filters) => {
  const gameId = 'undefined';
  const teamIds = await axios.get(
    `${baseURL}/api/teams/teamsbygame/${gameId}`,
    {}
  );

  return teamIds?.data;
};

export const getTournament = async (tournamentid) => {
  const { data } = await axios.get(
    `${baseURL}/api/tournaments/${tournamentid}`,
    {}
  );
  return data;
};

const matchTypes = {
  pubgMatchType: ['Team Deathmatch', 'Zombies', 'War', 'Conquest'],
  codMatchType: [
    'Team Deathmatch',
    'Frontline',
    'Hardpoint',
    'Search and Destroy',
    'Free for All',
    '10 V 10',
    'Domination'
  ],
  lolMatchType: ["Summoner's Rift", 'ARAM', 'Teamfight Tactics'],
  valorantMatchType: [
    'Unrated',
    'Spike Rush',
    'Competitive',
    'Premier',
    'Deathmatch',
    'Escalation',
    'Replication',
    'Snowball Fight'
  ],
  csgoMatchType: [
    'Competitive',
    'Casual',
    'Deathmatch',
    'Arms Race',
    'Demolition',
    'Wingman',
    'Flying Scoutsman',
    'Retakes',
    'Danger Zone'
  ]
};

export const handleMatchType = (selectGames) => {
  let matchData;
  if (selectGames === 20) {
    matchData = matchTypes.pubgMatchType;
  } else if (selectGames === 23) {
    matchData = matchTypes.codMatchType;
  } else if (selectGames === 1) {
    matchData = matchTypes.lolMatchType;
  } else if (selectGames === 26) {
    matchData = matchTypes.valorantMatchType;
  } else if (selectGames === 3) {
    matchData = matchTypes.csgoMatchType;
  } else {
    matchData = [];
  }
  return matchData;
};

export const regionsData = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttarakhand',
  'Uttar Pradesh',
  'West Bengal'
];

export const LanguageData = [
  'English',
  'Hindi',
  'Tamil',
  'Bengali',
  'Marathi',
  'Telugu',
  'Gujarathi',
  'Kannada',
  'Urdu',
  'Odia',
  'Malayalam',
  'Punjabi',
  'Assamese',
  'Maithili',
  'Kashmiri',
  'Nepali',
  'Konkani',
  'Tulu'
];

export const isMember = (data, user) => {
  let smtg = '';
  if (data.tournament?.playType === 'TEAMS') {
    for (let i = 0; i < data.tournament.teams.length; i++) {
      const newTT = data.tournament.teams[i];

      for (let j = 0; j < newTT.teamId.employees.length; j++) {
        if (
          (newTT.teamId.employees[j].role === 'Owner' ||
            newTT.teamId.employees[j].role === 'Captain') &&
          newTT.teamId.employees[j].employeeId == user._id
        ) {
          smtg = newTT.teamId.employees[j].employeeId;
        }
      }
    }
  } else if (data.tournament?.playType === 'SOLO') {
    for (let i = 0; i < data.tournament.registered.length; i++) {
      if (data.tournament.registered[i].user._id == user._id) {
        smtg = data.tournament.registered[i].user._id;
      }
    }
  }

  return smtg;
};

export const PersonaHelper = (
  count,
  personas,
  username,
  profilepic,
  postType,
  teamId
) => {
  if (count > -1) {
    let x = personas.personas[count];
    switch (x?.type) {
      case 'team':
        username = x.teamId?.name;
        profilepic = x.teamId?.imgUrl;
        teamId = x.teamId?._id;
        postType = 'team';
        break;
      case 'tournament':
        username = x.tournamentId?.name;
        profilepic = x.tournamentId?.imgUrl;
        postType = 'tour';
        break;
      case 'brand':
        username = x.brandId?.name;
        profilepic = x.brandId?.logoUrl;
        postType = 'brand';
        break;

      default:
        username = username;
        profilepic = profilepic;
        postType = 'user';
        break;
    }
  } else if (count === -1) {
    username = username;
    profilepic = profilepic;
    postType = 'user';
    teamId = '';
  }

  return { username, profilepic, postType, teamId };
};
