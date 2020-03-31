import Axios from 'axios';

export const loginEmployee = data => dispatch => {
  console.log('data', data);
  Axios.post(
    'https://glacial-crag-30370.herokuapp.com/api/employee/employee_login',
    data,
  )
    .then(res => {
      console.log('res.data', res.data);
    })
    .catch(err => {
      console.log('err :', err.response.data);
    });
};
