import React, { useEffect, useState } from 'react';
import styles from './page6.module.css';

export default function Page6() {
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
      window.__nowplay_time_interval_6__ = intervalId;
    }, msToNextMinute);
    return () => {
      clearTimeout(timeoutId);
      if (window.__nowplay_time_interval_6__) {
        clearInterval(window.__nowplay_time_interval_6__);
        delete window.__nowplay_time_interval_6__;
      }
    };
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.statusBar}>
        <div>{timeString}</div>
        <div aria-hidden="true"></div>
      </div>
      <div className={styles.heroContainer}>
        <img src="https://placehold.co/400x500" alt="Album Art" className={styles.heroImage} />
        <div className={styles.playerOverlay}>
          <div className={styles.trackInfoOverlay}>
            <div className={styles.trackTitleOverlay}>Calm Morning</div>
            <div className={styles.trackArtistOverlay}>Artist Name</div>
          </div>
          <div className={styles.progressBar}>
            <div className={styles.progressFill}></div>
          </div>
        </div>
      </div>
    </div>
  );
}