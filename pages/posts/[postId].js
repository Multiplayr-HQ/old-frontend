import MetaDash from '@components/MetaDash';
import SignedHeader from '@components/SignedHeader';
import LeftNav from '@components/LeftNav';
import AllScript from '../AllScript';
import RightSection from '@components/dashboard/RightSection';
import baseURL from '@utils/baseURL';
import ReactTooltip from 'react-tooltip';
import LikePost from '@components/postLikes/LikePost';
import CustomPost from '@components/dashboard/CustomPost';
import CommentForm from '@components/comments/CommentForm';
import AllPosts from '../../components/dashboard/AllPosts';

const PostId = ({ user, profile, post, teams }) => {
  return (
    <>
      <MetaDash />
      <SignedHeader user={user} profile={profile} />
      <LeftNav user={user} />

      <div className="prfoile_tab_data">
        <div className="tab" id="feed">
          <div className="flex-1 justify-center items-center mt-10 mx-[25%]">
            {' '}
            <AllPosts post={post} user={user} />
          </div>
        </div>
      </div>

      {/* <RightSection user={user} profile={profile} teams={teams} /> */}

      <AllScript />
    </>
  );
};

export const getServerSideProps = async (context) => {
  const { postId } = context.params;

  const response = await fetch(`${baseURL}/api/posts/${postId}`);
  const post = await response.json();

  return {
    props: { post }
  };
};

export default PostId;
