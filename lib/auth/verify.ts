import { isSignInWithEmailLink, sendSignInLinkToEmail, signInWithEmailLink, User } from 'firebase/auth';
import { FormEventHandler, useEffect, useState } from 'react';
import { useAuth } from '../Auth';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useLocalGet, useLocalSet } from '../Store';

export enum FirestarterVerifyStatus {
  Connecting,
  Inputing,
  Submitting,
  Waiting,
  Redirecting,
  LinkError,
}

export type FirestarterVerifyState = {
  status: FirestarterVerifyStatus;
  errors: any;
  currentUser: User | null;
  registerEmail: any;
  submitHandler: FormEventHandler<HTMLFormElement>;
  watchEmail: string;
  stopWaiting: () => void;
};

export type FirestarterVerifyInputs = {
  link: string;
  email: string;
};

export function useVerify(): FirestarterVerifyState {
  const router = useRouter();
  const { currentUser, connected, settings, auth } = useAuth();
  const [waiting, setWaiting] = useState(true); // Start in waiting state whilst we verify the url
  const getEmailForLogin = useLocalGet('emailForLogin');
  const setEmailForLogin = useLocalSet('emailForLogin');

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FirestarterVerifyInputs>();

  const onSubmit: SubmitHandler<FirestarterVerifyInputs> = ({ email }) => {
    if (auth) {
      console.log('Signing in with email link');
      return signInWithEmailLink(auth, email, location.href)
        .then(() => {
          setWaiting(true);
          setEmailForLogin(null);
        })
        .catch((error) => {
          console.error(error);
          setError('email', { type: 'verify.invalidEmail', message: 'There was an error, check your email and try again.' });
        });
    }
  };

  useEffect(() => {
    // signInWithEmailLink invalidates link once used and fails if run multiple times
    // if running in strict development mode effect runs twice
    // so wait until auth is ready and we dont have a user
    if (auth && connected && !currentUser) {
      console.info('Verify email link');
      if (isSignInWithEmailLink(auth, location.href)) {
        const email = getEmailForLogin();

        if (email) {
          signInWithEmailLink(auth, email, location.href)
            .then(() => {
              // Auth will automatically update users so just set to waiting until we detect it
              setWaiting(true);
              setEmailForLogin(null);
            })
            .catch((error) => {
              setError('link', { type: 'verify.invalidLink', message: 'There was an error, provide your email and try again.' });
              console.error(error);
            });
        } else {
          // No email in storage so show the form
          setWaiting(false);
        }
      } else {
        setWaiting(false);
        setError('link', { type: 'verify.badLink', message: 'There was an error with your verification link.' });
      }
    }
  }, [currentUser, connected, auth, setError, setEmailForLogin, getEmailForLogin]);

  // If user is authenticated, redirect to the user page
  useEffect(() => {
    if (currentUser) {
      router.replace(settings.userPath);
    }
  }, [currentUser, router, settings.userPath]);

  // Calculate status depending on other states
  const status = !connected
    ? FirestarterVerifyStatus.Connecting
    : currentUser
    ? FirestarterVerifyStatus.Redirecting
    : waiting
    ? FirestarterVerifyStatus.Waiting
    : isSubmitting
    ? FirestarterVerifyStatus.Submitting
    : errors.link
    ? FirestarterVerifyStatus.LinkError
    : FirestarterVerifyStatus.Inputing;

  return {
    status,
    errors,
    currentUser,
    registerEmail: register('email', { required: 'Required' }),
    submitHandler: handleSubmit(onSubmit),
    watchEmail: watch('email') || getEmailForLogin(),
    stopWaiting: () => setWaiting(false),
  };
}
