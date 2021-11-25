export const LOGIN = 'LOGIN';
export const FETCH_TOKEN = 'FETCH_TOKEN';
export const FETCH_API_SUCCESS = 'FETCH_API_SUCCESS';
export const FETCH_API_FAILED = 'FETCH_API_FAILED';
export const LOADING = 'LOADING';

export const login = (payload) => ({
  type: LOGIN,
  payload,
});

export const token = (payload) => ({
  type: FETCH_TOKEN,
  payload,
});

export const successAPIFetch = (payload) => ({
  type: FETCH_API_SUCCESS,
  payload,
});

export const failedAPIFetch = (payload) => ({
  type: FETCH_API_FAILED,
  payload,
});

export const loading = (payload) => ({
  type: LOADING,
  payload,
});

export const fetchToken = () => async (dispatch) => {
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const data = await response.json();
  return dispatch(token(data));
};

export const fetchAPI = (tokenKey) => async (dispatch) => {
  dispatch(loading(true));
  try {
    const questionsResponse = await fetch(`https://opentdb.com/api.php?amount=5&token=${tokenKey}`);
    const data = await questionsResponse.json();
    dispatch(successAPIFetch(data));
  } catch (error) {
    dispatch(failedAPIFetch(error));
  }
};
