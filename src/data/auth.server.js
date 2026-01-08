import { createCookieSessionStorage, redirect } from "@remix-run/node";
import pkg from "bcryptjs";
import { prisma } from "./database.server";

// to use the hashed password run: npm i bcryptjs @types/bcryptjs

//that is hashing password.
//To transform password to something unreadable for the server side.If the server is compromised

const { hash, compare } = pkg;

const SESSION_SECRET = process.env.EXPO_PUBLIC_SESSION_SECRET;

const sessionStorage = createCookieSessionStorage({
  cookie: {
    secure: process.env.NODE_ENV === "production",
    secrets: [SESSION_SECRET],
    sameSite: "lax",
    maxAge: 30 * 24 * 60 * 60, // 30 days max age of the cookie
    httpOnly: true,
  },
});

//////////////////////////////

async function createUserSession(userId, redirectPath) {
  const session = await sessionStorage.getSession();

  session.set("userId", userId);
  return redirect(redirectPath, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session),
    },
  });
}

//////////////////////////////

export async function getUserFromSession(request) {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );

  const userId = session.get("userId");

  if (!userId) {
    return null;
  }

  return userId;
}

//////////////////////////////

export async function destroyUserSession(request) {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );

  return redirect("/profile", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
}

//////////////////////////

export async function requireUserSession(request) {
  const userId = await getUserFromSession(request);

  if (!userId) {
    throw redirect("/auth?mode=login");
  }

  return userId;
}

export async function signup({ email, password, canAddEvents }) {
  const existingUser = await prisma.user.findFirst({ where: { email } });

  if (existingUser) {
    const error = new Error(
      "A user with the provided email address exists already."
    );
    error.status = 422;
    throw error;
  }
  const passwordHash = await hash(password, 12);

  const user = await prisma.user.create({
    data: { email: email, password: passwordHash, canAddEvents: canAddEvents },
  });

  return await createUserSession(user?.id, "/profile");
}

export async function login({ email, password }) {
  const existingUser = await prisma.user.findFirst({ where: { email } });

  if (!existingUser) {
    const error = new Error(
      "Could not log you in, please check the provided email."
    );
    error.status = 401;
    throw error;
  }

  const passwordCorrect = await compare(password, existingUser.password);

  if (!passwordCorrect) {
    const error = new Error(
      "Could not log you in, please check the provided password."
    );
    error.status = 401;
    throw error;
  }

  return createUserSession(existingUser?.id, "/profile");
}

function getUserSession(request) {
  return sessionStorage.getSession(request.headers.get("Cookie"));
}

///////////

export async function getUserId(request) {
  const session = await getUserSession(request);
  const userId = session.get("userId");

  if (!userId || typeof userId !== "string") return null;
  return userId;
}

export async function getUser(request) {
  const userId = await getUserId(request);
  if (typeof userId !== "string" || !userId) {
    return null;
  }
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { canAddEvents: true, email: true, id: true },
  });
  return user;
}

/////EVENTS OF ONE PROVIDER
// export async function getProviderEvents(providerId) {
//   try {
//     const providerWithItems = await prisma.provider.findUnique({
//       where: { id: providerId },
//       include: { events: true },
//     });

//     return providerWithItems;
//   } catch (error) {
//     console.log(error);
//     throw new Error("Failed to get events");
//   }
// }
