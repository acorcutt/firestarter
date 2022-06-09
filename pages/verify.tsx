import { FirestarterVerifyStatus, useVerify } from '../lib/auth/verify';

export default function VerifyPage() {
  const { status, errors, submitHandler, registerEmail, watchEmail, stopWaiting } = useVerify();

  if (status == FirestarterVerifyStatus.Connecting) {
    return <div>Connecting...</div>;
  }

  if (status == FirestarterVerifyStatus.Redirecting) {
    return <div>Redirecting...</div>;
  }

  if (status == FirestarterVerifyStatus.Waiting) {
    return (
      <>
        <h1>Waiting...</h1>
        <p>Authenticating: {watchEmail}</p>
        <button onClick={stopWaiting}>Try Again?</button>
      </>
    );
  }

  if (status == FirestarterVerifyStatus.LinkError) {
    return <div>Bad Link {errors.link.type}</div>;
  }

  return (
    <form onSubmit={submitHandler}>
      <h1>Verify</h1>
      <input required type="email" className={errors.email?.type === 'verify.invalidEmail' ? 'border border-red-500' : 'border'} {...registerEmail} />
      <button type="submit" disabled={status === FirestarterVerifyStatus.Submitting}>
        Check
      </button>
      {errors.email && <p className="text-red-500">{errors.email.type}</p>}
    </form>
  );
}
