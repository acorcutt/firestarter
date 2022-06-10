var $b5R2n$reactjsxruntime = require("react/jsx-runtime");
var $b5R2n$mitt = require("mitt");
var $b5R2n$react = require("react");
var $b5R2n$firebaseauth = require("firebase/auth");
var $b5R2n$fastdeepequales6react = require("fast-deep-equal/es6/react");
var $b5R2n$store2 = require("store2");
var $b5R2n$clsx = require("clsx");
var $b5R2n$firebaseapp = require("firebase/app");
var $b5R2n$firebasefirestore = require("firebase/firestore");
var $b5R2n$firebasestorage = require("firebase/storage");
var $b5R2n$firebasefunctions = require("firebase/functions");
var $b5R2n$reacthookform = require("react-hook-form");
var $b5R2n$nextrouter = require("next/router");

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}

$parcel$export(module.exports, "Firestarter", () => $57ac30262d77fa27$export$2e2bcd8739ae039);
$parcel$export(module.exports, "cx", () => $0645f71fc70da221$export$2e2bcd8739ae039);
$parcel$export(module.exports, "getFirebase", () => $04f312a4f905e9c6$export$7a667d08ed65fa47);
$parcel$export(module.exports, "StoreProvider", () => $1519c5e2f74ac89b$export$3b5c74f3f11c675d);
$parcel$export(module.exports, "useStore", () => $1519c5e2f74ac89b$export$6ccbb43953eebf8);
$parcel$export(module.exports, "useLocalState", () => $1519c5e2f74ac89b$export$e4a07dee2868ff9d);
$parcel$export(module.exports, "usePageState", () => $1519c5e2f74ac89b$export$d2bdb7c20492cc5);
$parcel$export(module.exports, "useSessionState", () => $1519c5e2f74ac89b$export$8898ce2744bba29f);
$parcel$export(module.exports, "useLocalSetter", () => $1519c5e2f74ac89b$export$fcec27b699cbe3cb);
$parcel$export(module.exports, "usePageSetter", () => $1519c5e2f74ac89b$export$ab3ddbfe219eeaf8);
$parcel$export(module.exports, "useSessionSetter", () => $1519c5e2f74ac89b$export$482f60fe14e43604);
$parcel$export(module.exports, "useLocalGetter", () => $1519c5e2f74ac89b$export$b5cd09ad5fb9a81e);
$parcel$export(module.exports, "usePageGetter", () => $1519c5e2f74ac89b$export$6b88622ecf007444);
$parcel$export(module.exports, "useSessionGetter", () => $1519c5e2f74ac89b$export$323ab897a042a85);
$parcel$export(module.exports, "useLocalSet", () => $1519c5e2f74ac89b$export$3488efe90084f105);
$parcel$export(module.exports, "usePageSet", () => $1519c5e2f74ac89b$export$39eefab393c8c445);
$parcel$export(module.exports, "useSessionSet", () => $1519c5e2f74ac89b$export$d9199f9e57bfb22f);
$parcel$export(module.exports, "useLocalGet", () => $1519c5e2f74ac89b$export$24aa5f1d0f5ed33b);
$parcel$export(module.exports, "usePageGet", () => $1519c5e2f74ac89b$export$7ecb794d2aec60b9);
$parcel$export(module.exports, "useSessionGet", () => $1519c5e2f74ac89b$export$54eeb7ba9d39730c);
$parcel$export(module.exports, "storeEmitters", () => $1519c5e2f74ac89b$export$3aaf8e8470cff8cf);
$parcel$export(module.exports, "AuthProvider", () => $60703c602d9dcdb8$export$87091915187a1a85);
$parcel$export(module.exports, "useAuth", () => $60703c602d9dcdb8$export$1d39dc5b47e56ff0);
$parcel$export(module.exports, "updateUserProfile", () => $60703c602d9dcdb8$export$c92c4ec7a2418617);
$parcel$export(module.exports, "useLogin", () => $332b295cfea79b54$export$d4e22f05f73ea56b);
$parcel$export(module.exports, "useLogout", () => $26dda69b2061c0f6$export$9a5b97a7aba1a585);
$parcel$export(module.exports, "useVerify", () => $ee59c5e24a14a93f$export$9683d0cca3dc3e98);
$parcel$export(module.exports, "FirestoreProvider", () => $fa317698e9a11cea$export$a5904d1e05b34e56);
$parcel$export(module.exports, "useFirestore", () => $fa317698e9a11cea$export$4062511abc38b7a0);
$parcel$export(module.exports, "useDocumentSnapshot", () => $d63f6c641f7e60ab$export$2e2bcd8739ae039);
$parcel$export(module.exports, "useQuerySnapshot", () => $6d4e46e5e278cd03$export$2e2bcd8739ae039);
$parcel$export(module.exports, "useMemoState", () => $a7b5de690a5e460e$export$2e2bcd8739ae039);







