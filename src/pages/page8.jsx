import React, { useEffect, useState } from 'react';
import styles from './page8.module.css';

export default function Page8() {
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
      window.__nowplay_time_interval_8__ = intervalId;
    }, msToNextMinute);
    return () => {
      clearTimeout(timeoutId);
      if (window.__nowplay_time_interval_8__) {
        clearInterval(window.__nowplay_time_interval_8__);
        delete window.__nowplay_time_interval_8__;
      }
    };
  }, []);

  const songs = [
    { title: 'Sunset Dreams', artist: 'Indie Folk Band' },
    { title: 'Morning Coffee', artist: 'Lo-fi Hip Hop' },
    { title: 'City Lights', artist: 'Synthwave Artists' },
    { title: 'Ocean Waves', artist: 'Ambient Music' },
    { title: 'Starry Night', artist: 'Classical Piano' }
  ];

  return (
    <div className={styles.page}>
      <div className={styles.statusBar}>
        <div>{timeString}</div>
        <div aria-hidden="true"></div>
      </div>
      <div className={styles.content}>
        <h1>최근 감상</h1>
        <div className={styles.songList}>
          {songs.map((song, idx) => (
            <div key={idx} className={styles.songCard}>
              <img 
                src={`https://placehold.co/60x60?text=Song${idx + 1}`}
                alt={song.title}
                className={styles.songThumb}
              />
              <div className={styles.songInfo}>
                <div className={styles.songTitle}>{song.title}</div>
                <div className={styles.songArtist}>{song.artist}</div>
              </div>
              <div className={styles.songOption}>⋯</div>
            </div>
          ))}
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