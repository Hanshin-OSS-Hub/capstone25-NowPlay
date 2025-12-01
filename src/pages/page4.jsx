import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './page4.module.css';

// 백엔드 서버에서 음악을 가져오는 함수
async function fetchMusic(weather) {
  // 'Default'는 서버에서 기본값으로 처리하므로 쿼리를 비워둡니다.
  const weatherQuery = weather === 'Default' ? '' : `?weather=${weather}`;
  const response = await fetch(`http://localhost:3000/recommend${weatherQuery}`);
  
  if (!response.ok) {
    const errorInfo = await response.json();
    throw new Error(errorInfo.details || '음악을 불러오는 데 실패했습니다.');
  }
  
  return response.json();
}


export default function Page4() {
  // 상단의 시간 표시는 기존 코드를 유지합니다.
  const [timeString, setTimeString] = useState(() => 
    new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  );

  // --- 음악 추천 상태 관리 ---
  const [musicList, setMusicList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedWeather, setSelectedWeather] = useState('Default'); // 'Default', 'Clear', 'Rain', 'Snow'

  useEffect(() => {
    // 시간 업데이트 로직 (기존과 동일)
    const update = () => setTimeString(
      new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    );
    const now = new Date();
    const msToNextMinute = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();
    const timeoutId = setTimeout(() => {
      update();
      const intervalId = setInterval(update, 60 * 1000);
      // 클린업을 위해 window 객체에 intervalId 저장
      window.__nowplay_time_interval_4__ = intervalId;
    }, msToNextMinute);

    return () => {
      clearTimeout(timeoutId);
      if (window.__nowplay_time_interval_4__) {
        clearInterval(window.__nowplay_time_interval_4__);
        delete window.__nowplay_time_interval_4__;
      }
    };
  }, []);

  // --- 날씨가 변경될 때마다 서버에서 음악 목록을 가져오는 로직 ---
  useEffect(() => {
    const loadMusic = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchMusic(selectedWeather);
        setMusicList(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    loadMusic();
  }, [selectedWeather]); // selectedWeather가 바뀔 때마다 이 useEffect가 다시 실행됩니다.

  const weatherOptions = [
    { value: 'Default', label: '오늘의 추천' },
    { value: 'Clear', label: '맑은 날☀️' },
    { value: 'Rain', label: '비 오는 날☔' },
    { value: 'Snow', label: '눈 오는 날❄️' },
  ];

  return (
    <div className={styles.page}>
      <div className={styles.statusBar}>
        <div>{timeString}</div>
        <div aria-hidden="true"></div>
      </div>

      <main className={styles.content}>
        <h1>(name)님, 지금 날씨에 어울리는 음악을 추천해 드릴게요!</h1>
        
        {/* --- 날씨 선택 버튼 --- */}
        <div className={styles.weatherButtons}>
          {weatherOptions.map(opt => (
            <button 
              key={opt.value} 
              className={`${styles.weatherButton} ${selectedWeather === opt.value ? styles.active : ''}`}
              onClick={() => setSelectedWeather(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* --- 음악 목록 또는 상태 메시지 --- */}
        <div className={styles.musicListContainer}>
          {loading && <p>음악을 불러오는 중...</p>}
          {error && <p className={styles.errorText}>오류: {error}</p>}
          {!loading && !error && (
            <div className={styles.musicGrid}>
              {musicList.map((music) => (
                <Link 
                  key={music.videoId}
                  to="/page5"
                  state={{ currentMusic: music, playlist: musicList }}
                  className={styles.musicCard}
                >
                  <img src={music.thumbnailUrl} alt={music.title} className={styles.thumbnail} />
                  <div className={styles.musicInfo}>
                    <h3 className={styles.title}>{music.title}</h3>
                    <p className={styles.channel}>{music.channelTitle}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      
      {/* 하단 네비게이션 바 (기존과 동일) */}
      <nav className={styles.navbar}>
        <div className={styles.navItem}><span>🏠</span>Home</div>
        <div className={styles.navItem}><span>📜</span>History</div>
        <div className={styles.navItem}><span>👤</span>Profile</div>
      </nav>
    </div>
  );
}
