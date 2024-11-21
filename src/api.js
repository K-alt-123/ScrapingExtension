const API_URL = 'http://localhost:3000'; // Ensure this matches your backend URL

export const login = async (email, password) => {
  const response = await fetch(`${API_URL}/api/v1/sign_in`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: {
        email,
        password,
      },
    }),
  });

  return response; // Return the response directly
};

export async function signup(email, password, passwordConfirmation) {
  try {
    const response = await fetch(`${API_URL}/api/v1/sign_up`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        user: {
          email, 
          password, 
          password_confirmation: passwordConfirmation 
        }
      }),
    });

    return response; // Return the response directly
  } catch (error) {
    console.error('Error during signup:', error);
    throw error; // Re-throw the error to be handled in the component
  }
}

export const logout = async () => {
  try {
    const response = await fetch(`${API_URL}/api/v1/sign_out`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    return response; // Return the response directly
  } catch (error) {
    console.error('Error during logout:', error);
    throw error; // Re-throw the error to be handled in the component
  }
};