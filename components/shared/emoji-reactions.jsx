'use client';

import { useState, useEffect } from "react";
import { getAvailableEmojis, createEmoji, destroyEmoji } from "@/lib/fetchData";
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

const EmojiReactions = ({ slug, reactions }) => {
  const [reacts, setReacts] = useState({});

  useEffect(() => {
    getAvailableEmojis().then((result) => {
      let newReacts = new Object();

      result.map((emoji) => {
          let count = 0;
          let isUserReaction = false;

          reactions?.reacts.filter(item => item?.emoji === emoji).map((foundItem) => {
              count += foundItem?.count || 0;
              
              if (emoji === reactions?.device_emoji) {
                  isUserReaction = true;
              }
          });

          newReacts[emoji] = {"count": count, "isUserReaction": isUserReaction}
      });
      setReacts(newReacts);
    });
  }, [reactions]);

  const handleReactionClick = async (emoji) => {
    const copied = { ...reacts };
    const current = reacts[emoji] || { count: 0, isUserReaction: false };

    if (current.isUserReaction) {
      setReacts((prevReacts) => ({
        ...prevReacts,
        [emoji]: { count: Math.max(current.count - 1, 0), isUserReaction: false },
      }));
      
      await destroyEmoji(slug).catch((error) => {
        setReacts(copied);
        console.error(error);

        toastr.error('Произошла ошибка. Пожалуйста, попробуйте позже.');
      });
    } else {

      setReacts((prevReacts) => {
        const updatedReacts = Object.keys(prevReacts).reduce((acc, emoji) => {
          const currentReaction = prevReacts[emoji];
      
          acc[emoji] = {
            ...currentReaction,
            isUserReaction: false,
            count: currentReaction.isUserReaction ? Math.max(currentReaction.count - 1, 0) : currentReaction.count,
          };
      
          return acc;
        }, {});
      
        return {
          ...updatedReacts,
          [emoji]: { count: prevReacts[emoji]?.count + 1 || 1, isUserReaction: true },
        };
      });
      
      await createEmoji(slug, emoji).catch((error) => {
        setReacts(copied);
        console.error(error);
        toastr.error('Произошла ошибка. Пожалуйста, попробуйте позже.');
      });
    }
  };

  return (
    <div className="flex flex-wrap reaction-container">
      {Object.entries(reacts).map(([emoji, data]) => (
        <div
          className="reaction-item"
          key={emoji}
          onClick={() => handleReactionClick(emoji)}
        >
          <span className="emoji">{emoji}</span>
          <span
            className={`reaction-count ${data.count >= 100 ? "max" : ""}`}
          >
            {data.count < 100 ? data.count : "99+"}
          </span>
        </div>
      ))}
    </div>
  );
};

export default EmojiReactions;
