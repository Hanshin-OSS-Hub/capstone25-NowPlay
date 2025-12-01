import React, { useEffect, useState } from 'react';
import styles from './page7.module.css';

export default function Page7() {
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
      window.__nowplay_time_interval_7__ = intervalId;
    }, msToNextMinute);
    return () => {
      clearTimeout(timeoutId);
      if (window.__nowplay_time_interval_7__) {
        clearInterval(window.__nowplay_time_interval_7__);
        delete window.__nowplay_time_interval_7__;
      }
    };
  }, []);

  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className={styles.page}>
      <div className={styles.statusBar}>
        <div>{timeString}</div>
        <div aria-hidden="true"></div>
      </div>
      <div className={styles.content}>
        <div className={styles.playerCard}>
          <div className={styles.albumArtSmall} style={{backgroundImage: 'url(https://placehold.co/200x200)'}} />
          <div className={styles.trackDetails}>
            <h2 className={styles.songTitle}>Morning Vibes</h2>
            <p className={styles.songArtist}>Lofi Dreams</p>
          </div>
        </div>

        <div className={styles.controlsContainer}>
          <button className={styles.controlBtn}>
            <span className={styles.icon}>⏮</span>
            Previous
          </button>
          <button 
            className={`${styles.playBtn} ${isPlaying ? styles.playing : ''}`}
            onClick={() => setIsPlaying(!isPlaying)}
          >
            <span className={styles.icon}>{isPlaying ? '⏸' : '▶'}</span>
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <button className={styles.controlBtn}>
            <span className={styles.icon}>⏭</span>
            Next
          </button>
        </div>

        <div className={styles.progressContainer}>
          <div className={styles.progressTime}>1:23</div>
          <div className={styles.progressBar}>
            <div className={styles.progressFill}></div>
          </div>
          <div className={styles.progressTime}>3:45</div>
        </div>
      </div>
    </div>
  );
}