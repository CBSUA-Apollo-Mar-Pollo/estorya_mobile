import { useEvent } from "expo";
import { useVideoPlayer, VideoView } from "expo-video";
import { StyleSheet, View, Button } from "react-native";

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
  },
  video: {
    width: 350,
    height: 275,
  },
  controlsContainer: {
    padding: 10,
  },
});
