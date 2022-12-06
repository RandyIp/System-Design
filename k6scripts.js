import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 700,
  duration: '10s',
  // target: 20000
};

export default function () {
  // const url = 'http://localhost:1128/reviews?product_id=2&sort=newest';
  const url = 'http://localhost:1128/reviews/meta?product_id=1';
  // const payload = JSON.stringify({
  //   email: 'johndoe@example.com',
  //   password: 'PASSWORD',
  // });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const test = http.get(url);
  check(test, {
    success: (r) => r.status === 200
  })
}


