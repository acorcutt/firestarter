import {jsx as $5gcJ2$jsx} from "react/jsx-runtime";
import $5gcJ2$mitt from "mitt";
import {createContext as $5gcJ2$createContext, useState as $5gcJ2$useState, useEffect as $5gcJ2$useEffect, useContext as $5gcJ2$useContext, useCallback as $5gcJ2$useCallback} from "react";
import {onAuthStateChanged as $5gcJ2$onAuthStateChanged, updateProfile as $5gcJ2$updateProfile, sendSignInLinkToEmail as $5gcJ2$sendSignInLinkToEmail, signOut as $5gcJ2$signOut, signInWithEmailLink as $5gcJ2$signInWithEmailLink, isSignInWithEmailLink as $5gcJ2$isSignInWithEmailLink} from "firebase/auth";
import $5gcJ2$fastdeepequales6react from "fast-deep-equal/es6/react";
import $5gcJ2$store2 from "store2";
import $5gcJ2$clsx from "clsx";
import {useForm as $5gcJ2$useForm} from "react-hook-form";
import {useRouter as $5gcJ2$useRouter} from "next/router";
import {refEqual as $5gcJ2$refEqual, onSnapshot as $5gcJ2$onSnapshot, queryEqual as $5gcJ2$queryEqual} from "firebase/firestore";








const $31e53375a4b61e5a$var$defaultSettings = {
    homePath: "/",
    loginPath: "/login",
    logoutPath: "/logout",
    verifyPath: "/verify",
    actionPath: "/action",
    userPath: "/user"
};
const $31e53375a4b61e5a$var$AuthContext = /*#__PURE__*/ (0, $5gcJ2$createContext)({
    currentUser: null,
    connected: false,
    auth: null,
    settings: $31e53375a4b61e5a$var$defaultSettings
});
const $31e53375a4b61e5a$var$emitter = (0, $5gcJ2$mitt)();
function $31e53375a4b61e5a$export$87091915187a1a85({ auth: auth , settings: settings , children: children  }) {
    const [currentUser1, setCurrentUser] = (0, $5gcJ2$useState)(auth.currentUser);
    const [connected, setConnected] = (0, $5gcJ2$useState)(Boolean(auth.currentUser));
    const [update, setUpdate] = (0, $5gcJ2$useState)({});
    function forceUpdate() {
        setUpdate({});
    }
    (0, $5gcJ2$useEffect)(()=>{
        const unsubscribeAuth = (0, $5gcJ2$onAuthStateChanged)(auth, (user)=>{
            setCurrentUser((currentUser)=>{
                // React will not re-render if the setState is the same object
                // So deep check if the user from auth subscription is the same to prevent re-render
                if (!(0, $5gcJ2$fastdeepequales6react)(currentUser, user)) return user;
                else return currentUser;
            });
            setConnected(true);
        });
        return unsubscribeAuth;
    }, [
        auth
    ]);
    (0, $5gcJ2$useEffect)(()=>{
        function onProfileUpdate(user) {
            // Firebase does not mutate user on profile updates so force an update
            if (user === currentUser1) forceUpdate();
        }
        $31e53375a4b61e5a$var$emitter.on("authProfileUpdate", onProfileUpdate);
        return ()=>{
            $31e53375a4b61e5a$var$emitter.off("authProfileUpdate", onProfileUpdate);
        };
    }, [
        currentUser1
    ]);
    const value = {
        auth: auth,
        currentUser: currentUser1,
        connected: connected,
        settings: {
            ...$31e53375a4b61e5a$var$defaultSettings,
            ...settings
        }
    };
    return /*#__PURE__*/ (0, $5gcJ2$jsx)($31e53375a4b61e5a$var$AuthContext.Provider, {
        value: value,
        children: children
    });
}
const $31e53375a4b61e5a$export$4940fe6172660ad2 = $31e53375a4b61e5a$var$AuthContext.Consumer;
function $31e53375a4b61e5a$export$1d39dc5b47e56ff0() {
    return (0, $5gcJ2$useContext)($31e53375a4b61e5a$var$AuthContext);
}
function $31e53375a4b61e5a$export$c92c4ec7a2418617(user, profile) {
    (0, $5gcJ2$updateProfile)(user, profile).then(()=>{
        $31e53375a4b61e5a$var$emitter.emit("authProfileUpdate", user);
    }).catch((error)=>{
        throw error;
    });
}




