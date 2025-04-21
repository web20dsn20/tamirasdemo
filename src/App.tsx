import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Box, Container, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// import { ReactFormState } from "react-dom/client";
import { useNavigate } from "react-router-dom";

type FormValues = {
  username: string;
  password: string;
};

const schema = yup
  .object()
  .shape({
    username: yup.string().required(),
    password: yup.string().required(),
  })
  .required();

function App() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const formsubmit = (data: FormValues) => {
    console.log(data);
    navigate("/orderForm");
    reset();
  };
  console.log(errors);
  return (
    <div className="App">
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Card variant="outlined">
          <form onSubmit={handleSubmit(formsubmit)}>
            <CardContent>
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                  Username
                </Typography>
                <TextField
                  id="username"
                  variant="filled"
                  placeholder="Enter your username"
                  fullWidth
                  {...register("username")}
                />
                {errors?.username?.message && (
                  <Typography variant="body2" color="error">
                    {errors.username.message}
                  </Typography>
                )}
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                  Password
                </Typography>
                <TextField
                  id="password"
                  variant="filled"
                  placeholder="Enter your password"
                  type="password"
                  fullWidth
                  {...register("password")}
                />
                {errors?.password?.message && (
                  <Typography variant="body2" color="error">
                    {errors.password.message}
                  </Typography>
                )}
              </Box>

              <Button type="submit" variant="contained" fullWidth>
                Login
              </Button>
            </CardContent>
          </form>
        </Card>
      </Container>
    </div>
  );
}

export default App;
