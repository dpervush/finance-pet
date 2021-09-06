import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";

import styles from "../styles/Login.module.scss";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <div className={styles.login}>
      <div className={styles.container}>
        <h1 className={styles.title}>Log in to your account</h1>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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
              placeholder="password"
            />
          </div>
          <div className={`${styles.form_item} ${styles.info}`}>
            <div className={styles.register}>
              Нет аккаунта?{" "}
              <Link href="/registration">
                <a className={styles.link}>Зарегестрироваться</a>
              </Link>
            </div>
            <div className={styles.reset}>
              <Link href="/login">
                <a className={styles.link}>Забыли пароль?</a>
              </Link>
            </div>
          </div>
          <button type="submit" className={styles.submit_btn}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
