import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getInitials(name: string) {
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