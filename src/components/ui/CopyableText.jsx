import { Copy, Check } from 'lucide-react';
import React, { useState } from 'react';

export const CopyableText = ({ text, label, mainStyle, btnStyle }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            
            // Reset the copied state after 2 seconds
            setTimeout(() => {
                setCopied(false);
            }, 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            setCopied(true);
            
            setTimeout(() => {
                setCopied(false);
            }, 2000);
        }
    };

    return (
        <div className="flex flex-col space-y-1">
            {label && (
                <span className="text-sm font-medium text-gray-600">{label}</span>
            )}
            {/* pl-3 py-1 shadow border-base-200 border pass the padding and bg props */}
            <div className={`${mainStyle} flex items-center justify-between rounded-lg`} title={text}>
                <span className="font-mono text-sm truncate">{text}</span>
                <div className='tooltip tooltip-bottom' data-tip="Copy">
                    {/* btn-sm pass bth styles size */}
                    <button
                        onClick={handleCopy}
                        className={`${copied && "text-success"} ${btnStyle} btn btn-neutral btn-square mr-1 rounded shadow text-base-content text-xs font-bold transition-all duration-300 ease-in-out`}
                        // title={copied ? "Copied!" : "Copy to clipboard"}
                    >
                        {copied ? (
                            <Check className="w-4 h-4 text-green-600" />
                            // "Copied!"
                        ) : (
                            <Copy className="w-4 h-4 text-gray-600" />
                            // "Copy"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};