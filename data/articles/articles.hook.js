"use client";

import React, { createContext, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import * as articleAPI from "@/data/articles/fetcher"; // Assuming your API file is located here

// Create the ArticlesContext
const ArticlesContext = createContext(null);

// Provider Component
export const ArticlesQueryProvider = ({ children }) => {
  const queryClient = useQueryClient();

  const contextValue = {
    queryClient,
  };

  return (
    <ArticlesContext.Provider value={contextValue}>
      {children}
    </ArticlesContext.Provider>
  );
};

// Hook to access the ArticlesContext
const useArticlesContext = () => {
  const context = useContext(ArticlesContext);
  if (!context) {
    throw new Error("useArticlesContext must be used within an ArticlesQueryProvider");
  }
  return context;
};

// Custom Hooks

/** Fetch Articles */
export const useFetchArticles = (url) =>
  useQuery(["articles", url], () => articleAPI.fetchArticles(url), {
    enabled: !!url,
  });

/** Fetch Article by Slug */
export const useFetchArticleBySlug = (url) =>
  useQuery(["article", url], () => articleAPI.fetchArticlebySlug(url), {
    enabled: !!url,
  });

/** Fetch Article Categories */
export const useFetchArticleCategories = (url) =>
  useQuery(
    ["categories", url],
    () => articleAPI.fetchArticlesCategories(url),
    {
      enabled: !!url,
    }
  );

/** Create Article */
export const useCreateArticle = () => {
  const { queryClient } = useArticlesContext();
  return useMutation(articleAPI.createArticle, {
    onSuccess: () => {
      queryClient.invalidateQueries("articles"); // Refetch articles
    },
  });
};

/** Update Article */
export const useUpdateArticle = () => {
  const { queryClient } = useArticlesContext();
  return useMutation(articleAPI.updateArticle, {
    onSuccess: () => {
      queryClient.invalidateQueries("articles"); // Refetch articles
    },
  });
};

/** Delete Article */
export const useDeleteArticle = () => {
  const { queryClient } = useArticlesContext();
  return useMutation(articleAPI.deleteArticle, {
    onSuccess: () => {
      queryClient.invalidateQueries("articles"); // Refetch articles
    },
  });
};

/** Fetch Comments */
export const useFetchComments = (url) =>
  useQuery(["comments", url], () => articleAPI.fetchComments(url), {
    enabled: !!url,
  });

/** Create Comment */
export const useCreateComment = () => {
  const { queryClient } = useArticlesContext();
  return useMutation(articleAPI.createComment, {
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(["comments", variables.blog]); // Refetch comments
    },
  });
};

/** Update Comment */
export const useUpdateComment = () => {
  const { queryClient } = useArticlesContext();
  return useMutation(articleAPI.updateComment, {
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(["comments", variables.blog]); // Refetch comments
    },
  });
};

/** Delete Comment */
export const useDeleteComment = () => {
  const { queryClient } = useArticlesContext();
  return useMutation(articleAPI.deleteComment, {
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries("comments"); // Refetch comments
    },
  });
};

/** Increment Views of an Article */
export const useIncrementView = () => {
  const { queryClient } = useArticlesContext();
  return useMutation(articleAPI.incrementView, {
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(["article", variables.id]); // Refetch the article
    },
  });
};

/** Add Like */
export const useAddLike = () => {
  const { queryClient } = useArticlesContext();
  return useMutation(articleAPI.addLike, {
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(["article", variables.Article.id]); // Refetch the article
    },
  });
};

/** Delete Like */
export const useDeleteLike = () => {
  const { queryClient } = useArticlesContext();
  return useMutation(articleAPI.deleteLike, {
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(["article", variables.Article.id]); // Refetch the article
    },
  });
};
