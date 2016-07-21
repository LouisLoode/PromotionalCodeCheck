// On attend que le DOM soit prêt
$(document).ready(function(){



  $( "#home" ).fadeIn('slow');

  $( "#submit" ).on( "click", function() {
    var code = $('#inputCode').val();
    //console.log(code);
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "/code/" + code,
      "method": "GET",
    }

    $.ajax(settings).done(function (response) {
      if(response.success == true && response.data.status == false){
         $( "#home" ).fadeOut( 'fast', function() {
          // Animation complete
          $( "#choice" ).fadeIn('slow');

          $( "#choice_use_code" ).on( "click", function() {
            console.log(code);
            var settings = {
              "async": true,
              "crossDomain": true,
              "url": "/code/" + code,
              "method": "PUT",
              "headers": {
                "content-type": "application/json",
              },
              "processData": false,
              "data": "{\"status\": \"true\"}"
            }

            $.ajax(settings).done(function (response) {
              console.log(response);
              if(response.success == true){
                  $( "#choice" ).fadeOut( 'fast', function() {
                   // Animation complete
                   $( "#using" ).fadeIn('slow');
                   $( "#using_cancel" ).on( "click", function() {
                     location.reload();
                   });
                  });
              }

            });



          });

          $( "#choice_cancel" ).on( "click", function() {
            location.reload();
          });

         });

      } else if(response.success == true && response.data.status == true){
         $( "#home" ).fadeOut( 'fast', function() {
          // Animation complete
          $( "#used" ).fadeIn('slow');
          $( "#used_cancel" ).on( "click", function() {
            location.reload();
          });
         });

      }

      // à débugger
      else if(response.success == false ){
        $( ".form-code > #error" ).fadeIn('slow');
        console.log('show error alert');
        $("#inputCode").on("change paste keyup", function() {
          console.log('change on input');
          $( ".form-code > #error" ).fadeOut('slow');
        });

      }

       else {
         console.log('there is a problem');
       }
      console.log(response);






    });

    /* if(code == "ok"){
       $( "#home" ).fadeOut('slow');
       $( "#choice" ).fadeIn('slow');
     }*/


  });

});
