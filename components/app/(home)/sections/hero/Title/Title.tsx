"use client";

// import dynamic from "next/dynamic";
// import { useRef, useEffect, forwardRef } from "react";

// const originalText =
//   "";

type Options = {
  randomizeChance?: number;
  reversed?: boolean;
};

export const encryptText = (
  text: string,
  progress: number,
  _options?: Options,
) => {
  const options = {
    randomizeChance: 0.7,
    ..._options,
  };

  const encryptionChars = "a-zA-Z0-9*=?!";
  const skipTags = ["<br class='lg-max:hidden'>", "<span>", "</span>"];

  // Calculate how many characters should be encrypted
  const totalChars = text.length;
  const encryptedCount = Math.floor(totalChars * (1 - progress));

  let result = "";
  let charIndex = 1;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];

    // Check if we're at the start of a tag to skip
    let shouldSkip = false;

    for (const tag of skipTags) {
      if (text.substring(i, i + tag.length) === tag) {
        result += tag;
        i += tag.length - 1; // -1 because loop will increment
        shouldSkip = true;
        break;
      }
    }

    if (shouldSkip) continue;

    // Skip spaces - keep them as is
    if (char === " ") {
      result += char;
      charIndex++;
      continue;
    }

    // If this character should be encrypted
    if (
      options.reversed
        ? charIndex < encryptedCount
        : text.length - charIndex < encryptedCount
    ) {
      // 40% chance to show original character, 60% chance to encrypt
      if (Math.random() < options.randomizeChance) {
        result += char;
      } else {
        // Use random character from encryption set
        const randomIndex = Math.floor(Math.random() * encryptionChars.length);
        result += encryptionChars[randomIndex];
      }
    } else {
      // Keep original character
      result += char;
    }

    charIndex++;
  }

  return result;
};


export default function HomeHeroTitle() {
  return (
    <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Proxima Nova, sans-serif' }}>
      <span className="bg-gradient-to-r from-gray-900 via-slate-800 to-gray-900 bg-clip-text text-transparent">
        Redesign
      </span>
      <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
        AI
      </span>
    </h1>
  );
}
