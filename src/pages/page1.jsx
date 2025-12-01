import React, { useEffect, useState } from 'react';
import styles from './page1.module.css';

export default function Page1(){
  const [timeString, setTimeString] = useState(() => {
    const d = new Date();
    return d.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  });

  useEffect(() => {
    // update once at start of next minute, then every minute
    const update = () => setTimeString(new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}));
    // compute ms until next minute
    const now = new Date();
    const msToNextMinute = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();
    const timeoutId = setTimeout(() => {
      update();
      const intervalId = setInterval(update, 60 * 1000);
      // store interval id on window so cleanup can clear it too (scoped inside effect below)
      (window.__nowplay_time_interval__ = intervalId);
    }, msToNextMinute);

    return () => {
      clearTimeout(timeoutId);
      if (window.__nowplay_time_interval__) {
        clearInterval(window.__nowplay_time_interval__);
        delete window.__nowplay_time_interval__;
      }
    };
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.statusBar}>
        <div className={styles.statusLeft}>{timeString}</div>
        <div className={styles.statusIcons} aria-hidden="true"></div>
      </div>
      <header className={styles.header}>
        <div className={styles.logo} aria-hidden="true"></div>
        <h1 className={styles.title}>NowPlay</h1>
        <p className={styles.subtitle}>잠깐의 틈 사이 줍는 나만의 플레이리스트</p>
      </header>

      <main className={styles.main}>
        <div className={styles.form}>
          <input className={styles.input} placeholder="아이디" />
          <input className={styles.input} type="password" placeholder="비밀번호" />
          <button className={styles.primary}>로그인</button>
          <div className={styles.signup}>회원가입</div>
        </div>
      </main>

    </div>
  )
}
