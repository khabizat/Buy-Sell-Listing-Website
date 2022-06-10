//CODE RELATED TO FAVOURTES PAGE

// $('button').submit((event) => {
//   event.PreventDefault()
//   const data =$(this)
//   $.ajax('/favouries', { method: 'POST', data})
// })

$(document).ready(function() {

    $('.add-to-favourites').click(function() {
        const data = this.innerHTML;
        console.log('', data)

          window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      })
      $('.message-seller').click(function() {
        const data = this.innerHTML;
        console.log('', data)

          window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      })
})






















