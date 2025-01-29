import {
  Alert,
  AlertTitle,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { userLogin } from "../store/Action/User";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [alert, setalert] = useState("");
    const [active, setactive] = useState(false);
    const dispatch = useDispatch();
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    // const { messageAuth, errorAuth, isAuthenticated, loading, user } =
    //   useSelector((state) => state.User);

    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
    const handelEmail = (e) => {
      setemail(e.target.value);
      setactive(false);
    };
    const handelPassword = (e) => {
      setpassword(e.target.value);
      setactive(false);
    };
    useEffect(() => {
     dispatch(userLogin())
    }, [])
    
  return (
    <div className="h-[70%] w-[30%] bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl">
      <div className="h-full w-full max-lg:w-full  relative flex flex-col items-center gap-6 justify-center">
        <h1 className=" text-4xl whitespace-nowrap font-bold font-[poppins]">
          Login to FlateMate
        </h1>
        <h3 className="w-fit max-lg:w-full max-lg:text-center text-left">
          New User ?
          <NavLink
            to="/register"
            className="ml-3 text-green-600 font-normal font-[poppins]"
          >
            Create an account
          </NavLink>
        </h3>

        <form
          autoComplete="false"
          className="grid gap-8 w-[70%] "
        //   onSubmit={formSubmit}
        >
          <TextField
            id="outlined-basic"
            value={email}
            onChange={handelEmail}
            label="Email"
            type="email"
            variant="outlined"
            autoComplete="false"
            
            // required
          />
          <FormControl className="w-full" variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              value={password}
              onChange={handelPassword}
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              // required
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    className="ease-in duration-1000	"
                  >
                    {showPassword ? (
                      <i className="ri-eye-line"></i>
                    ) : (
                      <i className="ri-eye-close-line"></i>
                    )}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>

          {/* <NavLink
            href="/admin/forget"
            className="text-black fs-xl w-full text-right font-[poppins]"
            onClick={()=> dispatch(RemoveError())}

          >
            Forget Password ?
          </NavLink> */}
          <button className="w-full p-4 transition-all ease-linear duration-150 font-[poppins] text-white bg-black rounded hover:opacity-80  font-semibold">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
