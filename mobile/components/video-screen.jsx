import { useEvent } from "expo";
import { useVideoPlayer, VideoView } from "expo-video";
import { StyleSheet, View, Button, Dimensions } from "react-native";

export default function VideoScreen({ videoSource }) {
  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    player.muted = true;
  });

  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

  return (
    <View style={styles.contentContainer}>
      <VideoView
        style={styles.video}
        player={player}
        allowsFullscreen
        allowsPictureInPicture
      />
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
});
