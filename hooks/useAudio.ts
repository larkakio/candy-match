import { useEffect, useRef, useState } from 'react'
import { Howl } from 'howler'

export function useAudio() {
  const sliceSoundRef = useRef<Howl | null>(null)
  const completeSoundRef = useRef<Howl | null>(null)
  const bgMusicRef = useRef<Howl | null>(null)
  const [soundEnabled, setSoundEnabled] = useState(true)

  useEffect(() => {
    // Initialize sounds with fallback to silent audio if files don't exist
    try {
      sliceSoundRef.current = new Howl({
        src: ['/sounds/slice.mp3'],
        volume: 0.5,
        onloaderror: () => {
          // Fallback: create silent sound
          sliceSoundRef.current = null
        },
      })

      completeSoundRef.current = new Howl({
        src: ['/sounds/complete.mp3'],
        volume: 0.7,
        onloaderror: () => {
          completeSoundRef.current = null
        },
      })

      bgMusicRef.current = new Howl({
        src: ['/sounds/bg-music.mp3'],
        volume: 0.3,
        loop: true,
        onloaderror: () => {
          bgMusicRef.current = null
        },
      })
    } catch (error) {
      console.warn('Audio initialization failed:', error)
    }

    return () => {
      sliceSoundRef.current?.unload()
      completeSoundRef.current?.unload()
      bgMusicRef.current?.unload()
    }
  }, [])

  const playSlice = () => {
    if (soundEnabled && sliceSoundRef.current) {
      sliceSoundRef.current.play()
    }
  }

  const playComplete = () => {
    if (soundEnabled && completeSoundRef.current) {
      completeSoundRef.current.play()
    }
  }

  const playBackgroundMusic = () => {
    if (soundEnabled && bgMusicRef.current && !bgMusicRef.current.playing()) {
      bgMusicRef.current.play()
    }
  }

  const stopBackgroundMusic = () => {
    bgMusicRef.current?.stop()
  }

  return {
    playSlice,
    playComplete,
    playBackgroundMusic,
    stopBackgroundMusic,
    soundEnabled,
    setSoundEnabled,
  }
}
