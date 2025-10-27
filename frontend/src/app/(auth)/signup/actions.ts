// Call backend API to signup user
"use server";

type SignupUserPayload = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export async function handleSignupUser(formData: SignupUserPayload) {
  try {
    // Make request to backend
    const response = await fetch("http://localhost:3001/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: data.message || "Signup failed" };
    }

    return { success: true, message: data.message };
  } catch (error) {
    console.error("Signup error:", error);
    // More detailed error logging
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Detailed error:", errorMessage);
    return { error: `Failed to sign up: ${errorMessage}` };
  }
}
