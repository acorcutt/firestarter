import { sendSignInLinkToEmail, User } from 'firebase/auth';
import { FormEventHandler, useEffect, useState } from 'react';
import { useAuth, defaultAuthSettings } from '../Auth';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLocalSet } from '../Store';

export enum FirestarterLoginStatus {
  Connecting,
  Inputing,
  Submitting,
  Waiting,
  Redirecting,
}

export type FirestarterLoginState = {
  status: FirestarterLoginStatus;
  errors: any;
  currentUser: User | null;
  registerEmail: any;
  submitHandler: FormEventHandler<HTMLFormElement>;
  watchEmail: string;
  stopWaiting: () => void;
};

export type FirestarterLoginInputs = {
  email: string;
};

export function useLogin(): FirestarterLoginState {
  const { currentUser, connected, settings, auth, router } = useAuth();
  const [waiting, setWaiting] = useState(false);
  const setEmailForLogin = useLocalSet('emailForLogin');

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FirestarterLoginInputs>();

  const onSubmit: SubmitHandler<FirestarterLoginInputs> = async ({ email }) => {
    try {
      if (auth) {
        const searchParams = new URLSearchParams(location.search);

        await sendSignInLinkToEmail(auth, email, {
          url: `${location.origin}${settings.verifyPath}?redirect=${encodeURIComponent(String(searchParams.get('redirect') || settings.userPath))}`,
          handleCodeInApp: true,
        });
        setWaiting(true);
        // Save the email locally so you don't need to ask the user for it again if they open the link on the same device.
        setEmailForLogin(email);
      }
    } catch (error) {
      console.error(error);
      setError('email', { type: 'login.failed', message: 'There was an error, check your email and try again.' });
    }
  };

  // If user is authenticated, redirect to the user page
  useEffect(() => {
    if (currentUser) {
      const searchParams = new URLSearchParams(location.search);
      router.replace(searchParams.has('redirect') ? String(searchParams.get('redirect')) : settings.userPath || defaultAuthSettings.userPath);
    }
  }, [currentUser, router, settings.userPath]);

  // Calculate status depending on other states
  const status = !connected
    ? FirestarterLoginStatus.Connecting
    : currentUser
    ? FirestarterLoginStatus.Redirecting
    : waiting
    ? FirestarterLoginStatus.Waiting
    : isSubmitting
    ? FirestarterLoginStatus.Submitting
    : FirestarterLoginStatus.Inputing;

  return {
    status,
    errors,
    currentUser,
    registerEmail: register('email', { required: 'Required' }),
    submitHandler: handleSubmit(onSubmit),
    watchEmail: watch('email'),
    stopWaiting: () => setWaiting(false),
  };
}
