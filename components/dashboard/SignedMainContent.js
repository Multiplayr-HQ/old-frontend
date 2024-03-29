import { useState, useEffect } from 'react';
import axios from 'axios';
import baseURL from '@utils/baseURL';
import Link from 'next/link';
import { useMutation } from 'react-query';
import cookie from 'js-cookie';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import AllPosts from './AllPosts';
import { TwitterShareButton } from 'react-share';
import { PersonaHelper } from '../../utils/functionsHelper';

const SignedMainContent = ({ posts, user, profile }) => {
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [followingPosts, setFollowingPosts] = useState([]);
  const [profilepic, setProfilePic] = useState(user.profilePicUrl);
  const [username, setUsername] = useState(user.name);
  const [personas, setPersonas] = useState({});
  const [allgames, setAllGames] = useState([]);
  const [postType, setPostType] = useState('User');
  const [gameTag, setGameTag] = useState({
    name: '',
    gameId: ''
  });
  const [showGame, setShowGame] = useState('');
  const router = useRouter();
  const [profiledata, setProfileData] = useState([]);
  const [followData, setFollowData] = useState([]);
  const [topMenu, setTopMenu] = useState(profile?.isShortcutVisible);
  

  let teamId = '';
  const shareUrl = `${process.env.NEXT_PUBLIC_ESPORTS_API_BASE_URL}/signup`;

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/profile/${user.username}`);
        setProfileData(response?.data);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchProfileData(); // Call the asynchronous function
  }, []);
  
  const mutation = useMutation(
    async (formData) => {
      try {
        const response = await axios.post(`${baseURL}/api/posts`, formData, {
          headers: {
            Authorization: cookie.get('token'),
            'Content-Type': 'multipart/form-data'
          }
        });
        return response.data; // Return the data from the response
      } catch (error) {
        throw new Error(error); // Throw the error for handling by the caller
      }
    }
  );
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = PersonaHelper(
      count,
      personas,
      username,
      profilepic,
      postType,
      teamId
    );

    const formdata = new FormData();

    if (description.trim() === '') {
      return toast.error('Please add a description');
    }

    formdata.append('description', description);
    formdata.append('image', image);
    formdata.append('profilepic', result.profilepic);
    formdata.append('username', result.username);
    formdata.append('postType', result.postType);
    formdata.append('gameTagName', gameTag.name);
    formdata.append('gameTagId', gameTag.gameId);
    formdata.append('teamId', result.teamId);

    //    for (const key of Object.keys(images)) {
    //      formdata.append('images', images[key]);
    //    }

    try {
      await mutation.mutateAsync(formdata);
      toast.success('Your post has been successfully uploaded');
      setDescription('');
      setImage(null);
      $('.image_box').remove();
      setGameTag({ name: '', gameId: '' });
      setShowGame('');
      router.push('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Please recheck your inputs');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const personasResponse = await axios.get(`${baseURL}/api/all/personas`, {
          headers: {
            Authorization: cookie.get('token')
          }
        });
        setPersonas(personasResponse.data);
  
        const followingPostsResponse = await axios.get(`${baseURL}/api/posts/feed`, {
          headers: {
            Authorization: cookie.get('token')
          }
        });
        setFollowingPosts(followingPostsResponse?.data?.posts);
  
        const allGamesResponse = await axios.get(`${baseURL}/api/all/games`);
        setAllGames(allGamesResponse?.data);
  
        const followersResponse = await axios.get(`${baseURL}/api/profile/${user.username}/followers`);
        setFollowData(followersResponse?.data);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData(); // Call the asynchronous function
  }, []);
  

  const selectgameTag = (x) => {
    setShowGame(x);
    setGameTag({ name: x.name, gameId: x._id });
    toast.success(`${x.name} is selected.`);
    $('a.model_close').parent().removeClass('show_model');
  };

  var settings = {
    infinite: false,
    vertical: true,
    verticalSwiping: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true
  };

  const [count, setCount] = useState(-1);
  

  useEffect(() => {
    const initializeSlider = () => {
      const sliderTimeout = setTimeout(() => {
        $('.user_slider').slick({
          infinite: false,
          vertical: true,
          verticalSwiping: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
          prevArrow: $('.slick-prev'),
          nextArrow: $('.slick-next')
        });
      }, 400);

      return () => clearTimeout(sliderTimeout); // Cleanup function to clear the timeout
    };

    initializeSlider();
  }, []); // Run only once when the component mounts

  useEffect(() => {
    const openModel = () => {
      $('a.model_show_btn').click(function () {
        $(this).next().addClass('show_model');
      });

      $('a.model_close').click(function () {
        $(this).parent().removeClass('show_model');
      });
    };

    openModel();
  }, []); // Run only once when the component mounts

  const changeCount = (e, value) => {
    e.preventDefault();
    if (value === 'Next') {
      setCount((prevCount) => prevCount + 1);
    } else if (value === 'Prev') {
      setCount((prevCount) => prevCount - 1);
    }
  };

  const menu_close = async (e) => {
    e.preventDefault();
    setTopMenu(!topMenu);
    try {
      const response = await axios.put(
        `${baseURL}/api/profile/settings/SECURITY`,
        { isShortcutVisible: false },
        {
          headers: {
            Authorization: cookie.get('token'),
            'Content-Type': 'application/json'
          }
        }
      );
      toast.success(response?.data?.msg);
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while updating settings');
    }
  };

  return (
    <div className="main_middle">
      {topMenu ? (
        <div className="create_menu">
          <ul>
            <li>
              <Link href="/team/create">
              <a>

                <i className="fa fa-users" aria-hidden="true"></i>
                <p>create a Team </p>
              </a>
              </Link>
            </li>
            <li>
              <Link href="/tour/create">
              <a>
                <i className="fa fa-trophy" aria-hidden="true"></i>
                <p> create a Tournament</p>

              </a>
              </Link>
            </li>
            <li>
              <Link href="#">
              <a>

                <i className="fa fa-comments" aria-hidden="true"></i>
                <p> create a Community </p>
              </a>
              </Link>
            </li>
            <li>
              <Link href="/brand/create">
              <a>

                <i className="fa fa-briefcase" aria-hidden="true"></i>
                <p> create a Brand </p>
              </a>
              </Link>
            </li>
            <li>
              <Link href="/arena/create">
              <a>

                <i className="fa fa-gamepad" aria-hidden="true"></i>
                <p> create an Arena </p>
              </a>
              </Link>
            </li>
            <li>
              <Link href="/company/create">
              <a>

                <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                <p> create a Company </p>
              </a>
              </Link>
            </li>
          </ul>
          <div className="message">
            <h3>The power of Esports tools are in your hands</h3>
            <p>
              Make use of the Help section to learn more to make a better use of
              the plateform
            </p>
          </div>

          <Link href="#" onClick={menu_close} className="close">
            <i className="fa fa-times-circle" aria-hidden="true"></i>
          </Link>
        </div>
      ) : null}

      <form className="write_post" onSubmit={handleSubmit}>
        <div className="team_slider">
          <ul className="user_slider">
            <li>
              <img src={user?.profilePicUrl} alt="" />
            </li>
            {personas.personas?.map((persona, index) => (
              <li key={index}>
                {persona.type === 'team' ? (
                  <img
                    src={
                      persona.teamId != null
                        ? persona.teamId.imgUrl
                        : '/assets/media/dash/user.jpg'
                    }
                    alt=""
                  />
                ) : persona.type === 'tournament' ? (
                  <img src={persona.tournamentId?.imgUrl} alt="" />
                ) : persona.type === 'brand' ? (
                  <img src={persona.brandId?.logoUrl} alt="" />
                ) : persona.type === 'company' ? (
                  <img src={persona.companyId?.logoUrl} alt="" />
                ) : persona.type === 'community' ? (
                  <img src={persona.communityId?.logoUrl} alt="" />
                ) : null}
              </li>
            ))}
          </ul>
          <div
            className="slick-prev slick-arrow"
            onClick={(e) => changeCount(e, 'Prev')}
            disabled={count === -1 ? true : false}
          >
            Prev
          </div>
          <div
            className="slick-next slick-arrow"
            onClick={(e) => changeCount(e, 'Next')}
            disabled={count === personas.personas?.length ? true : false}
          >
            Next
          </div>
        </div>

        <textarea
          placeholder="Write a post"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <div className="right_links">
          <div className="post_img">
            <input
              type="file"
              id="files"
              name="files[]"
              onChange={(e) => setImage(e.target.files[0])}
              accept="image/*"
              multiple
            />
            <label htmlFor="files">
              <span>
                <i className="fa fa-picture-o" aria-hidden="true"></i>
              </span>
            </label>
          </div>

          {/* <a href="#">
            <i className="fa fa-calendar-plus-o" aria-hidden="true"></i>
          </a> */}
          <a href="#!" className="model_show_btn" alt="personal details">
            {showGame.imgUrl ? (
              <img src={showGame.imgUrl} />
            ) : (
              <i className="fa fa-gamepad" aria-hidden="true"></i>
            )}
          </a>
          <div className="common_model_box" id="more_games">
            <a href="#!" className="model_close">
              X
            </a>

            <div className="inner_model_box">
              <h3>All Games</h3>
              <div className="poup_height msScroll_all">
                <ul className="">
                  {allgames &&
                    allgames.map((game, idx) => (
                      <li key={idx}>
                        <div className="game_pic">
                          <a href="#!">
                            <img
                              src={game.imgUrl}
                              alt={game.name}
                              onClick={() => selectgameTag(game)}
                            />
                          </a>
                        </div>
                        <p>{game.name}</p>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
            <div className="overlay"></div>
          </div>
          {/* <a href="#">
            <i className="fa fa-video-camera" aria-hidden="true"></i>
          </a> */}
          <TwitterShareButton
            url={shareUrl}
            title={'Multiplayer - Home of Esports'}
            via={'Multiplayrdotgg'}
            hashtags={['GG #Multiplayr']}
          >
            <i className="fa fa-twitter" aria-hidden="true"></i>
          </TwitterShareButton>
        </div>
        <button className="btn" type="submit" disabled={mutation.isLoading}>
          Submit
        </button>
      </form>

      <ul className="profile_tab_btn three_nav">
        <li className="active">
          <a href="#!" rel="Discover">
            Discover
          </a>
        </li>
        <li>
          <a href="#!" rel="for-you">
            For You
          </a>
        </li>
        <li>
          <a href="#!" rel="Following">
            Following
          </a>
        </li>
      </ul>

      <div className="prfoile_tab_data">
        <div className="tab hide" id="for-you">
          <h3>No Posts Under For You</h3>
        </div>

        <div className="tab hide" id="Following">
          <div>
            <div className="post" style={{ padding: 0 }}>
              {followingPosts.map((post,i) => (
                <AllPosts user={user} post={post} profiledata={profiledata} key={i}/>
              ))}
            </div>
          </div>
        </div>

        <div className="tab" id="Discover">
          <div>
            {posts?.map((post,i) => (
              <AllPosts key={i}
                user={user}
                post={post}
                profiledata={profiledata}
                followData={followData}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignedMainContent;