const $60703c602d9dcdb8$export$6387722de17399a7 = {
    homePath: "/",
    loginPath: "/login",
    logoutPath: "/logout",
    verifyPath: "/verify",
    actionPath: "/action",
    userPath: "/user"
};
const $60703c602d9dcdb8$var$AuthContext = /*#__PURE__*/ (0, $b5R2n$react.createContext)({
    currentUser: null,
    connected: false,
    auth: null,
    settings: $60703c602d9dcdb8$export$6387722de17399a7
});
const $60703c602d9dcdb8$var$emitter = (0, ($parcel$interopDefault($b5R2n$mitt)))();
function $60703c602d9dcdb8$export$87091915187a1a85({ auth: auth , settings: settings , children: children  }) {
    const [currentUser1, setCurrentUser] = (0, $b5R2n$react.useState)(auth.currentUser);
    const [connected, setConnected] = (0, $b5R2n$react.useState)(Boolean(auth.currentUser));
    const [update, setUpdate] = (0, $b5R2n$react.useState)({});
    function forceUpdate() {
        setUpdate({});
    }
    (0, $b5R2n$react.useEffect)(()=>{
        const unsubscribeAuth = (0, $b5R2n$firebaseauth.onAuthStateChanged)(auth, (user)=>{
            setCurrentUser((currentUser)=>{
                // React will not re-render if the setState is the same object
                // So deep check if the user from auth subscription is the same to prevent re-render
                if (!(0, ($parcel$interopDefault($b5R2n$fastdeepequales6react)))(currentUser, user)) return user;
                else return currentUser;
            });
            setConnected(true);
        });
        return unsubscribeAuth;
    }, [
        auth
    ]);
    (0, $b5R2n$react.useEffect)(()=>{
        function onProfileUpdate(user) {
            // Firebase does not mutate user on profile updates so force an update
            if (user === currentUser1) forceUpdate();
        }
        $60703c602d9dcdb8$var$emitter.on("authProfileUpdate", onProfileUpdate);
        return ()=>{
            $60703c602d9dcdb8$var$emitter.off("authProfileUpdate", onProfileUpdate);
        };
    }, [
        currentUser1
    ]);
    const value = {
        auth: auth,
        currentUser: currentUser1,
        connected: connected,
        settings: {
            ...$60703c602d9dcdb8$export$6387722de17399a7,
            ...settings
        }
    };
    return /*#__PURE__*/ (0, $b5R2n$reactjsxruntime.jsx)($60703c602d9dcdb8$var$AuthContext.Provider, {
        value: value,
        children: children
    });
}
const $60703c602d9dcdb8$export$4940fe6172660ad2 = $60703c602d9dcdb8$var$AuthContext.Consumer;
function $60703c602d9dcdb8$export$1d39dc5b47e56ff0() {
    return (0, $b5R2n$react.useContext)($60703c602d9dcdb8$var$AuthContext);
}
function $60703c602d9dcdb8$export$c92c4ec7a2418617(user, profile) {
    (0, $b5R2n$firebaseauth.updateProfile)(user, profile).then(()=>{
        $60703c602d9dcdb8$var$emitter.emit("authProfileUpdate", user);
    }).catch((error)=>{
        throw error;
    });
}




