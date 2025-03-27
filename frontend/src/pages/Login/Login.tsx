import LoginForm from '@/pages/Login/LoginForm';
import iconImage from '../../assets/icon.svg';

const Login = () => {
  return (
    <div className="flex min-h-screen">
      {/* Left half - Icon/Logo section */}
      <div className="hidden md:flex md:w-3/5 bg-[#fafafa] flex-col items-center justify-center p-8">
        <div className="relative w-full aspect-square max-w-xs mx-auto">
          <div className="absolute inset-0 rounded-full bg-[#ffffff]"></div>
          <img
            src={iconImage}
            alt="logo"
            className="absolute w-3/4 h-3/4 object-contain top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          />
        </div>
      </div>

      {/* Right half - Login Form */}
      <div className="w-full md:w-2/5 flex items-center justify-center p-4 md:p-8 bg-background">
        <div className="w-full max-w-md p-6">
          <h1 className="text-2xl font-bold text-left mb-6">로그인</h1>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
