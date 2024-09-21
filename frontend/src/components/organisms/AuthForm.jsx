import Input from '../atoms/Input';
import Button from '../atoms/Button';

const AuthForm = ({ isSignIn, toggleForm }) => {
  return (
    <div className="w-full p-8 transition-transform duration-500">
      {isSignIn ? (
        <>
          <h2 className="text-2xl font-bold text-center">Sign in</h2>
          <Input type="email" placeholder="Email" />
          <Input type="password" placeholder="Password" />
          <p className="mt-2 text-center text-gray-500">Forgot your password?</p>
          <Button label="Sign In" />
          <p className="mt-4 text-center">or use your account</p>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-bold text-center">Create Account</h2>
          <Input type="text" placeholder="Name" />
          <Input type="email" placeholder="Email" />
          <Input type="password" placeholder="Password" />
          <Button label="Sign Up" />
          <p className="mt-4 text-center">or use your email for registration</p>
        </>
      )}
      <Button
        label={isSignIn ? 'Sign Up' : 'Sign In'}
        onClick={toggleForm}
        variant="secondary"
      />
    </div>
  );
};

export default AuthForm;
