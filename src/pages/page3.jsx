import React, { useEffect, useState } from 'react';
import styles from './page3.module.css';

export default function Page3(){
  const [timeString, setTimeString] = useState(() => new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}));

  useEffect(() => {
    const update = () => setTimeString(new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}));
    const now = new Date();
    const msToNextMinute = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();
    const timeoutId = setTimeout(() => {
      update();
      const intervalId = setInterval(update, 60 * 1000);
      (window.__nowplay_time_interval_3__ = intervalId);
    }, msToNextMinute);
    return () => {
      clearTimeout(timeoutId);
      if (window.__nowplay_time_interval_3__) { clearInterval(window.__nowplay_time_interval_3__); delete window.__nowplay_time_interval_3__; }
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
        <div className={styles.cardList}>
          <div>
            <div className={styles.label}>선택 정보</div>
            <div className={styles.selectRow}>
              <span className={styles.selectText}>MBTI</span>
              <div style={{width:24, height:24}}>
                <div style={{width:'14.01px', height:'8.01px', background:'#999999', margin:'8.99px 5px 0'}} />
              </div>
            </div>
          </div>
          <div className={styles.selectRow}>
            <span className={styles.selectText}>기념일</span>
            <div style={{width:24, height:24}}>
              <div style={{width:'14.01px', height:'8.01px', background:'#999999', margin:'8.99px 5px 0'}} />
            </div>
          </div>
          <div className={styles.selectRow}>
            <span className={styles.selectText}>선호 장르</span>
            <div style={{width:24, height:24}}>
              <div style={{width:'14.01px', height:'8.01px', background:'#999999', margin:'8.99px 5px 0'}} />
            </div>
          </div>
          <div className={styles.selectRow}>
            <span className={styles.selectText}>기분 태그</span>
            <div style={{width:24, height:24}}>
              <div style={{width:'14.01px', height:'8.01px', background:'#999999', margin:'8.99px 5px 0'}} />
            </div>
          </div>
          <button className={styles.primary}>가입하기</button>
        </div>
      </main>
    </div>
  );
}