const $2a05438d4a88cbc9$var$FirestoreContext = /*#__PURE__*/ (0, $5gcJ2$createContext)(null);
function $2a05438d4a88cbc9$export$a5904d1e05b34e56({ firestore: firestore , children: children  }) {
    if (!firestore) throw new Error("FirestoreProvider requires a Firestore instance");
    return /*#__PURE__*/ (0, $5gcJ2$jsx)($2a05438d4a88cbc9$var$FirestoreContext.Provider, {
        value: firestore,
        children: children
    });
}
const $2a05438d4a88cbc9$export$131e06401cc3f40e = $2a05438d4a88cbc9$var$FirestoreContext.Consumer;
function $2a05438d4a88cbc9$export$4062511abc38b7a0() {
    return (0, $5gcJ2$useContext)($2a05438d4a88cbc9$var$FirestoreContext);
}







const $b84ea69f5e5063ac$var$StoreContext = /*#__PURE__*/ (0, $5gcJ2$createContext)({
    store: (0, $5gcJ2$store2),
    defaultValues: {}
});
function $b84ea69f5e5063ac$export$3b5c74f3f11c675d({ namespace: namespace = "firestarter" , defaultValues: defaultValues = {} , children: children  }) {
    console.info("Connect Store: " + namespace);
    const store = (0, $5gcJ2$store2).namespace(namespace);
    const value = {
        store: store,
        defaultValues: defaultValues
    };
    return /*#__PURE__*/ (0, $5gcJ2$jsx)($b84ea69f5e5063ac$var$StoreContext.Provider, {
        value: value,
        children: children
    });
}
const $b84ea69f5e5063ac$export$dc1dba76e930fe57 = $b84ea69f5e5063ac$var$StoreContext.Consumer;
function $b84ea69f5e5063ac$export$6ccbb43953eebf8() {
    return (0, $5gcJ2$useContext)($b84ea69f5e5063ac$var$StoreContext);
}
const $b84ea69f5e5063ac$export$3aaf8e8470cff8cf = {
    local: (0, $5gcJ2$mitt)(),
    session: (0, $5gcJ2$mitt)(),
    page: (0, $5gcJ2$mitt)()
};
function $b84ea69f5e5063ac$var$useStoreState(location, key, defaultValue) {
    const { store: store , defaultValues: defaultValues  } = $b84ea69f5e5063ac$export$6ccbb43953eebf8();
    const [value1, setValue] = (0, $5gcJ2$useState)(defaultValue || defaultValues && defaultValues[key]);
    const [loaded, setLoaded] = (0, $5gcJ2$useState)(false);
    function set(value) {
        store[location].set(key, value);
        $b84ea69f5e5063ac$export$3aaf8e8470cff8cf[location].emit(key, value);
    }
    (0, $5gcJ2$useEffect)(()=>{
        // Must set the value in an effect else the server will never match the client on the 1st render
        setValue(store[location].get(key, defaultValue || defaultValues && defaultValues[key]));
        // You can use the loaded state if you need to wait for the store data
        setLoaded(true);
    }, [
        defaultValue,
        defaultValues,
        key,
        location,
        store
    ]);
    (0, $5gcJ2$useEffect)(()=>{
        function onValueUpdate() {
            setValue(store.get(key, defaultValue));
        }
        $b84ea69f5e5063ac$export$3aaf8e8470cff8cf[location].on(key, onValueUpdate);
        return ()=>{
            $b84ea69f5e5063ac$export$3aaf8e8470cff8cf[location].off(key, onValueUpdate);
        };
    }, [
        defaultValue,
        key,
        location,
        store
    ]);
    return [
        value1,
        set,
        loaded
    ];
}
function $b84ea69f5e5063ac$var$useStoreSetter(location) {
    const { store: store  } = $b84ea69f5e5063ac$export$6ccbb43953eebf8();
    function set(key, value) {
        store[location].set(key, value);
        $b84ea69f5e5063ac$export$3aaf8e8470cff8cf[location].emit(key, value);
    }
    return (0, $5gcJ2$useCallback)(set, [
        location,
        store
    ]);
}
function $b84ea69f5e5063ac$var$useStoreGetter(location) {
    const { store: store  } = $b84ea69f5e5063ac$export$6ccbb43953eebf8();
    function get(key) {
        return store[location].get(key);
    }
    return (0, $5gcJ2$useCallback)(get, [
        location,
        store
    ]);
}
function $b84ea69f5e5063ac$var$useStoreSet(location, key) {
    const { store: store  } = $b84ea69f5e5063ac$export$6ccbb43953eebf8();
    function set(value) {
        store[location].set(key, value);
        $b84ea69f5e5063ac$export$3aaf8e8470cff8cf[location].emit(key, value);
    }
    return (0, $5gcJ2$useCallback)(set, [
        key,
        location,
        store
    ]);
}
function $b84ea69f5e5063ac$var$useStoreGet(location, key) {
    const { store: store  } = $b84ea69f5e5063ac$export$6ccbb43953eebf8();
    function get() {
        return store[location].get(key);
    }
    return (0, $5gcJ2$useCallback)(get, [
        key,
        location,
        store
    ]);
}
function $b84ea69f5e5063ac$export$e4a07dee2868ff9d(key, defaultValue) {
    return $b84ea69f5e5063ac$var$useStoreState("local", key, defaultValue);
}
function $b84ea69f5e5063ac$export$8898ce2744bba29f(key, defaultValue) {
    return $b84ea69f5e5063ac$var$useStoreState("session", key, defaultValue);
}
function $b84ea69f5e5063ac$export$d2bdb7c20492cc5(key, defaultValue) {
    return $b84ea69f5e5063ac$var$useStoreState("page", key, defaultValue);
}
function $b84ea69f5e5063ac$export$fcec27b699cbe3cb() {
    return $b84ea69f5e5063ac$var$useStoreSetter("local");
}
function $b84ea69f5e5063ac$export$482f60fe14e43604() {
    return $b84ea69f5e5063ac$var$useStoreSetter("session");
}
function $b84ea69f5e5063ac$export$ab3ddbfe219eeaf8() {
    return $b84ea69f5e5063ac$var$useStoreSetter("page");
}
function $b84ea69f5e5063ac$export$b5cd09ad5fb9a81e() {
    return $b84ea69f5e5063ac$var$useStoreGetter("local");
}
function $b84ea69f5e5063ac$export$323ab897a042a85() {
    return $b84ea69f5e5063ac$var$useStoreGetter("session");
}
function $b84ea69f5e5063ac$export$6b88622ecf007444() {
    return $b84ea69f5e5063ac$var$useStoreGetter("page");
}
function $b84ea69f5e5063ac$export$3488efe90084f105(key) {
    return $b84ea69f5e5063ac$var$useStoreSet("local", key);
}
function $b84ea69f5e5063ac$export$d9199f9e57bfb22f(key) {
    return $b84ea69f5e5063ac$var$useStoreSet("session", key);
}
function $b84ea69f5e5063ac$export$39eefab393c8c445(key) {
    return $b84ea69f5e5063ac$var$useStoreSet("page", key);
}
function $b84ea69f5e5063ac$export$24aa5f1d0f5ed33b(key) {
    return $b84ea69f5e5063ac$var$useStoreGet("local", key);
}
function $b84ea69f5e5063ac$export$54eeb7ba9d39730c(key) {
    return $b84ea69f5e5063ac$var$useStoreGet("session", key);
}
function $b84ea69f5e5063ac$export$7ecb794d2aec60b9(key) {
    return $b84ea69f5e5063ac$var$useStoreGet("page", key);
}


