import './Css/register.css'
import { Link } from 'react-router-dom';

function Register() {

  const handleRegister = (e) => {

    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!email || !password || !name) {
      alert('Please fill all the required fields');
      return;
    }

    fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, name }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'error') {
          alert(data.data.message);
          return;
        }

        window.location.href = '/login';
      });
  };

  const signupWithGoogle = () => {
    window.location.href = 'http://localhost:3000/api/auth/google';
  };

  return (
    <>

      <div className='login-wrapper'>
        <div className="login-container">
          <div className="form-title">
            <img src="/public/favicon1/favicon-32x32.png" />
            <h1>Sign Up</h1>
          </div>
          <form action="">
            <div className="input-container">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                placeholder="Enter Your Name"
                name="name"
                id="name"
                required
              />
            </div>
            <div className="input-container">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                autoComplete="email"
                placeholder="Enter Your Email"
                name="email"
                id="email"
                required
              />
            </div>
            <div className="input-container">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                autoComplete="current-password"
                placeholder="Enter Your Password"
                name="password"
                id="password"
                required
              />
            </div>
            <div className="btn-container">
              <div className="submit-btn">
                <button type="button" id="login" onClick={handleRegister}>Sign up</button>
              </div>
              <div className="orsignuptext">
                <span> Or signup with </span>
                <i></i>
              </div>
              <div className="option-btn">
                <button type="button" onClick={signupWithGoogle}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="24"
                    height="24"
                    viewBox="0 0 48 48"
                  >
                    <path
                      fill="#fbc02d"
                      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                    ></path>
                    <path
                      fill="#e53935"
                      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                    ></path>
                    <path
                      fill="#4caf50"
                      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                    ></path>
                    <path
                      fill="#1565c0"
                      d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                    ></path>
                  </svg>
                  Sign up with google
                </button>
              </div>
            </div>
            <div className="redirect-link">
              <div>
                <p>Already Have An Account? <Link to="/login">Sign in</Link></p>
              </div>
            </div>
          </form>
        </div>
      </div>

      <script src="./js/Register.js"></script>
    </>

  )
}

export default Register


