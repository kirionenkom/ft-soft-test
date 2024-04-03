import { IMessage } from '../../interfaces/IMessage';
import styles from './reply-area.module.css';

type ReplyAreaProps = {
  replyMessage: IMessage;
  isMessageWithImage: boolean;
  dropReplyImage: () => void
};

export default function ReplyArea({ replyMessage, isMessageWithImage, dropReplyImage }: ReplyAreaProps) {
  return (
    <div
      className={styles.replyArea}
      style={{
        bottom: isMessageWithImage ? 'calc(100% / 12 + 104px)' : 'calc(100% / 12)',
      }}
    >
      <div>
        <p className={styles.replyAuthor}>{replyMessage.sender.name}</p>
        <p className={styles.replyText}>
          {replyMessage.text.length > 50
            ? replyMessage.text.slice(0, 50) + '...'
            : replyMessage.text}
        </p>
      </div>
      <button
        className={styles.removeReply}
        type={'button'}
        onClick={dropReplyImage}
      />
    </div>
  );
}