function $c7abf29a84d20538$export$2e2bcd8739ae039({ defaultStore: defaultStore , firebase: firebase , children: children  }) {
    const { app: app , auth: auth , firestore: firestore  } = firebase;
    let wrapped = children;
    if (firestore) wrapped = /*#__PURE__*/ (0, $5gcJ2$jsx)((0, $2a05438d4a88cbc9$export$a5904d1e05b34e56), {
        firestore: firestore,
        children: wrapped
    });
    if (auth) wrapped = /*#__PURE__*/ (0, $5gcJ2$jsx)((0, $31e53375a4b61e5a$export$87091915187a1a85), {
        auth: auth,
        children: wrapped
    });
    return /*#__PURE__*/ (0, $5gcJ2$jsx)((0, $b84ea69f5e5063ac$export$3b5c74f3f11c675d), {
        namespace: app.name || "firestarter",
        defaultValues: defaultStore,
        children: wrapped
    });
}



var $1b6c2ba4e872a6ac$export$2e2bcd8739ae039 = (0, $5gcJ2$clsx);










let $77d0a25a4f082d11$export$df5bf2b361a69287;
(function(FirestarterLoginStatus1) {
    FirestarterLoginStatus1[FirestarterLoginStatus1["Connecting"] = 0] = "Connecting";
    FirestarterLoginStatus1[FirestarterLoginStatus1["Inputing"] = 1] = "Inputing";
    FirestarterLoginStatus1[FirestarterLoginStatus1["Submitting"] = 2] = "Submitting";
    FirestarterLoginStatus1[FirestarterLoginStatus1["Waiting"] = 3] = "Waiting";
    FirestarterLoginStatus1[FirestarterLoginStatus1["Redirecting"] = 4] = "Redirecting";
})($77d0a25a4f082d11$export$df5bf2b361a69287 || ($77d0a25a4f082d11$export$df5bf2b361a69287 = {}));
function $77d0a25a4f082d11$export$d4e22f05f73ea56b() {
    const router = (0, $5gcJ2$useRouter)();
    const { currentUser: currentUser , connected: connected , settings: settings , auth: auth  } = (0, $31e53375a4b61e5a$export$1d39dc5b47e56ff0)();
    const [waiting, setWaiting] = (0, $5gcJ2$useState)(false);
    const setEmailForLogin = (0, $b84ea69f5e5063ac$export$3488efe90084f105)("emailForLogin");
    const { register: register , handleSubmit: handleSubmit , watch: watch , setError: setError , formState: { errors: errors , isSubmitting: isSubmitting  } ,  } = (0, $5gcJ2$useForm)();
    const onSubmit = async ({ email: email  })=>{
        try {
            if (auth) {
                await (0, $5gcJ2$sendSignInLinkToEmail)(auth, email, {
                    url: `${location.origin}${settings.verifyPath}?redirect=${encodeURIComponent(String(router.query.redirect || settings.userPath))}`,
                    handleCodeInApp: true
                });
                setWaiting(true);
                // Save the email locally so you don't need to ask the user for it again if they open the link on the same device.
                setEmailForLogin(email);
            }
        } catch (error) {
            console.error(error);
            setError("email", {
                type: "login.failed",
                message: "There was an error, check your email and try again."
            });
        }
    };
    // If user is authenticated, redirect to the user page
    (0, $5gcJ2$useEffect)(()=>{
        if (currentUser) router.replace(settings.userPath);
    }, [
        currentUser,
        router,
        settings.userPath
    ]);
    // Calculate status depending on other states
    const status = !connected ? $77d0a25a4f082d11$export$df5bf2b361a69287.Connecting : currentUser ? $77d0a25a4f082d11$export$df5bf2b361a69287.Redirecting : waiting ? $77d0a25a4f082d11$export$df5bf2b361a69287.Waiting : isSubmitting ? $77d0a25a4f082d11$export$df5bf2b361a69287.Submitting : $77d0a25a4f082d11$export$df5bf2b361a69287.Inputing;
    return {
        status: status,
        errors: errors,
        currentUser: currentUser,
        registerEmail: register("email", {
            required: "Required"
        }),
        submitHandler: handleSubmit(onSubmit),
        watchEmail: watch("email"),
        stopWaiting: ()=>setWaiting(false)
    };
}






