function isValidTitle(value) {
  return value && value.trim().length > 0 && value.trim().length <= 100;
}

function isValidDescription(value) {
  return value && value.trim().length > 0;
}

function isValidFullDescription(value) {
  return value && value.trim().length > 0;
}

// function isValidDate(value) {
//   return value && new Date(value).getTime() >= new Date().getTime();
// }

function isValidImg(value) {
  return value && value.trim().length > 0;
}

function isValidCity(value) {
  return value && value.trim().length > 0;
}
// function isValidTime(value) {
//   return value && value.trim().length > 0;
// }
// function isValidAddress(value) {
//   return value && value.trim().length > 0;
// }

export function validateEventInput(input) {
  let validationErrors = {};

  if (!isValidTitle(input.title)) {
    validationErrors.title =
      "Invalid event title. Must be at most 100 characters long.";
  }

  if (!isValidDescription(input.description)) {
    validationErrors.description =
      "Invalid description. Must be at least 10 characters long.";
  }

  // if (!isValidDate(input.date)) {
  //   validationErrors.date =
  //     "Invalid date. Must be a date today or after today.";
  // }

  if (!isValidImg(input.img)) {
    validationErrors.date = "Uploading an image is required.";
  }
  if (!isValidFullDescription(input.fullDescription)) {
    validationErrors.fullDescription =
      "Invalid description. Must be at least 10 characters long.";
  }
  // if (!isValidTime(input.startTime)) {
  //   validationErrors.startTime = "Time is required.";
  // }
  // if (!isValidAddress(input.address)) {
  //   validationErrors.address = "Address is required.";
  // }
  if (!isValidCity(input.city)) {
    validationErrors.city = "city is required.";
  }

  if (Object.keys(validationErrors).length > 0) {
    throw validationErrors;
  }
}

function isValidEmail(value) {
  return value && value.includes("@");
}

function isValidPassword(value) {
  return value && value.trim().length >= 7;
}

export function validateCredentials(input) {
  let validationErrors = {};

  if (!isValidEmail(input.email)) {
    validationErrors.email = "Invalid email address.";
  }

  if (!isValidPassword(input.password)) {
    validationErrors.password =
      "Invalid password. Must be at least 7 characters long.";
  }

  if (Object.keys(validationErrors).length > 0) {
    throw validationErrors;
  }
}
