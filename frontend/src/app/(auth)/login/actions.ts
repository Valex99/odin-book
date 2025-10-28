// Call backend API to login user
"use server";

type LoginUserPayload = {
  email: string;
  password: string;
};

// Login user server action
export async function handleLoginUser(formData: LoginUserPayload) {
  try {
    // Make request to Next.js API route (which proxies to backend)
    const response = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: data.message || "Login failed" };
    }
    return { success: true, message: data.message };
  } catch (error) {
    console.error("Login error:", error);
    // More detailed error logging
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Detailed error:", errorMessage);
    return { error: `Failed to login: ${errorMessage}`, user: null };
  }
}
