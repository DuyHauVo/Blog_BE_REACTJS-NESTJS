const bcrypt = require('bcrypt');
const saltPass = 10;

export const hashPassHelper = async (plainPass: string) => {
  try {
    return await bcrypt.hash(plainPass, saltPass);
  } catch (error) {
    console.log(error);
  }
};

export const comparePassHelper = async (
  plainPass: string,
  hashPass: string,
) => {
  try {
    return await bcrypt.compare(plainPass, hashPass);
  } catch (error) {
    console.log(error);
  }
};
