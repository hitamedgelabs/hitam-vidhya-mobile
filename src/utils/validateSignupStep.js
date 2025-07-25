// utils/validators.js

export const validateSignupStep = (step, form) => {
  let newErrors = {};

  if (step === 1) {
    if (!form.name) newErrors.name = '*Required Field';
    if (!form.gender) newErrors.gender = '*Required Field';
    if (!form.email) newErrors.email = '*Required Field';
    if (!form.password) newErrors.password = '*Required Field';
    if (!form.mobile) newErrors.mobile = '*Required Field';
    if (!form.dob) newErrors.dob = '*Required Field';
    if (!form.addressCurrent) newErrors.addressCurrent = '*Required Field';
    if (!form.addressHometown) newErrors.addressHometown = '*Required Field';
  } else if (step === 2) {
    if (!form.tenthInstitution) newErrors.tenthInstitution = '*Required Field';
    if (!form.tenthBoard) newErrors.tenthBoard = '*Required Field';
    if (!form.tenthPercentage) newErrors.tenthPercentage = '*Required Field';
    if (!form.twelfthInstitution) newErrors.twelfthInstitution = '*Required Field';
    if (!form.twelfthBoard) newErrors.twelfthBoard = '*Required Field';
    if (!form.twelfthPercentage) newErrors.twelfthPercentage = '*Required Field';
    if (!form.bachelorsInstitution) newErrors.bachelorsInstitution = '*Required Field';
    if (!form.bachelorsCourse) newErrors.bachelorsCourse = '*Required Field';
    if (!form.bachelorsCgpa) newErrors.bachelorsCgpa = '*Required Field';
  } else if (step === 3) {
    if (!form.parentName) newErrors.parentName = '*Required Field';
    if (!form.parentRelation) newErrors.parentRelation = '*Required Field';
    if (!form.parentMobile) newErrors.parentMobile = '*Required Field';
    if (!form.parentEmail) newErrors.parentEmail = '*Required Field';
    if (!form.parentOccupation) newErrors.parentOccupation = '*Required Field';
    if (!form.parentAddress) newErrors.parentAddress = '*Required Field';
  }

  return {
    valid: Object.keys(newErrors).length === 0,
    newErrors
  };
};
