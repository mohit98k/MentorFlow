components/ – Reusable UI building blocks
pages/ – Each URL = one page
layouts/ – Repeated page skeletons
context/ – Global state (Auth, Theme, etc.)
router/ – Central routing config , in app.js just render the appRouter
hooks/ - custom hook logics (they are not ui)
api/ - for axios setup 

***GENERAL***

e.preventDefault(); use this to not relode after form submission ;

For base url like http://localhost3000 set the register page as default component or the dashboard for the authenticated user;

For axios to get the jwt from local storage and attacth it with all the next requests we need to store the token into the local storage and block the user from logging in or registering again for this session 

Frontend routes represent UI pages, not API capabilities.so everywhere ill try to route in frontend ill use frontend component names to route and only in the axios file ill use my actual backend routes  / endpoints ;

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


*** SIDE-BAR *** LAYOUT ***

Auth pages → no sidebar (login, register)
App pages → sidebar always visible (dashboard, roadmaps, jobs, resume);

for this i need a layout , where the sidebar is constant and another variable side page to render;

those variable side pages will be outlet , and nested routing will help in routing them ;
    ( flex-1 → content auto-fills int the outlet )


*** Logout ***
log out logic from frontend perspective

 remove token
 redirect to auth page 
 prevent back navigation to dashboard or to any protected page












