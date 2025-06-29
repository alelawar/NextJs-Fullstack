"use client"
import { Button } from "./Button"
import { useAuth } from "@clerk/nextjs"

export const ActionUser = () => {
  const { isLoaded, userId } = useAuth()

  // Kalau auth belum siap, jangan render apa-apa dulu
  if (!isLoaded) return (
    <Button
      href="#"
      label="Loading..."
      icon=""
    />
  )

  // Kalau user sudah login
  if (userId) {
    return (
      <Button
        href="/articles/create"
        label="Buat Artikel"
        icon="bi bi-pencil"
      />
    )
  }

  // Kalau belum login
  return (
    <Button
      href="/sign-in"
      label="Sign-in"
      icon="bi bi-person"
    />
  )
}
