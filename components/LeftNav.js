import DarkMode from './theme/dark-mode';
import Link from 'next/link';
import { useRouter } from 'next/router';
//import ListDrag from './ListDrag';

function LeftNav({ user }) {
  const router = useRouter();

  return (
    <div className="left_side">
      <nav>
        <ul>
          <li className={router.pathname == '/dashboard' ? 'active' : ''}>
            <Link href="/dashboard">
              <a>
                <span className="iconbg">
                  {/* <img src="/assets/media/icons/home.png" alt="" /> */}
                </span>{' '}
                <span className="title">HOME</span>
              </a>
            </Link>{' '}
          </li>
          <li className={router.pathname == '/ranking' ? 'active' : ''}>
            <Link href="/ranking">
              <a className="">
                <span className="iconbg">
                  {/* <img src="/assets/media/icons/Ranking.png" alt="" /> */}
                </span>{' '}
                <span className="title">RANKING</span>
              </a>
            </Link>
          </li>
          <li className={router.pathname == '/tournament' ? 'active' : ''}>
            <Link href="/tournament">
              <a className="">
                <span className="iconbg">
                  {/* <img src="/assets/media/icons/Torunaments.png" alt="" /> */}
                </span>{' '}
                <span className="title">TOURNAMENTS</span>
              </a>
            </Link>
          </li>
          <li className={router.pathname == '/games/list' ? 'active' : ''}>
            <Link href="/games/list">
              <a className="">
                <span className="iconbg">
                  {/* <img src="/assets/media/icons/Games.png" alt="" /> */}
                </span>{' '}
                <span className="title">GAMES</span>
              </a>
            </Link>{' '}
          </li>
          <li className={router.pathname == '/discover' ? 'active' : ''}>
            <Link href="/discover">
              <a className="">
                <span className="iconbg">
                  {/* <img src="/assets/media/icons/Discovery.png" alt="" /> */}
                </span>{' '}
                <span className="title">DISCOVER</span>
              </a>
            </Link>
          </li>
          {/* <li className={router.pathname == '/calendar' ? 'active' : ''}>
            <Link href="/calendar">
              <a className="">
                <span className="iconbg">
                 
                </span>{' '}
                <span className="title">CALENDER</span>
              </a>
            </Link>{' '}
          </li> */}
          {/* <li className={router.pathname == '/challenges' ? 'active' : ''}>
            <Link href="/challenges">
              <a className="">
                <span className="iconbg">
                 
                </span>{' '}
                <span className="title">WAGERS</span>
              </a>
            </Link>
          </li> */}
          {/* <li className={router.pathname == '/battlepass' ? 'active' : ''}>
            <Link href="/battlepass">
              <a className="">
                <span className="iconbg">
                  
                </span>{' '}
                <span className="title">BATTLEPASS</span>
              </a>
            </Link>
          </li> */}
          {/* {user?.isSuperAdmin === true || user?.isSupportAdmin === true ? (
            <li className={router.pathname == '/adminpage' ? 'active' : ''}>
              <Link href="/adminpage">
                <a className="">
                  <span className="iconbg">
                    
                  </span>{' '}
                  <span className="title">Admin Settings</span>
                </a>
              </Link>{' '}
            </li>
          ) : (
            ''
          )} */}
          <li className="submenu">
          
            <ul className="more_left_menu">
              <li>
                <Link href="/">
                  <a className="">
                    <span className="iconbg">
                      <i className="fa fa-shopping-bag" aria-hidden="true"></i>
                    </span>{' '}
                    <span className="title">SHOP</span>
                  </a>
                </Link>{' '}
              </li>
              <li>
                <Link href="/nftindex">
                  <a className="">
                    <span className="iconbg">
                      <i
                        className="fa fa-connectdevelop"
                        aria-hidden="true"
                      ></i>
                    </span>{' '}
                    <span className="title">SHOP NFTs</span>
                  </a>
                </Link>{' '}
              </li>

              <li>
                <Link href="/nftgames">
                  <a className="">
                    <span className="iconbg">
                      <i className="fa fa-fast-forward" aria-hidden="true"></i>
                    </span>{' '}
                    <span className="title">Play</span>
                  </a>
                </Link>{' '}
              </li>

              {/* {user?.role === 'admin' ? (
                <li>
                  <Link href="/settings">
                    <a className="">
                      <span className="iconbg">
                        <i className="fa fa-cog" aria-hidden="true"></i>
                      </span>{' '}
                      <span className="title">SETTINGS</span>
                    </a>
                  </Link>{' '}
                </li>
              ) : (
                ''
              )} */}
              {/* {user?.isSuperAdmin === true ? (
                <li>
                  <Link href="/adminpage">
                    <a className="">
                      <span className="iconbg">
                        <i className="fa fa-cog" aria-hidden="true"></i>
                      </span>{' '}
                      <span className="title">Admin Settings</span>
                    </a>
                  </Link>{' '}
                </li>
              ) : (
                ''
              )} */}
            </ul>
          </li>
        </ul> 
      </nav>

      {/* <DarkMode /> */}
    </div>
  );
}

export default LeftNav;
