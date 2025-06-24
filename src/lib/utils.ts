import axios, { AxiosError } from 'axios'
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function axiosErrorHandler(error: unknown | Error) {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError
    if (axiosError.response?.data) {
      throw axiosError.response.data
    }
  } else {
    throw error
  }
}