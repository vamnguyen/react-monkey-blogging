import { useAuth } from "contexts/auth-context";
import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthenticationPage from "./AuthenticationPage";
import { useForm } from "react-hook-form";
import { Field } from "components/field";
import { Label } from "components/label";
import { Input } from "components/input";
import { Button } from "components/button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "firebase-app/firebase-config";

const schema = yup.object({
  email: yup
    .string()
    .email("Please enter valid email address")
    .required("Please enter your email address"),
  password: yup
    .string()
    .min(8, "Your password must be at least 8 characters or greater")
    .required("Please enter your password"),
});

const LoginPage = () => {
  const {
    handleSubmit,
    control,
    formState: { isValid, isSubmitting, errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const arrErrors = Object.values(errors);
    if (arrErrors.length > 0) {
      toast.error(arrErrors[0]?.message, { pauseOnHover: false, delay: 0 });
    }
  }, [errors]);

  const { userInfo } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Login Page";
    if (userInfo?.email) navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = async (values) => {
    if (!isValid) return;
    await signInWithEmailAndPassword(auth, values.email, values.password);
    navigate("/");
  };

  return (
    <AuthenticationPage>
      <form
        className="form"
        onSubmit={handleSubmit(handleLogin)}
        autoComplete="off"
      >
        <Field>
          <Label htmlFor="email">Email address</Label>
          <Input
            type="email"
            name="email"
            placeholder="Enter your email"
            control={control}
          />
        </Field>
        <Field>
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            name="password"
            placeholder="Enter your password"
            control={control}
          />
        </Field>
        <div className="have-account">
          You have not had an account?{" "}
          <NavLink to={"/sign-up"}>Create new account</NavLink>
        </div>
        <Button
          type="submit"
          style={{ maxWidth: 300, margin: "0 auto" }}
          isLoading={isSubmitting}
          disabled={isSubmitting}
          kind="primary"
        >
          Login
        </Button>
      </form>
    </AuthenticationPage>
  );
};

export default LoginPage;
