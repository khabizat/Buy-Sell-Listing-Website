//CODE RELATED TO FAVOURTES PAGE

// $('button').submit((event) => {
//   event.PreventDefault()
//   const data =$(this)
//   $.ajax('/favouries', { method: 'POST', data})
// })

$(document).ready(function() {

    function addToFavourite(event) {
        event.preventDefault();
        $('footer').click(function() {
            console.log('Favourite button', this)
        })
    }

    $('.add-to-favourites').click(function() {
        const data = this.innerHTML;
        console.log('', data)
        // $.ajax('/favourites', {method: 'POST', data})
        //
        // const $likeID = this.innerHTML;
        // addToFavourite($likeID);
          window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      })
    // function fetchProduct() {
    //     $('.message-seller').click( (event) => {


    //         $.ajax('/product', {method: 'POST', data})
    //     })
    // }

})






//CODE RELATED TO HOME PAGE
// function addToFavourites(data) {
//   return $.ajax({
//     method: "POST",
//     url: "/favourites",
//     data
//   });
// }