const $fa317698e9a11cea$var$FirestoreContext = /*#__PURE__*/ (0, $b5R2n$react.createContext)(null);
function $fa317698e9a11cea$export$a5904d1e05b34e56({ firestore: firestore , children: children  }) {
    if (!firestore) throw new Error("FirestoreProvider requires a Firestore instance");
    return /*#__PURE__*/ (0, $b5R2n$reactjsxruntime.jsx)($fa317698e9a11cea$var$FirestoreContext.Provider, {
        value: firestore,
        children: children
    });
}
const $fa317698e9a11cea$export$131e06401cc3f40e = $fa317698e9a11cea$var$FirestoreContext.Consumer;
function $fa317698e9a11cea$export$4062511abc38b7a0() {
    return (0, $b5R2n$react.useContext)($fa317698e9a11cea$var$FirestoreContext);
}







const $1519c5e2f74ac89b$var$StoreContext = /*#__PURE__*/ (0, $b5R2n$react.createContext)({
    store: (0, ($parcel$interopDefault($b5R2n$store2))),
    defaultValues: {}
});
function $1519c5e2f74ac89b$export$3b5c74f3f11c675d({ namespace: namespace = "firestarter" , defaultValues: defaultValues = {} , children: children  }) {
    console.info("Connect Store: " + namespace);
    const store = (0, ($parcel$interopDefault($b5R2n$store2))).namespace(namespace);
    const value = {
        store: store,
        defaultValues: defaultValues
    };
    return /*#__PURE__*/ (0, $b5R2n$reactjsxruntime.jsx)($1519c5e2f74ac89b$var$StoreContext.Provider, {
        value: value,
        children: children
    });
}
const $1519c5e2f74ac89b$export$dc1dba76e930fe57 = $1519c5e2f74ac89b$var$StoreContext.Consumer;
function $1519c5e2f74ac89b$export$6ccbb43953eebf8() {
    return (0, $b5R2n$react.useContext)($1519c5e2f74ac89b$var$StoreContext);
}
const $1519c5e2f74ac89b$export$3aaf8e8470cff8cf = {
    local: (0, ($parcel$interopDefault($b5R2n$mitt)))(),
    session: (0, ($parcel$interopDefault($b5R2n$mitt)))(),
    page: (0, ($parcel$interopDefault($b5R2n$mitt)))()
};
function $1519c5e2f74ac89b$var$useStoreState(location, key, defaultValue) {
    const { store: store , defaultValues: defaultValues  } = $1519c5e2f74ac89b$export$6ccbb43953eebf8();
    const [value1, setValue] = (0, $b5R2n$react.useState)(defaultValue || defaultValues && defaultValues[key]);
    const [loaded, setLoaded] = (0, $b5R2n$react.useState)(false);
    function set(value) {
        store[location].set(key, value);
        $1519c5e2f74ac89b$export$3aaf8e8470cff8cf[location].emit(key, value);
    }
    (0, $b5R2n$react.useEffect)(()=>{
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
    (0, $b5R2n$react.useEffect)(()=>{
        function onValueUpdate() {
            setValue(store.get(key, defaultValue));
        }
        $1519c5e2f74ac89b$export$3aaf8e8470cff8cf[location].on(key, onValueUpdate);
        return ()=>{
            $1519c5e2f74ac89b$export$3aaf8e8470cff8cf[location].off(key, onValueUpdate);
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
function $1519c5e2f74ac89b$var$useStoreSetter(location) {
    const { store: store  } = $1519c5e2f74ac89b$export$6ccbb43953eebf8();
    function set(key, value) {
        store[location].set(key, value);
        $1519c5e2f74ac89b$export$3aaf8e8470cff8cf[location].emit(key, value);
    }
    return (0, $b5R2n$react.useCallback)(set, [
        location,
        store
    ]);
}
function $1519c5e2f74ac89b$var$useStoreGetter(location) {
    const { store: store  } = $1519c5e2f74ac89b$export$6ccbb43953eebf8();
    function get(key) {
        return store[location].get(key);
    }
    return (0, $b5R2n$react.useCallback)(get, [
        location,
        store
    ]);
}
function $1519c5e2f74ac89b$var$useStoreSet(location, key) {
    const { store: store  } = $1519c5e2f74ac89b$export$6ccbb43953eebf8();
    function set(value) {
        store[location].set(key, value);
        $1519c5e2f74ac89b$export$3aaf8e8470cff8cf[location].emit(key, value);
    }
    return (0, $b5R2n$react.useCallback)(set, [
        key,
        location,
        store
    ]);
}
function $1519c5e2f74ac89b$var$useStoreGet(location, key) {
    const { store: store  } = $1519c5e2f74ac89b$export$6ccbb43953eebf8();
    function get() {
        return store[location].get(key);
    }
    return (0, $b5R2n$react.useCallback)(get, [
        key,
        location,
        store
    ]);
}
function $1519c5e2f74ac89b$export$e4a07dee2868ff9d(key, defaultValue) {
    return $1519c5e2f74ac89b$var$useStoreState("local", key, defaultValue);
}
function $1519c5e2f74ac89b$export$8898ce2744bba29f(key, defaultValue) {
    return $1519c5e2f74ac89b$var$useStoreState("session", key, defaultValue);
}
function $1519c5e2f74ac89b$export$d2bdb7c20492cc5(key, defaultValue) {
    return $1519c5e2f74ac89b$var$useStoreState("page", key, defaultValue);
}
function $1519c5e2f74ac89b$export$fcec27b699cbe3cb() {
    return $1519c5e2f74ac89b$var$useStoreSetter("local");
}
function $1519c5e2f74ac89b$export$482f60fe14e43604() {
    return $1519c5e2f74ac89b$var$useStoreSetter("session");
}
function $1519c5e2f74ac89b$export$ab3ddbfe219eeaf8() {
    return $1519c5e2f74ac89b$var$useStoreSetter("page");
}
function $1519c5e2f74ac89b$export$b5cd09ad5fb9a81e() {
    return $1519c5e2f74ac89b$var$useStoreGetter("local");
}
function $1519c5e2f74ac89b$export$323ab897a042a85() {
    return $1519c5e2f74ac89b$var$useStoreGetter("session");
}
function $1519c5e2f74ac89b$export$6b88622ecf007444() {
    return $1519c5e2f74ac89b$var$useStoreGetter("page");
}
function $1519c5e2f74ac89b$export$3488efe90084f105(key) {
    return $1519c5e2f74ac89b$var$useStoreSet("local", key);
}
function $1519c5e2f74ac89b$export$d9199f9e57bfb22f(key) {
    return $1519c5e2f74ac89b$var$useStoreSet("session", key);
}
function $1519c5e2f74ac89b$export$39eefab393c8c445(key) {
    return $1519c5e2f74ac89b$var$useStoreSet("page", key);
}
function $1519c5e2f74ac89b$export$24aa5f1d0f5ed33b(key) {
    return $1519c5e2f74ac89b$var$useStoreGet("local", key);
}
function $1519c5e2f74ac89b$export$54eeb7ba9d39730c(key) {
    return $1519c5e2f74ac89b$var$useStoreGet("session", key);
}
function $1519c5e2f74ac89b$export$7ecb794d2aec60b9(key) {
    return $1519c5e2f74ac89b$var$useStoreGet("page", key);
}


function $57ac30262d77fa27$export$2e2bcd8739ae039({ defaultStore: defaultStore , firebase: firebase , settings: settings , children: children  }) {
    const { app: app , auth: auth , firestore: firestore  } = firebase;
    let wrapped = children;
    if (firestore) wrapped = /*#__PURE__*/ (0, $b5R2n$reactjsxruntime.jsx)((0, $fa317698e9a11cea$export$a5904d1e05b34e56), {
        firestore: firestore,
        children: wrapped
    });
    if (auth) wrapped = /*#__PURE__*/ (0, $b5R2n$reactjsxruntime.jsx)((0, $60703c602d9dcdb8$export$87091915187a1a85), {
        auth: auth,
        settings: settings?.auth,
        children: wrapped
    });
    return /*#__PURE__*/ (0, $b5R2n$reactjsxruntime.jsx)((0, $1519c5e2f74ac89b$export$3b5c74f3f11c675d), {
        namespace: app.name || "firestarter",
        defaultValues: defaultStore,
        children: wrapped
    });
}



var $0645f71fc70da221$export$2e2bcd8739ae039 = (0, ($parcel$interopDefault($b5R2n$clsx)));







let $04f312a4f905e9c6$var$app, $04f312a4f905e9c6$var$firestore, $04f312a4f905e9c6$var$auth, $04f312a4f905e9c6$var$storage, $04f312a4f905e9c6$var$functions;
function $04f312a4f905e9c6$export$7a667d08ed65fa47(config, emulators) {
    try {
        // This will throw an error if app is not initialized
        $04f312a4f905e9c6$var$app = (0, $b5R2n$firebaseapp.getApp)(config.projectId || "firestarter");
        $04f312a4f905e9c6$var$firestore = (0, $b5R2n$firebasefirestore.getFirestore)($04f312a4f905e9c6$var$app);
        $04f312a4f905e9c6$var$auth = (0, $b5R2n$firebaseauth.getAuth)($04f312a4f905e9c6$var$app);
        $04f312a4f905e9c6$var$storage = (0, $b5R2n$firebasestorage.getStorage)($04f312a4f905e9c6$var$app);
        $04f312a4f905e9c6$var$functions = (0, $b5R2n$firebasefunctions.getFunctions)($04f312a4f905e9c6$var$app);
        console.log("Firebase Connected");
    } catch (_) {
        // Initialize Firebase once to prevent errors
        $04f312a4f905e9c6$var$app = (0, $b5R2n$firebaseapp.initializeApp)(config, config.projectId || "firestarter");
        $04f312a4f905e9c6$var$firestore = (0, $b5R2n$firebasefirestore.getFirestore)($04f312a4f905e9c6$var$app);
        $04f312a4f905e9c6$var$auth = (0, $b5R2n$firebaseauth.getAuth)($04f312a4f905e9c6$var$app);
        $04f312a4f905e9c6$var$storage = (0, $b5R2n$firebasestorage.getStorage)($04f312a4f905e9c6$var$app);
        $04f312a4f905e9c6$var$functions = (0, $b5R2n$firebasefunctions.getFunctions)($04f312a4f905e9c6$var$app);
        console.log("Firebase Initialized");
        if (emulators) {
            emulators.firestore && (0, $b5R2n$firebasefirestore.connectFirestoreEmulator)($04f312a4f905e9c6$var$firestore, emulators.firestore.host || "localhost", emulators.firestore.port || 8080);
            emulators.auth && (0, $b5R2n$firebaseauth.connectAuthEmulator)($04f312a4f905e9c6$var$auth, `http://${emulators.auth.host || "localhost"}:${emulators.auth.port || 9099}`);
            emulators.storage && (0, $b5R2n$firebasestorage.connectStorageEmulator)($04f312a4f905e9c6$var$storage, emulators.storage.host || "localhost", emulators.storage.port || 9199);
            emulators.functions && (0, $b5R2n$firebasefunctions.connectFunctionsEmulator)($04f312a4f905e9c6$var$functions, emulators.functions.host || "localhost", emulators.functions.port || 5001);
            console.log("Firebase Emulation is enabled");
        }
    }
    return {
        app: $04f312a4f905e9c6$var$app,
        firestore: $04f312a4f905e9c6$var$firestore,
        auth: $04f312a4f905e9c6$var$auth,
        storage: $04f312a4f905e9c6$var$storage,
        functions: $04f312a4f905e9c6$var$functions
    };
}










let $332b295cfea79b54$export$df5bf2b361a69287;
(function(FirestarterLoginStatus1) {
    FirestarterLoginStatus1[FirestarterLoginStatus1["Connecting"] = 0] = "Connecting";
    FirestarterLoginStatus1[FirestarterLoginStatus1["Inputing"] = 1] = "Inputing";
    FirestarterLoginStatus1[FirestarterLoginStatus1["Submitting"] = 2] = "Submitting";
    FirestarterLoginStatus1[FirestarterLoginStatus1["Waiting"] = 3] = "Waiting";
    FirestarterLoginStatus1[FirestarterLoginStatus1["Redirecting"] = 4] = "Redirecting";
})($332b295cfea79b54$export$df5bf2b361a69287 || ($332b295cfea79b54$export$df5bf2b361a69287 = {}));
function $332b295cfea79b54$export$d4e22f05f73ea56b() {
    const router = (0, $b5R2n$nextrouter.useRouter)();
    const { currentUser: currentUser , connected: connected , settings: settings , auth: auth  } = (0, $60703c602d9dcdb8$export$1d39dc5b47e56ff0)();
    const [waiting, setWaiting] = (0, $b5R2n$react.useState)(false);
    const setEmailForLogin = (0, $1519c5e2f74ac89b$export$3488efe90084f105)("emailForLogin");
    const { register: register , handleSubmit: handleSubmit , watch: watch , setError: setError , formState: { errors: errors , isSubmitting: isSubmitting  } ,  } = (0, $b5R2n$reacthookform.useForm)();
    const onSubmit = async ({ email: email  })=>{
        try {
            if (auth) {
                await (0, $b5R2n$firebaseauth.sendSignInLinkToEmail)(auth, email, {
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
    (0, $b5R2n$react.useEffect)(()=>{
        if (currentUser) router.replace(settings.userPath || (0, $60703c602d9dcdb8$export$6387722de17399a7).userPath);
    }, [
        currentUser,
        router,
        settings.userPath
    ]);
    // Calculate status depending on other states
    const status = !connected ? $332b295cfea79b54$export$df5bf2b361a69287.Connecting : currentUser ? $332b295cfea79b54$export$df5bf2b361a69287.Redirecting : waiting ? $332b295cfea79b54$export$df5bf2b361a69287.Waiting : isSubmitting ? $332b295cfea79b54$export$df5bf2b361a69287.Submitting : $332b295cfea79b54$export$df5bf2b361a69287.Inputing;
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






let $26dda69b2061c0f6$export$fecfa0293f70bc70;
(function(FirestarterLogoutStatus1) {
    FirestarterLogoutStatus1[FirestarterLogoutStatus1["Connecting"] = 0] = "Connecting";
    FirestarterLogoutStatus1[FirestarterLogoutStatus1["Redirecting"] = 1] = "Redirecting";
})($26dda69b2061c0f6$export$fecfa0293f70bc70 || ($26dda69b2061c0f6$export$fecfa0293f70bc70 = {}));
function $26dda69b2061c0f6$export$9a5b97a7aba1a585() {
    const { auth: auth , currentUser: currentUser , settings: settings , connected: connected  } = (0, $60703c602d9dcdb8$export$1d39dc5b47e56ff0)();
    const router = (0, $b5R2n$nextrouter.useRouter)();
    (0, $b5R2n$react.useEffect)(()=>{
        if (auth) (0, $b5R2n$firebaseauth.signOut)(auth);
    }, [
        auth
    ]);
    (0, $b5R2n$react.useEffect)(()=>{
        if (connected && !currentUser) router.replace(settings.homePath || (0, $60703c602d9dcdb8$export$6387722de17399a7).homePath);
    }, [
        connected,
        currentUser,
        router,
        settings.homePath
    ]);
    return connected ? $26dda69b2061c0f6$export$fecfa0293f70bc70.Redirecting : $26dda69b2061c0f6$export$fecfa0293f70bc70.Connecting;
}








let $ee59c5e24a14a93f$export$38b6479fb4ff8855;
(function(FirestarterVerifyStatus1) {
    FirestarterVerifyStatus1[FirestarterVerifyStatus1["Connecting"] = 0] = "Connecting";
    FirestarterVerifyStatus1[FirestarterVerifyStatus1["Inputing"] = 1] = "Inputing";
    FirestarterVerifyStatus1[FirestarterVerifyStatus1["Submitting"] = 2] = "Submitting";
    FirestarterVerifyStatus1[FirestarterVerifyStatus1["Waiting"] = 3] = "Waiting";
    FirestarterVerifyStatus1[FirestarterVerifyStatus1["Redirecting"] = 4] = "Redirecting";
    FirestarterVerifyStatus1[FirestarterVerifyStatus1["LinkError"] = 5] = "LinkError";
})($ee59c5e24a14a93f$export$38b6479fb4ff8855 || ($ee59c5e24a14a93f$export$38b6479fb4ff8855 = {}));
function $ee59c5e24a14a93f$export$9683d0cca3dc3e98() {
    const router = (0, $b5R2n$nextrouter.useRouter)();
    const { currentUser: currentUser , connected: connected , settings: settings , auth: auth  } = (0, $60703c602d9dcdb8$export$1d39dc5b47e56ff0)();
    const [waiting, setWaiting] = (0, $b5R2n$react.useState)(true); // Start in waiting state whilst we verify the url
    const getEmailForLogin = (0, $1519c5e2f74ac89b$export$24aa5f1d0f5ed33b)("emailForLogin");
    const setEmailForLogin = (0, $1519c5e2f74ac89b$export$3488efe90084f105)("emailForLogin");
    const { register: register , handleSubmit: handleSubmit , watch: watch , setError: setError , formState: { errors: errors , isSubmitting: isSubmitting  } ,  } = (0, $b5R2n$reacthookform.useForm)();
    const onSubmit = ({ email: email  })=>{
        if (auth) {
            console.log("Signing in with email link");
            return (0, $b5R2n$firebaseauth.signInWithEmailLink)(auth, email, location.href).then(()=>{
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
    (0, $b5R2n$react.useEffect)(()=>{
        // signInWithEmailLink invalidates link once used and fails if run multiple times
        // if running in strict development mode effect runs twice
        // so wait until auth is ready and we dont have a user
        if (auth && connected && !currentUser) {
            console.info("Verify email link");
            if ((0, $b5R2n$firebaseauth.isSignInWithEmailLink)(auth, location.href)) {
                const email = getEmailForLogin();
                if (email) (0, $b5R2n$firebaseauth.signInWithEmailLink)(auth, email, location.href).then(()=>{
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
    (0, $b5R2n$react.useEffect)(()=>{
        if (currentUser) router.replace(settings.userPath || (0, $60703c602d9dcdb8$export$6387722de17399a7).userPath);
    }, [
        currentUser,
        router,
        settings.userPath
    ]);
    // Calculate status depending on other states
    const status = !connected ? $ee59c5e24a14a93f$export$38b6479fb4ff8855.Connecting : currentUser ? $ee59c5e24a14a93f$export$38b6479fb4ff8855.Redirecting : waiting ? $ee59c5e24a14a93f$export$38b6479fb4ff8855.Waiting : isSubmitting ? $ee59c5e24a14a93f$export$38b6479fb4ff8855.Submitting : errors.link ? $ee59c5e24a14a93f$export$38b6479fb4ff8855.LinkError : $ee59c5e24a14a93f$export$38b6479fb4ff8855.Inputing;
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







function $a7b5de690a5e460e$export$2e2bcd8739ae039(state, compareFn = (0, ($parcel$interopDefault($b5R2n$fastdeepequales6react))), warn = false) {
    const [cachedState, setCachedState] = (0, $b5R2n$react.useState)(state);
    (0, $b5R2n$react.useEffect)(()=>{
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


function $d63f6c641f7e60ab$export$2e2bcd8739ae039(docRef, options) {
    // You really should not be sending in mutating objects but handle them if they are
    const docMemo = (0, $a7b5de690a5e460e$export$2e2bcd8739ae039)(docRef, (0, $b5R2n$firebasefirestore.refEqual));
    const optionsMemo = (0, $a7b5de690a5e460e$export$2e2bcd8739ae039)(options);
    const [snapshot1, setSnapshot] = (0, $b5R2n$react.useState)(null);
    (0, $b5R2n$react.useEffect)(()=>{
        if (docMemo) {
            const unsubscribe = (0, $b5R2n$firebasefirestore.onSnapshot)(docMemo, optionsMemo || {}, (snapshot)=>{
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





function $6d4e46e5e278cd03$export$2e2bcd8739ae039(query, options) {
    // You really should not be sending in mutating objects but handle them if they are
    const queryMemo = (0, $a7b5de690a5e460e$export$2e2bcd8739ae039)(query, (0, $b5R2n$firebasefirestore.queryEqual));
    const optionsMemo = (0, $a7b5de690a5e460e$export$2e2bcd8739ae039)(options);
    const [snapshot1, setSnapshot] = (0, $b5R2n$react.useState)(null);
    (0, $b5R2n$react.useEffect)(()=>{
        if (queryMemo) {
            const unsubscribe = (0, $b5R2n$firebasefirestore.onSnapshot)(queryMemo, optionsMemo || {}, (snapshot)=>{
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





//# sourceMappingURL=main.js.map
