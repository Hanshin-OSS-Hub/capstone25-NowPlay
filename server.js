import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

// .env 파일에서 환경 변수 로드
dotenv.config();

const app = express();
const port = 3000;

// CORS 설정
const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// 간단한 HTML 엔티티 디코딩 함수
function decodeHtmlEntities(text) {
    if (typeof text !== 'string') return text;
    return text.replace(/&amp;/g, '&')
               .replace(/&lt;/g, '<')
               .replace(/&gt;/g, '>')
               .replace(/&quot;/g, '"')
               .replace(/&#39;/g, "'");
}

// GET /recommend 엔드포인트
app.get('/recommend', async (req, res) => {
  const { weather } = req.query;
  const apiKey = process.env.GOOGLE_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'Google API 키가 설정되지 않았습니다. .env 파일을 확인해주세요.' });
  }

  let searchQuery = '신나는 최신 가요'; // 기본 검색어
  switch (weather) {
    case 'Rain': searchQuery = '비 오는 날 듣기 좋은 감성 노래 모음'; break;
    case 'Clear': searchQuery = '맑은 날 드라이브 팝송'; break;
    case 'Snow': searchQuery = '겨울 눈 오는 날 재즈'; break;
  }

  try {
    // 1단계: 'search.list' API로 동영상 ID 목록 검색
    const searchUrl = 'https://www.googleapis.com/youtube/v3/search';
    const searchResponse = await axios.get(searchUrl, {
      params: {
        part: 'snippet',
        q: searchQuery,
        key: apiKey,
        type: 'video',
        maxResults: 20, // 더 많은 결과를 가져와서 필터링 대비
      },
    });

    const videoIds = searchResponse.data.items.map(item => item.id.videoId).join(',');

    if (!videoIds) {
      return res.json([]);
    }

    // 2단계: 'videos.list' API로 각 동영상의 상세 정보(임베드 가능 여부 포함) 확인
    const videosUrl = 'https://www.googleapis.com/youtube/v3/videos';
    const videosResponse = await axios.get(videosUrl, {
      params: {
        part: 'snippet,status',
        id: videoIds,
        key: apiKey,
      },
    });

    // 3단계: 임베드 가능한 동영상만 필터링하고 프론트엔드에 맞게 가공
    const embeddableItems = videosResponse.data.items
      .filter(item => item.status.embeddable === true)
      .map(item => ({
        title: decodeHtmlEntities(item.snippet.title),
        thumbnailUrl: item.snippet.thumbnails.high.url,
        videoId: item.id,
        channelTitle: item.snippet.channelTitle,
        publishTime: item.snippet.publishTime,
      }))
      .slice(0, 10); // 최종 10개만 반환

    res.json(embeddableItems);

  } catch (error) {
    const errorMessage = error.response ? error.response.data.error.message : error.message;
    console.error('YouTube API Error:', errorMessage);
    res.status(500).json({ 
        error: 'YouTube API에서 데이터를 가져오는 데 실패했습니다.',
        details: errorMessage
    });
  }
});

app.listen(port, () => {
  console.log(`Express 서버가 http://localhost:${port} 에서 실행 중입니다.`);
});