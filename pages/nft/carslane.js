import MetaDash from '@components/MetaDash';
import SignedHeader from '@components/SignedHeader';
import LeftNav from '@components/LeftNav';
import AllScript from '../AllScript';
import Game from '@components/games/Game';
import baseURL from '@utils/baseURL';

const Carslane = ({ user }) => {

  const url = process.env.NEXT_PUBLIC_CARSLANE_URL + '/index.html';
  console.log(url);
  return (
    <>
      <MetaDash />
      <SignedHeader user={user} />
      <LeftNav user={user} />

<iframe id="carslaneid"
    title="carslane Frame"
style={{border : 'none', margin:'0', padding:'0', position:'absolute', top:'0px', left:'0px', bottom:'0px',right:'0px',  width: '100%' , height: '100%', frameborder:'0',  seamless:'seamless', scrolling:'no'}}
     src={url} width="100%" height="100%">
</iframe>


      <AllScript />
    </>
  );
};

export default Carslane;

