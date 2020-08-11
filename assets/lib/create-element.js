// doesn't work for td and some other elements that may not be placed into <div>
export default function(html) {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.firstElementChild;
};
