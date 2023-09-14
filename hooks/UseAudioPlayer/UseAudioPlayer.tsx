import { useEffect, useRef } from "react";
import { Howl } from "howler";
import * as songModel from "@/store/audio";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

interface AudioWrapperProps {
  src: string | undefined;
  children: (props: { handlePlaySong: () => void }) => React.ReactNode;
}

const UseAudioPlayer: React.FC<AudioWrapperProps> = ({ src, children }) => {
  const dispatch = useAppDispatch();
  const songRef = useRef<Howl | null>(null);
  const audioState = useAppSelector((state) => state.audioReducer);
  const { playSong, togglePlayPause, setSongPercentage, setIsLoading, reset } = songModel;

  const handlePlaySong = () => {
    if (src === audioState?.currentSong?.media) {
      if (songRef?.current?.playing()) {
        songRef.current?.pause();
        dispatch(togglePlayPause());
      } else {
        songRef.current?.play();
        dispatch(togglePlayPause());
      }
    } else if (src) {
      dispatch(playSong({ media: src, percentage: 0, isPlaying: false }));
      dispatch(setIsLoading(true));
      const newSound = new Howl({
        src: [src],
        format: ["mp3", "wav"],
        html5: true,
        preload: true,
      });
      newSound.once("load", () => {
        dispatch(setIsLoading(false));
        songRef.current = newSound;
        dispatch(
          playSong({
            media: src,
            percentage: 0,
            isPlaying: true,
          })
        );
        newSound.play();
      });
    }
  };

  useEffect(() => {
    if (audioState?.currentSong?.media !== src) {
      songRef.current?.stop();
      songRef.current?.unload();
    }
  }, [audioState?.currentSong?.media]);

  return <>{children({ handlePlaySong })}</>;
};

export default UseAudioPlayer;
