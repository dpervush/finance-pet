import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";

import styles from "../styles/Registration.module.scss";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <div className={styles.registration}>
      <div className={styles.container}>
        <h1 className={styles.title}>Create new account</h1>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={`${styles.form_item} ${styles.form_item_input}`}>
            <input
              className={styles.input}
              {...register("first_name", {
                required: true,
                // pattern: /^[A-Za-z]+$/i,
              })}
              placeholder="First name"
            />
            <input
              className={styles.input}
              {...register("second_name", {
                required: true,
              })}
              placeholder="Second name"
            />
          </div>
          <div className={`${styles.form_item} ${styles.form_item_input}`}>
            <input
              className={styles.input}
              {...register("email", {
                required: true,
                // pattern: /^[A-Za-z]+$/i,
              })}
              placeholder="email"
            />
          </div>
          <div className={`${styles.form_item} ${styles.form_item_input}`}>
            <input
              className={styles.input}
              type="password"
              {...register("password", { required: true, maxLength: 32 })}
              placeholder="enter password"
            />
          </div>
          <div className={`${styles.form_item} ${styles.form_item_input}`}>
            <input
              className={styles.input}
              type="password"
              {...register("2password", { required: true, maxLength: 32 })}
              placeholder="repeat password"
            />
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
      </div>
    </div>
  );
};

export default Login;
