import { z } from "zod";
import { parseTime } from "./utils.ts";

export const SignupFormSchema = z
  .object({
    email: z.string().email({
      message: "Email is required.",
    }),
    password: z
      .string()
      .min(8, { message: "Password must contain at least 8 characters." })
      .refine((password) => /[A-Z]/.test(password), {
        message: "Password must contain at least one uppercase letter.",
      })
      .refine((password) => /[a-z]/.test(password), {
        message: "Password must contain at least one lowercase letter.",
      })
      .refine((password) => /[0-9]/.test(password), {
        message: "Password must contain at least one number.",
      })
      .refine((password) => /[!@#$%^&*]/.test(password), {
        message: "Password must contain at least one special character.",
      }),
    confirmPassword: z.string().min(1, {
      message: "Password confirmation is required.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export const LoginFormSchema = z.object({
  email: z.string().email({
    message: "Email is required.",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
});

export const ResetPasswordFormSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must contain at least 8 characters." })
      .refine((password) => /[A-Z]/.test(password), {
        message: "Password must contain at least one uppercase letter.",
      })
      .refine((password) => /[a-z]/.test(password), {
        message: "Password must contain at least one lowercase letter.",
      })
      .refine((password) => /[0-9]/.test(password), {
        message: "Password must contain at least one number.",
      })
      .refine((password) => /[!@#$%^&*]/.test(password), {
        message: "Password must contain at least one special character.",
      }),
    confirmPassword: z.string().min(1, {
      message: "Password confirmation is required.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export const ForgotPasswordFormSchema = z.object({
  email: z.string().email({
    message: "Email is required.",
  }),
});

export const AvailabilitySchema = z
  .object({
    day: z.enum(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]),
    start: z.string().min(1, {
      message: "Start time is required",
    }),
    end: z.string().min(1, {
      message: "End time is required",
    }),
  })
  .refine(
    (data) => {
      return parseTime(data.end) > parseTime(data.start);
    },
    {
      message: "End time must be after start time.",
      path: ["end"],
    },
  );

export const PlayerFormSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Name is required",
    })
    .regex(/^[A-Za-z]+(?:[ '-.][A-Za-z]+)*$/, {
      message: "Name cannot contain special characters.",
    }),
  number: z.coerce
    .number({ message: "Number is required" })
    .min(0, {
      message: "Number must be greater than or equal to 0.",
    })
    .max(99, {
      message: "Number must be less than or equal to 99.",
    }),
  position: z.enum(["Goalkeeper", "Defender", "Midfielder", "Forward"]),
  availabilities: z.array(AvailabilitySchema),
});

export const ScheduleFormSchema = z.object({
  fieldAvailabilities: z.array(AvailabilitySchema),
});
