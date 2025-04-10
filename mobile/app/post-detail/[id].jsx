import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { PORT } from "../../port";
import ImageList from "../../components/post/image-list";
import SingleImageScreen from "../../components/post/single-image";

const PostScreen = () => {
  const { id } = useLocalSearchParams();

  const fetchPostDetails = async () => {
    const payload = { postId: id };
    try {
      const response = await axios.post(
        `${PORT}/api/v1/posts/postDetails`,
        payload
      );
      return response.data;
    } catch (error) {
      // Catching and logging error without redundancy
      if (error.response) {
        alert("Response error:", error.response);
      } else if (error.request) {
        alert(
          "Request error: we couldn't reach the server. Please try again later."
        );
      } else {
        console.log(error.message);
        alert("Error message:", error.message);
      }
      throw new Error("Failed to fetch data");
    }
  };

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["post-detail", id],
    queryFn: fetchPostDetails,
  });

  if (isLoading && !data) {
    return (
      <View className="flex-col items-center justify-center h-full">
        <ActivityIndicator size={60} color="#000ff" className="mb-20" />
      </View>
    );
  }

  return <ImageList postDetails={data} />;
};

export default PostScreen;
