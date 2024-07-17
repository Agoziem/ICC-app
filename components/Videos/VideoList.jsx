// components/VideoList.js
import React, { useContext, useEffect } from 'react';
import { VideoContext } from '../context/VideoContext';

const VideoList = () => {
  const { videos, fetchVideos, loading, error } = useContext(VideoContext);

  useEffect(() => {
    fetchVideos();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Video List</h1>
      <ul>
        {videos.map((video) => (
          <li key={video.id}>{video.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default VideoList;
