import defaultProfile from '../../../assets/defaultProfile.svg';

const Profile = () => {
  return (
    <div className="w-full px-6 py-4">
      <div className="flex flex-row items-center gap-x-4 justify-center">
        <div className="flex flex-col flex-1 gap-y-0.5">
          <div className="block break-words text-2xl font-extrabold">
            손세빈
          </div>
          <div className="relative text-[15px]">sebin_son</div>
        </div>
        <div>
          <img
            className="rounded-full w-[5.25rem]"
            src={defaultProfile}
            alt="myProfile"
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
