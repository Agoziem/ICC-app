// authUtils.js
// validate user 
export const validateUser = async (id) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/authapi/getuser/${id}/`
  );
  return await res.json();
};

// fetch Oauth UserData
export const fetchOAuthUserData = async (provider, profile) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/authapi/register_oauth/${provider}/`,
    {
      method: "POST",
      body: JSON.stringify(profile),
      headers: { "Content-Type": "application/json" },
    }
  );
  if (!res.ok) {
    throw new Error(
      "An error occurred while trying to verify user credentials"
    );
  }
  return await res.json();
};

 
// authorize Credentials
export const authorizeCredentials = async (credentials) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/authapi/verifyuser/`,
      {
        method: "POST",
        body: JSON.stringify(credentials),
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!res.ok) {
      throw new Error(
        "An error occurred while trying to verify user credentials"
      );
    }

    const { user } = await res.json();
    return user;
  } catch (error) {
    console.error("error:", error);
    return null;
  }
};
