import React, { useEffect, useState } from 'react';
import styles from './page2.module.css';

export default function Page2(){
  const [timeString, setTimeString] = useState(() => new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}));

  useEffect(() => {
    const update = () => setTimeString(new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}));
    const now = new Date();
    const msToNextMinute = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();
    const timeoutId = setTimeout(() => {
      update();
      const intervalId = setInterval(update, 60 * 1000);
      (window.__nowplay_time_interval_2__ = intervalId);
    }, msToNextMinute);
    return () => {
      clearTimeout(timeoutId);
      if (window.__nowplay_time_interval_2__) { clearInterval(window.__nowplay_time_interval_2__); delete window.__nowplay_time_interval_2__; }
    };
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.statusBar}>
        <div>{timeString}</div>
        <div aria-hidden="true"></div>
      </div>

      <div className={styles.backWrap}>
        <div className={styles.backIcon} aria-hidden="true" />
      </div>

      <header className={styles.header}>
        <div className={styles.title}>회원가입</div>
      </header>

      <main className={styles.main}>
        <div className={styles.form}>
          <input className={styles.input} placeholder="닉네임" />
          <input className={styles.input} placeholder="아이디" />
          <input className={styles.input} type="password" placeholder="비밀번호" />
          <input className={styles.input} type="password" placeholder="비밀번호 확인" />
          <button className={styles.primary}>다음</button>
        </div>
      </main>
    </div>
  );
}