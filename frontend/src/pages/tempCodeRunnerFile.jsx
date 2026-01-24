  const {user,loading} =useUser();

  const[resumefile,setResumefile]=useState(null);
  const[atsScore,setatsScore]=useState(user.user.resumeScore);