import React, { useEffect, useState } from 'react';
import styles from './page9.module.css';

export default function Page9() {
  const [timeString, setTimeString] = useState(() => 
    new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  );

  useEffect(() => {
    const update = () => setTimeString(
      new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    );
    const now = new Date();
    const msToNextMinute = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();
    const timeoutId = setTimeout(() => {
      update();
      const intervalId = setInterval(update, 60 * 1000);
      window.__nowplay_time_interval_9__ = intervalId;
    }, msToNextMinute);
    return () => {
      clearTimeout(timeoutId);
      if (window.__nowplay_time_interval_9__) {
        clearInterval(window.__nowplay_time_interval_9__);
        delete window.__nowplay_time_interval_9__;
      }
    };
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.statusBar}>
        <div>{timeString}</div>
        <div aria-hidden="true"></div>
      </div>
      <div className={styles.content}>
        <h1>나의 감성 분석</h1>
        
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>이번 주 총 재생</div>
            <div className={styles.statValue}>45</div>
            <div className={styles.statUnit}>곡</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>가장 많이 들은 장르</div>
            <div className={styles.statValue} style={{fontSize: '14px', fontWeight: 600}}>Indie Pop</div>
          </div>
        </div>

        <div className={styles.chartContainer}>
          <h2 className={styles.chartTitle}>주간 감정 지수</h2>
          <div className={styles.chart}>
            <div className={styles.chartBar} style={{height: '60%'}}>
              <span className={styles.chartLabel}>월</span>
            </div>
            <div className={styles.chartBar} style={{height: '75%'}}>
              <span className={styles.chartLabel}>화</span>
            </div>
            <div className={styles.chartBar} style={{height: '45%'}}>
              <span className={styles.chartLabel}>수</span>
            </div>
            <div className={styles.chartBar} style={{height: '80%'}}>
              <span className={styles.chartLabel}>목</span>
            </div>
            <div className={styles.chartBar} style={{height: '55%'}}>
              <span className={styles.chartLabel}>금</span>
            </div>
            <div className={styles.chartBar} style={{height: '70%'}}>
              <span className={styles.chartLabel}>토</span>
            </div>
            <div className={styles.chartBar} style={{height: '65%'}}>
              <span className={styles.chartLabel}>일</span>
            </div>
          </div>
        </div>

        <div className={styles.moodCard}>
          <div className={styles.moodLabel}>현재 선호하는 분위기</div>
          <div className={styles.moodTags}>
            <span className={styles.moodTag}>#감성</span>
            <span className={styles.moodTag}>#차분한</span>
            <span className={styles.moodTag}>#로파이</span>
          </div>
        </div>
      </div>
      <nav className={styles.navbar}>
        <div className={styles.navItem}><span>🏠</span>Home</div>
        <div className={styles.navItem}><span>📜</span>History</div>
        <div className={styles.navItem}><span>👤</span>Profile</div>
      </nav>
    </div>
  );
}