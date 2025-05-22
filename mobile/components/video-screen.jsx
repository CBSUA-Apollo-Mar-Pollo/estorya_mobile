import { RotateCcw, SquarePlay, Volume2, VolumeOff } from "lucide-react-native";
import { useRef, useState } from "react";
import { Text } from "react-native";
import { StyleSheet, View, Dimensions, TouchableOpacity } from "react-native";
import Video from "react-native-video";

export default function VideoScreen({
  videoSource,
  playingVideoIndex,
  setPlayingVideoIndex,
  index,
  screenFocused,
}) {
  const [muted, setMuted] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const videoRef = useRef(null);

  const toggleMute = () => {
    setMuted(!muted); // Toggle mute state
  };
  const handleVideoEnd = () => {
    setVideoEnded(true); // Set the videoEnded state to true when the video finishes
  };

  const handleWatchAgain = (index) => {
    setPlayingVideoIndex(index); // Set the video to play again
    setVideoEnded(false); // Reset video end state
    videoRef.current.seek(0);
  };

  const shouldPlay = screenFocused && playingVideoIndex === index;

  return (
    <View style={styles.contentContainer} className="relative w-full">
      <Video
        ref={videoRef}
        style={styles.video}
        muted={muted}
        resizeMode="contain"
        paused={!shouldPlay}
        source={{ uri: videoSource }}
        onEnd={handleVideoEnd}
      />

      {videoEnded && playingVideoIndex === index && (
        <View style={styles.overlay} />
      )}

      <TouchableOpacity onPress={toggleMute} className="w-full">
        {muted ? (
          <VolumeOff
            style={{ position: "absolute", bottom: 20, right: 18 }}
            color={"white"}
          />
        ) : (
          <Volume2
            style={{ position: "absolute", bottom: 20, right: 18 }}
            color={"white"}
          />
        )}
      </TouchableOpacity>

      {videoEnded && playingVideoIndex === index && (
        <View style={styles.overlayContent}>
          <View className="flex-row justify-center items-center gap-x-6">
            <View className="flex-col items-center">
              <TouchableOpacity
                style={styles.overlayButton}
                className="rounded-full"
              >
                <SquarePlay color={"white"} size={35} />
              </TouchableOpacity>
              <Text className="text-white">Watch more</Text>
            </View>
            <View className="flex-col items-center">
              <TouchableOpacity
                onPress={() => handleWatchAgain(index)}
                style={styles.overlayButton}
                className="rounded-full"
              >
                <RotateCcw color={"white"} size={35} />
              </TouchableOpacity>
              <Text className="text-white">Watch again</Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
  video: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").width,
  },
  controlsContainer: {
    padding: 10,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black background
    zIndex: 1, // Ensure it's above the video but below other UI elements
  },
  overlayContent: {
    position: "absolute",
    top: "30%",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
    padding: 20,
    borderRadius: 10,
  },
  overlayButton: {
    backgroundColor: "rgba(0, 0, 0, 0.7)", // Button background color (e.g., Tomato color)
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
});
