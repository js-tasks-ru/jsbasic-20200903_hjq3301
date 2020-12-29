function toggleText() {
  const hide = document.querySelector('.toggle-text-button');
 

      hide.addEventListener('click', function() {
        if (text.getAttribute('hidden') == 'true') {
          text.removeAttribute('hidden')
        } else {
          text.setAttribute ("hidden", "true")
        }
      }); 

};