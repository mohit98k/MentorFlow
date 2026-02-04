1 . a bug may arise cause im storing the access token in local storage and then using it to block re-login and re-registration route for already authenticated user , so even after expiration of the token the user may not get to relogin cause the token i guess wont expire ..... not sure though ;





Tailwind responsiveness model

default → mobile
sm:     ≥ 640px
md:     ≥ 768px
lg:     ≥ 1024px
xl:     ≥ 1280px
2xl:    ≥ 1536px

Write mobile styles first. Add overrides at breakpoints.



remember to remove the consolelog(user) before sendin in production and the dependency list fromthe ddashboard layout 