import React from "react";
import { useRouter } from "next/router";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { clearError, registration } from "../store/slices/auth";

import styles from "../styles/Registration.module.scss";
import { useSelector } from "react-redux";

const schema = yup.object().shape({
  firstName: yup.string().required(),
  secondName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(2).max(32).required("Password is required"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const Registration = () => {
  const dispatch = useDispatch();
  const { isAuth, error } = useSelector(({ auth }) => auth);

  const router = useRouter();

  React.useEffect(() => {
    if (isAuth) {
      router.push("/");
    }
  }, [isAuth]);

  const onChangedForm = () => {
    if (error) {
      dispatch(clearError());
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    dispatch(registration(data));
  };

  return (
    <div className={styles.registration}>
      <div className={styles.container}>
        <h1 className={styles.title}>Create new account</h1>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={`${styles.form_item} ${styles.form_item_input}`}>
            <input
              className={styles.input}
              {...register("firstName", {
                required: true,
              })}
              placeholder="First name"
              onChange={onChangedForm}
            />
            {errors.firstName && (
              <span className={styles.error}>{errors.firstName.message}</span>
            )}
          </div>
          <div className={`${styles.form_item} ${styles.form_item_input}`}>
            <input
              className={styles.input}
              {...register("secondName", {
                required: true,
              })}
              placeholder="Second name"
              onChange={onChangedForm}
            />
            {errors.secondName && (
              <span className={styles.error}>{errors.secondName.message}</span>
            )}
          </div>
          <div className={`${styles.form_item} ${styles.form_item_input}`}>
            <input
              className={styles.input}
              {...register("email", {
                required: true,
              })}
              placeholder="email"
              onChange={onChangedForm}
            />
            {errors.email && (
              <span className={styles.error}>{errors.email.message}</span>
            )}
          </div>
          <div className={`${styles.form_item} ${styles.form_item_input}`}>
            <input
              className={styles.input}
              type="password"
              {...register("password", { required: true })}
              placeholder="enter password"
              onChange={onChangedForm}
            />
            {errors.password && (
              <span className={styles.error}>{errors.password.message}</span>
            )}
          </div>
          <div className={`${styles.form_item} ${styles.form_item_input}`}>
            <input
              className={styles.input}
              type="password"
              {...register("passwordConfirmation", {
                required: true,
                maxLength: 32,
              })}
              placeholder="repeat password"
              onChange={onChangedForm}
            />
            {errors.passwordConfirmation && (
              <span className={styles.error}>
                {errors.passwordConfirmation.message}
              </span>
            )}
          </div>
          <div className={`${styles.form_item} ${styles.info}`}>
            <div className={styles.register}>
              Уже есть аккаунт?{" "}
              <Link href="/login">
                <a className={styles.link}>Войти</a>
              </Link>
            </div>
          </div>
          <button type="submit" className={styles.submit_btn}>
            Sign up
          </button>
        </form>
        {error ? (
          <div className={styles.registration_error}>{error}</div>
        ) : null}
      </div>
    </div>
  );
};

export default Registration;
