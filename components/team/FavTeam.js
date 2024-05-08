import React, { useState } from 'react';
import { QueryClient, QueryClientProvider, useMutation } from 'react-query';
import cookie from 'js-cookie';
import baseURL from '../../utils/baseURL';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const queryClient = new QueryClient();

export default function FavTeam({ team, profile }) {
  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <TeamFav team={team} profile={profile} />
    </QueryClientProvider>
  );
}
const TeamFav = ({ team, profile }) => {
  const [add, setAdd] = useState(false);
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const isFav =
    team?.favourites?.filter((fav) => {
      return fav.profile === profile._id;
    }).length > 0;

  const handleAdd = (e) => {
    e.preventDefault();
    mutate({ add });
    setAdd(true);
    refreshData();
  };

  const addingFav = async () => {
    await fetch(`${baseURL}/api/teams/favs/team/${team._id}`, {
      method: 'PUT',
      headers: {
        Authorization: cookie.get('token')
      }
    });
    if (isFav === true) {
      toast.success('Removed From Favourites');
    } else {
      toast.success('Added To Favourites');
    }
  };

  const { mutate } = useMutation(addingFav);
  return (
    <>
      {isFav === true ? (
        <div className="stars active">
          <i className="fa fa-star" aria-hidden="true" onClick={handleAdd}></i>
        </div>
      ) : (
        <div className="stars">
          <i
            className="fa fa-star-o"
            aria-hidden="true"
            onClick={handleAdd}
          ></i>
        </div>
      )}
    </>
  );
};
