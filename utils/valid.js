const valid = (firstname, lastname, email, password, phone_number, gender) => {
  if (
    !firstname ||
    !lastname ||
    !email ||
    !password ||
    !phone_number ||
    !gender
  )
    return 'Please enter all the required fields.';

  if (!validateEmail(email)) return 'Invalid email. Please check';

  if (firstname.length < 3) return 'Name must be at least 3 characters.';
  const pass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#^?&_-])[A-Za-z\d@$!%*#^?&_-]{8,}$/;
  if (!pass.test(password)) return 'Please enter a valid password.';

  if (phone_number.length < 10)
    return 'Phone number must be at least 10 characters.';
};

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export default valid;

export const locationformvalidate = (values) => {
  const errors = {};
  const regex = /^[a-zA-Z]+$/;
  if (!values.city) {
    errors.city = 'City is required!';
  } else if (!regex.test(values.city)) {
    errors.city = 'City cannot contain Numbers';
  }
  if (!values.state) {
    errors.state = 'State is required';
  } else if (!regex.test(values.state)) {
    errors.state = 'State cannot contain Numbers';
  }
  if (!values.zipcode) {
    errors.zipcode = 'Zipcode is required';
  } else if (values.zipcode.length > 6) {
    errors.zipcode = 'Invalid zipcode';
  }
  if (!values.country) {
    errors.country = 'Country is required';
  }
  if (!values.line1) {
    errors.line1 = 'Address Line is required';
  } else if (values.line1.length < 5) {
    errors.line1 = 'Address is too short characters.';
  } else if (values.line1.length > 20) {
    errors.line1 = 'Address Cannot exceed more 20 characters.';
  }
  if (!values.line2) {
    errors.line2 = 'Address Line is required';
  } else if (values.line2.length < 5) {
    errors.line2 = 'Address is too short characters.';
  } else if (values.line2.length > 20) {
    errors.line2 = 'Address Cannot exceed more 20 characters.';
  }
  return errors;
};

export const teamformvalidate = (values) => {
  const errors = {};
  const regex = /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/;
  const year_regex = /^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/;
  if (values.name.length === 0) {
    errors.name = 'Team Name is requried';
  }
  if (values.name.length <= 1) {
    errors.name = 'Team Should be 2 characters long.';
  }
  if (!year_regex.test(values.founded)) {
    errors.founded = 'Invalid Year Format';
  }
  if (values.region === '') {
    errors.region = 'Region is required';
  }
  if (!values.description) {
    errors.description = 'Description is required';
  } else if (values.description.length < 51) {
    errors.description = 'Description should be minimum of 50 characters.';
  } else if (values.description.length > 250) {
    errors.description = 'Description Cannot exceed more than 250 characters.';
  }
  return errors;
};

export const tournamentformvalidate = (values) => {
  const regex = /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/;
  const errors = {};
  const limit = 64;
  if (!values.name.length === 0) {
    errors.name = 'Tournament Name is requried';
  }
  if (values.name.length > limit) {
    errors.name = 'Name Limit Exceeded';
  }
  if (!values.game) {
    errors.game = 'Select Atleast one game';
  }
  if (!values.prizepool) {
    errors.prizepool = 'Prize cannot be empty';
  }
  if (!values.checkIn) {
    errors.checkIn = 'Check-in Period Required';
  }
  if (!values.entranceFee) {
    errors.entranceFee = 'Entrance Fee is Required.';
  }
  if (!values.startDate) {
    errors.startDate = 'Start Date is Required.';
  }
  if (!values.endDate) {
    errors.endDate = 'End Date is Required.';
  }
  if (!values.location) {
    errors.location = 'Location is Required.';
  }
  if (values.category === 'LAN') {
    if (!values.address) {
      errors.address = 'Address is Required.';
    }
  }
  if (!values.description) {
    errors.description = 'Description is required';
  } else if (values.description.length < 51) {
    errors.description = 'Description should be minimum of 50 characters.';
  } else if (values.description.length > 250) {
    errors.description = 'Description Cannot exceed more than 250 characters.';
  }
  if (values.tournamentType === '') {
    errors.tournamentType = 'Please select a tournament type';
  }

  return errors;
};

