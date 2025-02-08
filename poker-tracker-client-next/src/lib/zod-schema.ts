import { z } from "zod";

export const formSchema = z.object({
  casinoId: z.string({
    required_error: "Please select a casino",
  }),
  gameType: z.enum(["PLO", "NLO"], {
    required_error: "Please select game type",
  }),
  limit: z
    .string({ required_error: "Please add limit in format xx/yy" })
    .nonempty("Limt must be nonempty"),
  tables: z.coerce
    .number({ required_error: "Please add table" })
    .min(1, "Table must be at least 1"),
  playersWaiting: z.coerce
    .number({ required_error: "Please add number of players waiting" })
    .nonnegative("Number of players waiting must be positive"),
});

export const registerSchema = z.object({
  email: z
    .string({
      required_error: "Please enter email",
    })
    .email("Please enter valid email"),
  password: z
    .string({
      required_error: "Please enter password",
    })
    .min(6, "Password must be at least 6 characters"),
  username: z.string({
    required_error: "Please enter username",
  }),
});
