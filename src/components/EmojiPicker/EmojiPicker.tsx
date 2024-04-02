import styles from './emoji-picker.module.css'
import EmojiPicker from 'emoji-picker-react'
type EmojiPickerProps = {
  isOpen: boolean
  onPick: (emoji: string) => void
}

export default function EmojiContainer({isOpen, onPick}: EmojiPickerProps) {
  return <div className={styles.container}>
    <EmojiPicker open={isOpen} onEmojiClick={(emoji) => onPick(emoji.emoji)}/>
  </div>
}