export const profileformvalidate = (values) => {
  const errors = {};

  if (values.firstName.length === 0) {
    errors.firstName = 'First name Required';
  }

  if (values.lastName.length === 0) {
    errors.lastName = 'Last name Required';
  }

  if (values.username.length === 0) {
    errors.username = 'username Required';
  }

  if (values.bio.length === 0) {
    errors.bio = 'Bio Required';
  } else if (values.bio.length < 51) {
    errors.bio = 'Bio should be minimum of 50 characters';
  } else if (values.bio.length > 250) {
    errors.bio = 'Bio Cannot exceed more than 250 characters';
  }

  if (values.profileType === 'Business' && values.b_role?.length === 0) {
    errors.b_role = 'Business Role is Required';
  }

  if (values.startDate.length === 0) {
    errors.startDate = 'Start Date Required';
  }

  // if (values.profileType === 'Gamer' && values.team.length === 0) {
  //   errors.team = 'Team is Required';
  // }

  // if (values.profileType === 'Coach' && values.team.length === 0) {
  //   errors.Cteam = 'Team is Required';
  // }

  // if (values.profileType === 'Gamer' && values.role.length === 0) {
  //   errors.Grole = 'Role Required';
  // }

  // if (values.profileType === 'Gamer' && values.game.length === 0) {
  //   errors.Ggame = 'Game Required';
  // }

  // if (values.profileType === 'Coach' && values.game.length === 0) {
  //   errors.Cgame = 'Game Required';
  // }

  if (values.profileType === 'Streamer' && values.game?.length === 0) {
    errors.Sgame = 'Game Required';
  }

  if (values.profileType === 'Business' && values.company?.length === 0) {
    errors.company = 'Company name Required';
  }

  if (values.profileType === 'Business' && values.industry?.length === 0) {
    errors.industry = 'Industry name Required';
  }

  if (
    values.profileType === 'Streamer' &&
    values.streamingPlatform?.length === 0
  ) {
    errors.platform = 'Platform Required';
  }

  if (values.profileType === 'Streamer' && values.link?.length === 0) {
    errors.link = 'Stream Link Required';
  }

  return errors;
};

export const teamEditFormValidate = (values) => {
  const errors = {};
  if (values.teamname.length === 0) {
    errors.teamName = 'Team Required';
  } else if (values.teamname.length > 30) {
    errors.teamName = 'Team Name cannot exceed 30 characters';
  }

  if (values.about.length === 0) {
    errors.Tabout = 'Team Description cannot be empty';
  } else if (values.about.length < 51) {
    errors.Tabout = 'Description should be minimum of 50 characters.';
  } else if (values.about.length > 250) {
    errors.Tabout = 'Description Cannot exceed more than 250 characters.';
  }

  if (values.region.length === 0) {
    errors.Tregion = 'Country is Required';
  }

  if (values.founded.length === 0) {
    errors.Tfounded = 'Team Founded is required';
  }

  return errors;
};

export const tournamentEditValidate = (values) => {
  const errors = {};

  if (values.name.length === 0) {
    errors.name = 'Tournament name is required';
  }

  if (values.startDate.length === 0) {
    errors.startDate = 'Start Date Required';
  }

  if (values.endDate.length === 0) {
    errors.endDate = 'End Date Required';
  }

  if (values.startTime.length === 0) {
    errors.startTime = 'Start Time Required';
  }

  if (values.endTime.length === 0) {
    errors.endTime = 'End Time Required';
  }

  if (values.description.length === 0) {
    errors.description = 'Tournament Description cannot be empty';
  } else if (values.description.length < 51) {
    errors.description = 'Description should be minimum of 50 characters.';
  } else if (values.description.length > 250) {
    errors.description = 'Description Cannot exceed more than 250 characters.';
  }

  if (values.games.length === 0) {
    errors.games = 'Game is Required';
  }

  return errors;
};

export const tournamentRules = (values) => {
  const errors = {};

  if (values.check_in.length === 0) {
    errors.check_in = 'Check in Required';
  }

  if (values.forfeit.length === 0) {
    errors.forfeit = 'Forfeit Required';
  }

  if (values.matchSettings.length === 0) {
    errors.matchSettings = 'Match Setting Required';
  }

  if (values.prizeRules.length === 0 || values.prizeRules.length < 15) {
    errors.prizeRules = 'Prize Rules is Required';
  }

  if (values.general.length === 0 || values.general.length < 15) {
    errors.general = 'General Rules is required';
  }

  if (values.compete.length === 0 || values.compete.length < 15) {
    errors.compete = 'Compete Rules is required';
  }

  // if (values.cusRuleBody.length === 0 || values.cusRuleBody.length < 15) {
  //   errors.cusRuleBody = 'Please Recheck Input';
  // }

  // if (values.cusRuleHead.length === 0) {
  //   errors.cusRuleHead = 'Header Name Required';
  // }

  if (values.country.length === 0) {
    errors.country = 'Country Required';
  }

  if (values.admins.length === 0) {
    errors.admins = 'Admin Detail Required';
  }

  if (values.contact.length === 0) {
    errors.contact = 'Contact Details Required';
  }

  return errors;
};

