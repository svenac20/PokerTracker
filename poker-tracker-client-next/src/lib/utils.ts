import { User } from "@prisma/client";
import { clsx, type ClassValue } from "clsx"
import { JWT } from "next-auth/jwt";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getInitials(name: string) {
  console.log(name)
  if (!name) 
    return '';
  return name
    .split(' ')
    .map((word) => word[0])
    .join('');
}

// export function getErrorMessage(error: FirebaseError) {
//   if (error.code === 'auth/invalid-credential') {
//     return 'Invalid email or password';
//   }
//   return error.message;
// };

export function mapUserToToken(token: JWT, userDb: User) {
    token.id = userDb!.id;
    token.googleId = userDb!.googleId || "";
    token.email = userDb!.email;
    token.roleId = userDb!.roleId;
    token.name = userDb!.username;
}