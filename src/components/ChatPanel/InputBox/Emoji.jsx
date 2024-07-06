import React, { useState } from "react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { MdOutlineEmojiEmotions } from "react-icons/md";

import "./InputBox.scss";

const Emoji = ({ onSelectEmoji }) => {
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const handleSelectEmoji = (emoji) => {
    onSelectEmoji(emoji.native);
    setIsPickerOpen(false);
  };

  return (
    <div className="input_emoji">
      <div
        className="input_emoji-btn"
        onClick={(e) => {
          setIsPickerOpen(!isPickerOpen);
          e.stopPropagation();
        }}
      >
        <MdOutlineEmojiEmotions size={20} cursor={"pointer"} />
      </div>
      {isPickerOpen && (
        <div className="input_emoji-box">
          <Picker
            className="input_emoji-picker"
            data={data}
            theme={"dark"}
            onClickOutside={() => setIsPickerOpen(false)}
            onEmojiSelect={(e) => handleSelectEmoji(e)}
          />
        </div>
      )}
    </div>
  );
};

export default Emoji;