let $74faa060192d7163$export$fecfa0293f70bc70;
(function(FirestarterLogoutStatus1) {
    FirestarterLogoutStatus1[FirestarterLogoutStatus1["Connecting"] = 0] = "Connecting";
    FirestarterLogoutStatus1[FirestarterLogoutStatus1["Redirecting"] = 1] = "Redirecting";
})($74faa060192d7163$export$fecfa0293f70bc70 || ($74faa060192d7163$export$fecfa0293f70bc70 = {}));
function $74faa060192d7163$export$9a5b97a7aba1a585() {
    const { auth: auth , currentUser: currentUser , settings: settings , connected: connected  } = (0, $31e53375a4b61e5a$export$1d39dc5b47e56ff0)();
    const router = (0, $5gcJ2$useRouter)();
    (0, $5gcJ2$useEffect)(()=>{
        if (auth) (0, $5gcJ2$signOut)(auth);
    }, [
        auth
    ]);
    (0, $5gcJ2$useEffect)(()=>{
        if (connected && !currentUser) router.replace(settings.homePath);
    }, [
        connected,
        currentUser,
        router,
        settings.homePath
    ]);
    return connected ? $74faa060192d7163$export$fecfa0293f70bc70.Redirecting : $74faa060192d7163$export$fecfa0293f70bc70.Connecting;
}








