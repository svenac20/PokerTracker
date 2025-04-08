import { z } from "zod";

export const formSchema = z.object({
  casinoId: z
    .string({
      required_error: "Please select a casino",
    })
    .nonempty("Please select a casino"),
  startTime: z.coerce.date({ required_error: "Please select start time" }),
  gameType: z.enum(["PLO", "NLH"], {
    required_error: "Please select game type",
  }),
  limit: z
    .string({ required_error: "Please add limit in format xx/yy" })
    .nonempty("Limit must be nonempty"),
  tables: z.coerce
    .number({ required_error: "Please add table" })
    .min(1, "Table must be at least 1"),
  playersWaiting: z.coerce
    .number({ required_error: "Please add number of players waiting" })
    .nonnegative("Number of players waiting must be positive"),
  gameStarted: z.boolean().default(false),
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
  username: z
    .string({
      required_error: "Please enter username",
    })
    .nonempty("Please enter username"),
});

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "Please enter email",
    })
    .nonempty("Please enter email")
    .email("Please enter valid email"),
  password: z
    .string({
      required_error: "Please enter password",
    })
    .nonempty("Please enter password"),
});

export const casinoDetailsSchema = z.object({
  rake: z.string({}).nonempty("Rake must not be empty"),
  information: z.string({}),
  location: z.string({}),
  imageUrl: z.string({}).nullable(),
  image: z
    .any()
    .optional()
    .refine(
      (file) =>
        !file || file.size <= 5 * 1024 * 1024, // Max size: 5MB
      "Image must be less than 5MB"
    )
    .refine(
      (file) =>
        !file ||
        file.arrayBuffer.length == 0 ||
        ["image/jpeg", "image/png", "image/jpg"].includes(file.type),
      "Only JPEG, PNG, images are allowed"
    ),
});

export const editTournamentSchema = z.object({
  casinoId: z.string({})
})