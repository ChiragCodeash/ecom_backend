// Reuired Function Validation
const ReuiredValidation = (value) => {
  if (value.length === 0) {
    return false;
  }
  return true;
};

// User Name Validation
export const UserNameValidation = (uname) => {
  let regex = /[a-zA-Z]/;
  if (!ReuiredValidation(uname)) {
    return {
      status: false,
      message: "Username is required",
    };
  }
  if (!regex.test(uname)) {
    return {
      status: false,
      message: "You can not add only number in Username",
    };
  }
  return {
    status: true,
  };
};

// Email Validation
export const EmailValidation = (email) => {
  let regex =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!ReuiredValidation(email)) {
    return {
      status: false,
      message: "Email is required",
    };
  }
  if (!email.match(regex)) {
    return {
      status: false,
      message: "Please Enter Valid email",
    };
  }
  return {
    status: true,
  };
};

// Email Validation
export const PasswordValidation = (password) => {
  let regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
  if (!ReuiredValidation(password)) {
    return {
      status: false,
      message: "Password is required",
    };
  }
  if (!password.match(regex)) {
    return {
      status: false,
      message:
        "password length is minimum 8 characters and it includes at least one capital letter, one small letter, one digit and one special characters.",
    };
  }
  return {
    status: true,
  };
};

// Email Validation
export const CPasswordValidation = (password, cpassword) => {
  if (!ReuiredValidation(cpassword)) {
    return {
      status: false,
      message: "Confirm Password is required",
    };
  }
  if (password !== cpassword) {
    return {
      status: false,
      message: "Password and confirm password do not match. Please enter again",
    };
  }
  return {
    status: true,
  };
};


// Title Validation
export const TitleValidation = (title, name) => {
  var regex = /^[0-9]+$/;
  if (!ReuiredValidation(title)) {
    return {
      status: false,
      message: "Title is required",
      name : name
    };
  }
  if (regex.test(title)) {
    return {
      status: false,
      message: "You can not add only number in title",
      name : name
    };
  }
  return {
    status: true,
  };
};


// Title Validation
export const FieldRequiredValidation = (field, name) => {
  if (field.length == 0) {
    return {
      status: false,
      message: `${name} is required`,
      name : name
    };
  }
 
  return {
    status: true,
  };
};