let $1272af629abba37c$export$38b6479fb4ff8855;
(function(FirestarterVerifyStatus1) {
    FirestarterVerifyStatus1[FirestarterVerifyStatus1["Connecting"] = 0] = "Connecting";
    FirestarterVerifyStatus1[FirestarterVerifyStatus1["Inputing"] = 1] = "Inputing";
    FirestarterVerifyStatus1[FirestarterVerifyStatus1["Submitting"] = 2] = "Submitting";
    FirestarterVerifyStatus1[FirestarterVerifyStatus1["Waiting"] = 3] = "Waiting";
    FirestarterVerifyStatus1[FirestarterVerifyStatus1["Redirecting"] = 4] = "Redirecting";
    FirestarterVerifyStatus1[FirestarterVerifyStatus1["LinkError"] = 5] = "LinkError";
})($1272af629abba37c$export$38b6479fb4ff8855 || ($1272af629abba37c$export$38b6479fb4ff8855 = {}));
function $1272af629abba37c$export$9683d0cca3dc3e98() {
    const router = (0, $5gcJ2$useRouter)();
    const { currentUser: currentUser , connected: connected , settings: settings , auth: auth  } = (0, $31e53375a4b61e5a$export$1d39dc5b47e56ff0)();
    const [waiting, setWaiting] = (0, $5gcJ2$useState)(true); // Start in waiting state whilst we verify the url
    const getEmailForLogin = (0, $b84ea69f5e5063ac$export$24aa5f1d0f5ed33b)("emailForLogin");
    const setEmailForLogin = (0, $b84ea69f5e5063ac$export$3488efe90084f105)("emailForLogin");
    const { register: register , handleSubmit: handleSubmit , watch: watch , setError: setError , formState: { errors: errors , isSubmitting: isSubmitting  } ,  } = (0, $5gcJ2$useForm)();
    const onSubmit = ({ email: email  })=>{
        if (auth) {
            console.log("Signing in with email link");
            return (0, $5gcJ2$signInWithEmailLink)(auth, email, location.href).then(()=>{
                setWaiting(true);
                setEmailForLogin(null);
            }).catch((error)=>{
                console.error(error);
                setError("email", {
                    type: "verify.invalidEmail",
                    message: "There was an error, check your email and try again."
                });
            });
        }
    };
    (0, $5gcJ2$useEffect)(()=>{
        // signInWithEmailLink invalidates link once used and fails if run multiple times
        // if running in strict development mode effect runs twice
        // so wait until auth is ready and we dont have a user
        if (auth && connected && !currentUser) {
            console.info("Verify email link");
            if ((0, $5gcJ2$isSignInWithEmailLink)(auth, location.href)) {
                const email = getEmailForLogin();
                if (email) (0, $5gcJ2$signInWithEmailLink)(auth, email, location.href).then(()=>{
                    // Auth will automatically update users so just set to waiting until we detect it
                    setWaiting(true);
                    setEmailForLogin(null);
                }).catch((error)=>{
                    setError("link", {
                        type: "verify.invalidLink",
                        message: "There was an error, provide your email and try again."
                    });
                    console.error(error);
                });
                else // No email in storage so show the form
                setWaiting(false);
            } else {
                setWaiting(false);
                setError("link", {
                    type: "verify.badLink",
                    message: "There was an error with your verification link."
                });
            }
        }
    }, [
        currentUser,
        connected,
        auth,
        setError,
        setEmailForLogin,
        getEmailForLogin
    ]);
    // If user is authenticated, redirect to the user page
    (0, $5gcJ2$useEffect)(()=>{
        if (currentUser) router.replace(settings.userPath);
    }, [
        currentUser,
        router,
        settings.userPath
    ]);
    // Calculate status depending on other states
    const status = !connected ? $1272af629abba37c$export$38b6479fb4ff8855.Connecting : currentUser ? $1272af629abba37c$export$38b6479fb4ff8855.Redirecting : waiting ? $1272af629abba37c$export$38b6479fb4ff8855.Waiting : isSubmitting ? $1272af629abba37c$export$38b6479fb4ff8855.Submitting : errors.link ? $1272af629abba37c$export$38b6479fb4ff8855.LinkError : $1272af629abba37c$export$38b6479fb4ff8855.Inputing;
    return {
        status: status,
        errors: errors,
        currentUser: currentUser,
        registerEmail: register("email", {
            required: "Required"
        }),
        submitHandler: handleSubmit(onSubmit),
        watchEmail: watch("email") || getEmailForLogin(),
        stopWaiting: ()=>setWaiting(false)
    };
}







