import { useState } from 'react';
import PropTypes from 'prop-types';
import './TruncateTextByWords.scss';

/**
 * TruncateTextByWords component that truncates text to a specified number of words
 * with an inline expand/collapse button
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.text - The text content to be truncated/expanded
 * @param {number} [props.words=50] - Number of words to show when truncated
 * @param {string} [props.expandButtonText="Read more"] - Text for the expand button
 * @param {string} [props.collapseButtonText="Read less"] - Text for the collapse button
 * @param {string} [props.className=""] - Additional CSS class names
 * @returns {JSX.Element} Word-truncated text with expand/collapse functionality
 */
export default function TruncateTextByWords({
  text,
  words = 50,
  expandButtonText = 'Read more',
  collapseButtonText = 'Read less',
  className = '',
}) {
  const [expanded, setExpanded] = useState(false);

  // Split text into words
  const allWords = text.split(/\s+/);
  const shouldTruncate = allWords.length > words;

  // Get truncated text
  const truncatedText = shouldTruncate
    ? allWords.slice(0, words).join(' ')
    : text;

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={`word-truncate-container ${className}`}>
      <span className="text-content">
        {expanded ? text : truncatedText}
        {shouldTruncate && !expanded && <span className="ellipsis">...</span>}
      </span>

      {shouldTruncate && (
        <button className="inline-toggle-button" onClick={toggleExpanded}>
          {expanded ? collapseButtonText : expandButtonText}
        </button>
      )}
    </div>
  );
}

TruncateTextByWords.propTypes = {
  text: PropTypes.string.isRequired,
  words: PropTypes.number,
  expandButtonText: PropTypes.string,
  collapseButtonText: PropTypes.string,
  className: PropTypes.string,
};
