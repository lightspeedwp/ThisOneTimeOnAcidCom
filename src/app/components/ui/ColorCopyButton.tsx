/**
 * @fileoverview Color Copy Button Component
 * 
 * Allows users to quickly copy color hex values to clipboard.
 * Shows visual feedback on successful copy.
 * 
 * @component ColorCopyButton
 * @version 1.0.0
 */

import React, { useState } from 'react';
import { Copy, Check } from '@phosphor-icons/react';
import '../../../styles/blocks/color-copy-button.css';

export interface ColorCopyButtonProps {
  hex: string;
  colorName: string;
}

export function ColorCopyButton(props: ColorCopyButtonProps) {
  var hex = props.hex;
  var colorName = props.colorName;
  var copiedState = useState(false);
  var copied = copiedState[0];
  var setCopied = copiedState[1];

  function handleCopy(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    
    if (navigator.clipboard != null && navigator.clipboard.writeText != null) {
      navigator.clipboard.writeText(hex).then(function () {
        setCopied(true);
        setTimeout(function () {
          setCopied(false);
        }, 2000);
      }).catch(function () {
        var fallbackCopy = function () {
          var textarea = document.createElement('textarea');
          textarea.value = hex;
          textarea.style.position = 'fixed';
          textarea.style.opacity = '0';
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
          setCopied(true);
          setTimeout(function () {
            setCopied(false);
          }, 2000);
        };
        fallbackCopy();
      });
    }
  }

  return (
    <button
      onClick={handleCopy}
      className={copied ? 'color-copy-button color-copy-button--copied' : 'color-copy-button'}
      aria-label={'Copy ' + colorName + ' hex code ' + hex}
      title={copied ? 'Copied!' : 'Copy ' + hex}
    >
      {copied ? (
        <span className="color-copy-button__content">
          <Check size={16} weight="bold" aria-hidden="true" />
          <span>Copied!</span>
        </span>
      ) : (
        <span className="color-copy-button__content">
          <Copy size={16} weight="duotone" aria-hidden="true" />
          <span>Copy {hex}</span>
        </span>
      )}
    </button>
  );
}