function $2f32de2c34a357fd$export$2e2bcd8739ae039(state, compareFn = (0, $5gcJ2$fastdeepequales6react), warn = false) {
    const [cachedState, setCachedState] = (0, $5gcJ2$useState)(state);
    (0, $5gcJ2$useEffect)(()=>{
        if ((!state || !cachedState) && state !== cachedState) setCachedState(state);
        else if (!compareFn(state, cachedState)) setCachedState(state);
        else if (state !== cachedState) // Warn that identical mutating state was provided
        {
            if (warn) console.warn("Mutating State", state, cachedState);
        }
    }, [
        state,
        cachedState,
        compareFn,
        warn
    ]);
    return cachedState;
}


function $3700b8c4230d3bcf$export$2e2bcd8739ae039(docRef, options) {
    // You really should not be sending in mutating objects but handle them if they are
    const docMemo = (0, $2f32de2c34a357fd$export$2e2bcd8739ae039)(docRef, (0, $5gcJ2$refEqual));
    const optionsMemo = (0, $2f32de2c34a357fd$export$2e2bcd8739ae039)(options);
    const [snapshot1, setSnapshot] = (0, $5gcJ2$useState)(null);
    (0, $5gcJ2$useEffect)(()=>{
        if (docMemo) {
            const unsubscribe = (0, $5gcJ2$onSnapshot)(docMemo, optionsMemo || {}, (snapshot)=>{
                setSnapshot(snapshot);
            }, (error)=>{
                console.error(error);
                throw error;
            });
            return ()=>{
                unsubscribe();
            };
        } else setSnapshot(null);
    }, [
        docMemo,
        optionsMemo
    ]);
    return snapshot1;
}





