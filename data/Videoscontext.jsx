"use client";
import React, { createContext, useState, useEffect, useContext } from "react";
import { OrganizationContext } from "./Organizationalcontextdata";
import { converttoformData } from "@/utils/formutils";

// Create the context
const VideoContext = createContext();

const VideoProvider = ({ children }) => {
  const { organizationID } = useContext(OrganizationContext);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [totalVideos, setTotalVideos] = useState(0);

  // ------------------------------------------------------
  // Fetch all videos and paginate them
  // ------------------------------------------------------
  const fetchVideos = async (organizationID, page = 1, pageSize = 10) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/vidoesapi/videos/${organizationID}/?page=${page}&page_size=${pageSize}`
      );
      if (response.ok) {
        const data = await response.json();
        setVideos(data.results);
        setTotalVideos(data.count);
        setTotalPages(Math.ceil(data.count / pageSize));
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      return { type: "danger", message: "Error fetching videos" };
    }
  };

  // ------------------------------------------------------
  // Fetch all videos by category and paginate them
  // ------------------------------------------------------
  const fetchVideosByCategory = async (category, page = 1, pageSize = 10) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/vidoesapi/videos/${organizationID}/?category=${category}&page=${page}&page_size=${pageSize}`
      );
      if (response.ok) {
        const data = await response.json();
        setVideos(data.results);
        setTotalVideos(data.count);
        setTotalPages(Math.ceil(data.count / pageSize));
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      return { type: "danger", message: "Error fetching videos" };
    }
  };

  // ------------------------------------------------------
  // Fetch a single video by ID
  // ------------------------------------------------------
  const fetchVideoById = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/vidoesapi/video/${id}`
      );
      if (response.ok) {
        const data = await response.json();
        setLoading(false);
        return data;
      }
    } catch (error) {
      setLoading(false);
      return { type: "danger", message: "Error fetching video" };
    }
  };

  // ------------------------------------------------------
  // fetch video by token
  // ------------------------------------------------------
  const fetchVideoByToken = async (token) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/vidoesapi/video_by_token/${token}/`
      );
      if (response.ok) {
        const data = await response.json();
        setLoading(false);
        return data;
      }
    } catch (error) {
      setLoading(false);
      return { type: "danger", message: "Error fetching video" };
    }
  };

  // ------------------------------------------------------
  // Create a new video
  // ------------------------------------------------------
  const createVideo = async (video) => {
    setLoading(true);
    const formData = converttoformData(video, [
      "category",
      "organization",
      "subcategory",
    ]);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/vidoesapi/add_video/${organizationID}/`,
        {
          method: "POST",
          body: formData,
        }
      );
      if (response.ok) {
        const data = await response.json();
        setVideos([data, ...videos]);
        setLoading(false);
        return { type: "success", message: "Video created successfully" };
      } else {
        setLoading(false);
        return { type: "danger", message: "Error creating video" };
      }
    } catch (error) {
      setLoading(false);
      return { type: "danger", message: "Error creating video" };
      danger;
    }
  };

  // ------------------------------------------------------
  // Update an existing video
  // ------------------------------------------------------
  const updateVideo = async (id, updatedVideo) => {
    setLoading(true);
    const formData = converttoformData(updatedVideo, [
      "category",
      "organization",
      "subcategory",
    ]);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/vidoesapi/update_video/${id}/`,
        {
          method: "PUT",
          body: formData,
        }
      );
      if (response.ok) {
        const data = await response.json();
        setVideos(videos.map((video) => (video.id === id ? data : video)));
        setLoading(false);
        return { type: "success", message: "Video updated successfully" };
      } else {
        setLoading(false);
        return { type: "danger", message: "Error updating video" };
      }
    } catch (error) {
      setLoading(false);
      return { type: "danger", message: "Error updating video" };
    }
  };

  // ------------------------------------------------------
  // Delete a video
  // ------------------------------------------------------
  const deleteVideo = async (id) => {
    setLoading(true);
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/vidoesapi/delete_video/${id}/`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setVideos(videos.filter((video) => video.id !== id));
        setLoading(false);
        return { type: "success", message: "Video deleted successfully" };
      } else {
        setLoading(false);
        return { type: "danger", message: "Error deleting video" };
      }
    } catch (error) {
      setLoading(false);
      return { type: "danger", message: "Error deleting video" };
    }
  };

  return (
    <VideoContext.Provider
      value={{
        videos,
        setVideos,
        fetchVideos,
        fetchVideoById,
        fetchVideoByToken,
        fetchVideosByCategory,
        createVideo,
        updateVideo,
        deleteVideo,
        loading,
        totalPages,
        totalVideos,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

const useVideoContext = () => {
  return useContext(VideoContext);
};

export { VideoProvider, useVideoContext };
