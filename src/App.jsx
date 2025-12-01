import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Page1 from './pages/page1.jsx';
import Page2 from './pages/page2.jsx';
import Page3 from './pages/page3.jsx';
import Page4 from './pages/page4.jsx';
import Page5 from './pages/page5.jsx';
import Page6 from './pages/page6.jsx';
import Page7 from './pages/page7.jsx';
import Page8 from './pages/page8.jsx';
import Page9 from './pages/page9.jsx';
import Page10 from './pages/page10.jsx';

function App() {
  return (
    <div style={{display: 'flex', flexDirection: 'column', height: '100vh'}}>
      <nav style={{marginBottom: '20px', padding: '10px', backgroundColor: '#f0f0f0', zIndex: 10}}>
        <ul style={{display: 'flex', gap: '10px', flexWrap: 'wrap', listStyle: 'none', padding: 0, margin: 0}}>
          <li><Link to="/1">Page 1</Link></li>
          <li><Link to="/2">Page 2</Link></li>
          <li><Link to="/3">Page 3</Link></li>
          <li><Link to="/recommend">Page 4 (Recommend)</Link></li>
          <li><Link to="/page5">Page 5 (Player)</Link></li>
          <li><Link to="/6">Page 6</Link></li>
          <li><Link to="/7">Page 7</Link></li>
          <li><Link to="/8">Page 8</Link></li>
          <li><Link to="/9">Page 9</Link></li>
          <li><Link to="/10">Page 10</Link></li>
        </ul>
      </nav>
      <div style={{flex: 1, overflow: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', padding: '20px', backgroundColor: '#f5f5f5'}}>
        <div style={{width: '412px', backgroundColor: 'white', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', borderRadius: '8px', overflow: 'hidden'}}>
          <Routes>
            <Route path="/1" element={<Page1 />} />
            <Route path="/2" element={<Page2 />} />
            <Route path="/3" element={<Page3 />} />
            <Route path="/recommend" element={<Page4 />} />
            <Route path="/page5" element={<Page5 />} />
            <Route path="/6" element={<Page6 />} />
            <Route path="/7" element={<Page7 />} />
            <Route path="/8" element={<Page8 />} />
            <Route path="/9" element={<Page9 />} />
            <Route path="/10" element={<Page10 />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;