export const profileTeam = (values) => {
  const errors = {};

  if (values.teamId === null) {
    errors.team = 'Team Required';
  }

  if (values.game.length === 0) {
    errors.game = 'Game Required';
  }

  if (values.role.length === 0) {
    errors.role = 'Role Required';
  }

  if (values.teamStartDate.length === 0) {
    errors.teamStartDate = 'Start Date Required';
  }

  if (values.teamEndDate.length === 0) {
    errors.teamEndDate = 'End Date Required';
  }

  return errors;
};

export const profileTournaments = (values) => {
  const errors = {};

  if (values.tournamentId.length === 0) {
    errors.tournamentId = 'Tournament is Required';
  }

  if (values.games.length === 0) {
    errors.games = 'Games are Required';
  }

  if (values.team === null) {
    errors.team = 'Team is Required';
  }

  if (values.role.length === 0) {
    errors.role = 'Role is Required';
  }

  if (values.year.length === 0) {
    errors.year = 'Year is Required';
  }

  if (values.team_ranking === null) {
    errors.team_ranking = 'Team Ranking is Required';
  }

  if (values.winnings === null) {
    errors.winnings = 'Winnings is Required';
  }

  return errors;
};

export const teamTournaments = (values) => {
  const errors = {};

  if (values.tournamentId.length === 0) {
    errors.tournamentId = 'Tournament is Required';
  }

  if (values.organizer.length === 0) {
    errors.organizer = 'Please Select a Organizer';
  }

  if (values.games.length === 0) {
    errors.games = 'Games are Required';
  }

  if (values.year.length === 0) {
    errors.year = 'Year is Required';
  }

  if (values.team_ranking === null) {
    errors.team_ranking = 'Team Ranking is Required';
  }

  if (values.winnings === null) {
    errors.winnings = 'Winnings is Required';
  }

  return errors;
};

export const brandfromvalidate = (values) => {
  const errors = {};
  if (values.name.length === 0) {
    errors.name = 'Brand Name Required';
  }
  if (values.description.length === 0) {
    errors.description = 'Description of Brand Required';
  } else if (values.description.length < 51) {
    errors.description =
      'Description should contain a minimum of 50 characters';
  } else if (values.description.length > 250) {
    errors.description = 'Description Cannot exceed more than 250 characters';
  }
  return errors;
};

export const arenafromvalidate = (values) => {
  const errors = {};
  if (values.name.length === 0) {
    errors.name = 'Arena Name Required';
  }
  if (values.description.length === 0) {
    errors.description = 'Description of Arena Required';
  } else if (values.description.length < 51) {
    errors.description =
      'Description should contain a minimum of 50 characters';
  } else if (values.description.length > 250) {
    errors.description = 'Description Cannot exceed more than 250 characters';
  }
  if (values.address.length === 0) {
    errors.address = 'Address is Required';
  } else if (values.address.length > 150) {
    errors.address = 'Address cannot exceed more then 150 characters';
  }
  if (values.location.length === 0) {
    errors.location = 'Location is Required';
  } else if (values.location.length > 60) {
    errors.location = 'Location cannot exceed more then 60 characters';
  }
  return errors;
};

export const jobformvalidate = (values) => {
  const errors = {};
  if (values.name.length === 0) {
    errors.name = 'Job Title is Required';
  } else if (values.name.length > 40) {
    errors.name = 'Job Title cannot exceed 40 characters';
  }
  if (values.role.length === 0) {
    errors.role = 'Select a Job Type';
  }
  if (values.category.length === 0) {
    errors.category = 'Select a Job Category';
  }
  if (values.owner.length === 0) {
    errors.owner = 'Select Job Owner';
  }
  if (values.startDate.length === 0) {
    errors.startDate = 'Application start date is required';
  }
  if (values.endDate.length === 0) {
    errors.endDate = 'Application end date is required';
  }
  if (values.experience.length === 0) {
    errors.experience = 'Experience is required';
  }
  return errors;
};

export const teamsquadformvalidate = (values) => {
  const errors = {};
  if (!values.game) {
    errors.game = 'Game is requried';
  }
  if (!values.country) {
    errors.country = 'Country is required';
  }
  if (values.playerData.length === 0) {
    errors.players = 'Atleast One player is required';
  }
  return errors;
};
