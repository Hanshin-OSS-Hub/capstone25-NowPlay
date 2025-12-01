import React, { useEffect, useState } from 'react';
import styles from './page10.module.css';

export default function Page10() {
  const [timeString, setTimeString] = useState(() => 
    new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  );

  const [formData, setFormData] = useState({
    nickname: '캡스톤',
    mbti: 'ENFP',
    anniversary: '2024-12-25',
    genre: 'Indie Pop',
    mood: '감성'
  });

  useEffect(() => {
    const update = () => setTimeString(
      new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    );
    const now = new Date();
    const msToNextMinute = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();
    const timeoutId = setTimeout(() => {
      update();
      const intervalId = setInterval(update, 60 * 1000);
      window.__nowplay_time_interval_10__ = intervalId;
    }, msToNextMinute);
    return () => {
      clearTimeout(timeoutId);
      if (window.__nowplay_time_interval_10__) {
        clearInterval(window.__nowplay_time_interval_10__);
        delete window.__nowplay_time_interval_10__;
      }
    };
  }, []);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className={styles.page}>
      <div className={styles.statusBar}>
        <div>{timeString}</div>
        <div aria-hidden="true"></div>
      </div>
      <div className={styles.content}>
        <h1>내 프로필</h1>
        
        <div className={styles.profileCard}>
          <div className={styles.avatarContainer}>
            <div className={styles.avatar}>👤</div>
            <div className={styles.profileName}>{formData.nickname}</div>
          </div>
        </div>

        <div className={styles.formContainer}>
          <div className={styles.formGroup}>
            <label className={styles.label}>닉네임</label>
            <input 
              type="text" 
              className={styles.input}
              value={formData.nickname}
              onChange={(e) => handleChange('nickname', e.target.value)}
              placeholder="닉네임을 입력하세요"
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>MBTI</label>
            <input 
              type="text" 
              className={styles.input}
              value={formData.mbti}
              onChange={(e) => handleChange('mbti', e.target.value)}
              placeholder="MBTI를 입력하세요"
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>기념일</label>
            <input 
              type="date" 
              className={styles.input}
              value={formData.anniversary}
              onChange={(e) => handleChange('anniversary', e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>선호 장르</label>
            <input 
              type="text" 
              className={styles.input}
              value={formData.genre}
              onChange={(e) => handleChange('genre', e.target.value)}
              placeholder="장르를 입력하세요"
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>선호 분위기</label>
            <input 
              type="text" 
              className={styles.input}
              value={formData.mood}
              onChange={(e) => handleChange('mood', e.target.value)}
              placeholder="분위기를 입력하세요"
            />
          </div>

          <button className={styles.saveBtn}>저장</button>
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