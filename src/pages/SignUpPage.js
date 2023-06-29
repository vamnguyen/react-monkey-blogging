import { Input } from "components/input";
import { Label } from "../components/label";
import React, { useEffect } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Field } from "components/field";
import { Button } from "components/button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "firebase-app/firebase-config";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";

const SignUpPageStyles = styled.div`
  min-height: 100vh;
  padding: 40px;
  .logo {
    margin: 0 auto 20px;
  }
  .heading {
    color: ${(props) => props.theme.primary};
    text-align: center;
    font-weight: bold;
    font-size: 40px;
    margin-bottom: 60px;
  }
  .form {
    max-width: 600px;
    margin: 0 auto;
  }
`;

const schema = yup.object({
  fullName: yup.string().required("Please enter your full name"),
  email: yup
    .string()
    .email("Please enter valid email address")
    .required("Please enter your email address"),
  password: yup
    .string()
    .min(8, "Your password must be at least 8 characters or greater")
    .required("Please enter your password"),
});

const SignUpPage = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    watch,
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const handleSignUp = async (values) => {
    console.log("handleSignUp ~ values:", values);
    if (!isValid) return;
    const user = await createUserWithEmailAndPassword(
      auth,
      values.email,
      values.password
    );
    await updateProfile(auth.currentUser, {
      displayName: values.fullName,
    });
    const colRef = collection(db, "users");
    await addDoc(colRef, {
      fullName: values.fullName,
      email: values.email,
      password: values.password,
    });
    toast.success("Sign up account successfully!", { pauseOnHover: false });
    navigate("/");
  };

  useEffect(() => {
    const arrErrors = Object.values(errors);
    if (arrErrors.length > 0) {
      toast.error(arrErrors[0]?.message, { pauseOnHover: false, delay: 0 });
    }
  }, [errors]);

  return (
    <SignUpPageStyles>
      <div className="container">
        <img srcSet="/logo.png 2x" alt="monkey-blogging" className="logo" />
        <h1 className="heading">Monkey Blogging</h1>
        <form
          className="form"
          onSubmit={handleSubmit(handleSignUp)}
          autoComplete="off"
        >
          <Field>
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              control={control}
            />
          </Field>
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
          <Button
            type="submit"
            style={{ maxWidth: 300, margin: "0 auto" }}
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            Sign Up
          </Button>
        </form>
      </div>
    </SignUpPageStyles>
  );
};

export default SignUpPage;
