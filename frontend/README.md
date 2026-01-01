components/ – Reusable UI building blocks
pages/ – Each URL = one page
layouts/ – Repeated page skeletons
context/ – Global state (Auth, Theme, etc.)
router/ – Central routing config , in app.js just render the appRouter
hooks/ - custom hook logics (they are not ui)
api/ - for axios setup 

***GENERAL***

e.preventDefault(); use this to not relode after form submission ;

for base url like http://localhost3000 set the register page as default component;

for axios to get the jwt from local storage and attacth it with all the next requests we need to store the token into the local storage and block the user from logging in or registering again for this session 

***AXIOS***

configure axios by defining the endpoints of routes and to attach the jwt token with every request in a modular way

***REGISTER***

here comes the concept of useNavigate hook ,  navigate and link tag ;

the response comming from the backend is stored in (err.response.data.message) not in err.message;

after succesful register , redirect to login page ,so use navigate

***APPROUTER***

this componenet will be rendered in app.js;

the navigate and link changes the url;

this component watches the url and loads the componenet accordingly;

***LOGIN***

create a route in approuter;

store the access token in the local storage ;

***PUBLIC ROUTE***

BLOCK THE AUTHENTICATED USER FORM AUTH PAGES;

maintains the auth flow ;

if the user is logged in check by the token saved in local storage , block him from the log in and register route;

to use this wrap the register and login route with it ;

***PROTECTED ROUTE***

BLOCKS THE UNAUTHENTICATED USER FROM PROTECTED PAGES 

the unregisterd / unlogged user cannot access the dashboard and stuff yk

***NAVIGATE HOOK***

const navigate=useNavigate() ;
navigate("/login" , { replace: true }); // “DO this now” ;

<Navigate to="/dashboard" replace /> = “THIS should be rendered instead”;

replace = “don’t allow going back”;


















