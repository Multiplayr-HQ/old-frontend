import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import cookie from 'js-cookie';
import axios from 'axios';
import baseURL from '@utils/baseURL';
import TournamentDisplay from '../tournament/TournamentDisplay';

const GameTournaments = ({ user }) => {
  const router = useRouter();

  const [tournaments, setTournaments] = useState([]);

  const { id } = router.query;

  useEffect(() => {
    axios
      .get(`${baseURL}/api/tournaments/tournamentsbygame/${id}`)
      .then((res) => {
        setTournaments(res.data);
      });
  }, []);

  return <TournamentDisplay tournament={tournaments} user={user} />;
};

export default GameTournaments;
