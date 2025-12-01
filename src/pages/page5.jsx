import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import YouTube from 'react-youtube';
import styles from './page5.module.css';

// 초를 MM:SS 형식으로 변환하는 함수
function formatTime(seconds) {
  if (isNaN(seconds)) return '00:00';
  const floorSeconds = Math.floor(seconds);
  const min = Math.floor(floorSeconds / 60);
  const sec = floorSeconds % 60;
  return `${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`;
}

export default function Page5() {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentMusic, playlist } = location.state || {};

  // --- 상태 관리 ---
  const [player, setPlayer] = useState(null); // YouTube 플레이어 객체
  const [isPlaying, setIsPlaying] = useState(false); // 재생 상태
  const [currentTime, setCurrentTime] = useState(0); // 현재 재생 시간
  const [duration, setDuration] = useState(0); // 총 영상 길이
  
  const progressBarRef = useRef(null); // 프로그레스 바 DOM 요소
  const intervalRef = useRef(null); // setInterval ID 저장

  // --- 플레이어 이벤트 핸들러 ---
  const onReady = (event) => {
    setPlayer(event.target);
    setDuration(event.target.getDuration());
  };

  const onStateChange = (event) => {
    // event.data 값: 1(재생), 2(일시정지), 0(종료) 등
    setIsPlaying(event.data === 1);
  };
  
  // --- 재생 시간 동기화 ---
  useEffect(() => {
    // isPlaying 상태가 변경될 때마다 실행
    if (isPlaying) {
      // 영상이 재생 중이면 1초마다 현재 시간을 업데이트
      intervalRef.current = setInterval(() => {
        setCurrentTime(player.getCurrentTime());
      }, 1000);
    } else {
      // 영상이 멈추면 인터벌 정리
      clearInterval(intervalRef.current);
    }
    // 컴포넌트가 언마운트될 때 인터벌 정리
    return () => clearInterval(intervalRef.current);
  }, [isPlaying, player]);

  // --- 컨트롤 핸들러 ---
  const togglePlay = () => {
    if (isPlaying) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  };

  const handleSeek = (event) => {
    if (!progressBarRef.current) return;
    const bar = progressBarRef.current;
    // 프로그레스 바의 전체 너비와 클릭 위치 계산
    const rect = bar.getBoundingClientRect();
    const clickPosition = event.clientX - rect.left;
    const barWidth = bar.clientWidth;
    const seekTime = (clickPosition / barWidth) * duration;
    
    player.seekTo(seekTime, true);
    setCurrentTime(seekTime);
  };

  // --- 렌더링 ---
  if (!currentMusic) {
    // 직접 접근 시 예외 처리
    return (
      <div className={styles.page}>
        <main className={styles.content} style={{ textAlign: 'center', paddingTop: '50%' }}>
          <h2>선택된 노래가 없습니다.</h2>
          <Link to="/recommend" className={styles.backLink}>추천 페이지로 돌아가기</Link>
        </main>
      </div>
    );
  }

  const currentIndex = playlist.findIndex(item => item.videoId === currentMusic.videoId);
  const nextMusic = playlist[currentIndex + 1];

  const playerOpts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1, // 자동 재생
    },
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <button onClick={() => navigate(-1)} className={styles.backButton}>&lt;</button>
        <h1>Now Playing</h1>
      </header>
      
      <main className={styles.content}>
        <div className={styles.videoContainer}>
          <YouTube videoId={currentMusic.videoId} opts={playerOpts} onReady={onReady} onStateChange={onStateChange} />
        </div>

        <div className={styles.trackInfo}>
          <h2 className={styles.trackTitle}>{currentMusic.title}</h2>
          <p className={styles.trackChannel}>{currentMusic.channelTitle}</p>
        </div>

        {/* --- 인터랙티브 프로그레스 바 --- */}
        <div className={styles.progressBarContainer}>
          <div className={styles.timeLabel}>{formatTime(currentTime)}</div>
          <div className={styles.progressBar} ref={progressBarRef} onClick={handleSeek}>
            <div className={styles.progress} style={{ width: `${(currentTime / duration) * 100}%` }}>
              <div className={styles.progressHandle}></div>
            </div>
          </div>
          <div className={styles.timeLabel}>{formatTime(duration)}</div>
        </div>
        
        {/* --- 재생/일시정지 버튼 --- */}
        <div className={styles.controls}>
            <button onClick={togglePlay} className={styles.playPauseButton}>
                {isPlaying ? '❚❚' : '▶'}
            </button>
        </div>

        {/* --- 'Up Next' 섹션 --- */}
        {nextMusic && (
          <div className={styles.upNextSection}>
            <h2>Up Next</h2>
            <Link 
              to="/page5" 
              state={{ currentMusic: nextMusic, playlist: playlist }} 
              className={styles.upNextCard}
              onClick={() => setCurrentTime(0)} // 다음 곡으로 넘어갈 때 시간 초기화
            >
              <img src={nextMusic.thumbnailUrl} alt={nextMusic.title} className={styles.upNextThumbnail} />
              <div className={styles.upNextInfo}>
                <h3 className={styles.upNextTitle}>{nextMusic.title}</h3>
                <p className={styles.upNextChannel}>{nextMusic.channelTitle}</p>
              </div>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}