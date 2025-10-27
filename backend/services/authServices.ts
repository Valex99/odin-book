// inside here we will have functions that will interact with the database

// Function to create user
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

export const checkUsernameAvailability = async (username: string) => {
  return await prisma.user.findUnique({
    where: { username: username },
    // select: { id: true } means we only want to return the id of the user
    // if we want to return more fields, we can add them to the select object
    // Very good for performance (only returns id field)
    // true is just prisma syntax for true
    select: { id: true },
  });
};

export const checkEmailAvailability = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email: email },
    select: { id: true },
  });
};

export const createUser = async (
  username: string,
  email: string,
  password: string
) => {
  return await prisma.user.create({
    data: {
      username: username,
      email: email,
      password: password,
    },
  });
};

// LOGIN SERVICE
// Get user from DB (based on email)
export const getUserFromDb = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email: email },
  });
};
