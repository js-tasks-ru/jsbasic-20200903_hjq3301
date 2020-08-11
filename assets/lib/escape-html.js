export default string => Array.from(string).map(char => {
  switch(char) {
    case '&':
      return '&amp;';
    case '"':
      return '&quot;';
    case '\'':
      return '&#39;';
    case '<':
      return '&lt;';
    case '>':
      return '&gt;';
    default:
      return char;
  }
}).join('');