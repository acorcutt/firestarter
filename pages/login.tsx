import { FirestarterLoginStatus, useLogin } from '../lib/auth/login';

export default function LoginPage() {
  const { status, errors, submitHandler, registerEmail, watchEmail, stopWaiting } = useLogin();

  if (status == FirestarterLoginStatus.Connecting) {
    return <div>Connecting...</div>;
  }

  if (status == FirestarterLoginStatus.Redirecting) {
    return <div>Redirecting...</div>;
  }

  if (status == FirestarterLoginStatus.Waiting) {
    return (
      <>
        <h1>Waiting...</h1>
        <p>Verification email sent to: {watchEmail}</p>
        <button onClick={stopWaiting}>Try Again?</button>
      </>
    );
  }

  return (
    <form onSubmit={submitHandler}>
      <h1>Login</h1>
      <input required type="email" className={errors.email ? 'border border-red-500' : 'border'} {...registerEmail} />
      <button type="submit" disabled={status === FirestarterLoginStatus.Submitting}>
        Send
      </button>
      {errors.email && <p className="text-red-500">{errors.email.type}</p>}
    </form>
  );
}