function $6112b8ed9e42f083$export$2e2bcd8739ae039(query, options) {
    // You really should not be sending in mutating objects but handle them if they are
    const queryMemo = (0, $2f32de2c34a357fd$export$2e2bcd8739ae039)(query, (0, $5gcJ2$queryEqual));
    const optionsMemo = (0, $2f32de2c34a357fd$export$2e2bcd8739ae039)(options);
    const [snapshot1, setSnapshot] = (0, $5gcJ2$useState)(null);
    (0, $5gcJ2$useEffect)(()=>{
        if (queryMemo) {
            const unsubscribe = (0, $5gcJ2$onSnapshot)(queryMemo, optionsMemo || {}, (snapshot)=>{
                setSnapshot(snapshot);
            }, (error)=>{
                console.error(error);
                throw error;
            });
            return unsubscribe;
        } else setSnapshot(null);
    }, [
        optionsMemo,
        queryMemo
    ]);
    return snapshot1;
}





export {$c7abf29a84d20538$export$2e2bcd8739ae039 as Firestarter, $1b6c2ba4e872a6ac$export$2e2bcd8739ae039 as cx, $b84ea69f5e5063ac$export$3b5c74f3f11c675d as StoreProvider, $b84ea69f5e5063ac$export$6ccbb43953eebf8 as useStore, $b84ea69f5e5063ac$export$e4a07dee2868ff9d as useLocalState, $b84ea69f5e5063ac$export$d2bdb7c20492cc5 as usePageState, $b84ea69f5e5063ac$export$8898ce2744bba29f as useSessionState, $b84ea69f5e5063ac$export$fcec27b699cbe3cb as useLocalSetter, $b84ea69f5e5063ac$export$ab3ddbfe219eeaf8 as usePageSetter, $b84ea69f5e5063ac$export$482f60fe14e43604 as useSessionSetter, $b84ea69f5e5063ac$export$b5cd09ad5fb9a81e as useLocalGetter, $b84ea69f5e5063ac$export$6b88622ecf007444 as usePageGetter, $b84ea69f5e5063ac$export$323ab897a042a85 as useSessionGetter, $b84ea69f5e5063ac$export$3488efe90084f105 as useLocalSet, $b84ea69f5e5063ac$export$39eefab393c8c445 as usePageSet, $b84ea69f5e5063ac$export$d9199f9e57bfb22f as useSessionSet, $b84ea69f5e5063ac$export$24aa5f1d0f5ed33b as useLocalGet, $b84ea69f5e5063ac$export$7ecb794d2aec60b9 as usePageGet, $b84ea69f5e5063ac$export$54eeb7ba9d39730c as useSessionGet, $b84ea69f5e5063ac$export$3aaf8e8470cff8cf as storeEmitters, $31e53375a4b61e5a$export$87091915187a1a85 as AuthProvider, $31e53375a4b61e5a$export$1d39dc5b47e56ff0 as useAuth, $31e53375a4b61e5a$export$c92c4ec7a2418617 as updateUserProfile, $77d0a25a4f082d11$export$d4e22f05f73ea56b as useLogin, $74faa060192d7163$export$9a5b97a7aba1a585 as useLogout, $1272af629abba37c$export$9683d0cca3dc3e98 as useVerify, $2a05438d4a88cbc9$export$a5904d1e05b34e56 as FirestoreProvider, $2a05438d4a88cbc9$export$4062511abc38b7a0 as useFirestore, $3700b8c4230d3bcf$export$2e2bcd8739ae039 as useDocumentSnapshot, $6112b8ed9e42f083$export$2e2bcd8739ae039 as useQuerySnapshot, $2f32de2c34a357fd$export$2e2bcd8739ae039 as useMemoState};
//# sourceMappingURL=module.js.map
