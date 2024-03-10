import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../graphql/mutations/authMutations';

const useLogin = () => {
  const [loginUser, { data, loading, error }] = useMutation(LOGIN_USER);

  const login = async (email: string, password: string) => {
    try {
      const response = await loginUser({
        variables: {
          email: email,
          password: password,
        },
      });
      
      return response.data.loginUser;
    } catch (err) {
      console.error('Error during login', err);
      throw err;
    }
  };

  return { login, data, loading, error };
};

export default useLogin;