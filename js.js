$(document).ready(function() {

  var colors = ["#006633", "#6F4242","#ff9900","#993333" ];
//"number" will be needed to: colors[number]
  var number = 0; 
  
  //event: clicking on "Surprise me" button
  $("#random_btn").click(function() {
    $("#random_btn").html("Next random");
  });

  //wikipedia autocompleting mechanism - using Wikipedia API
  $(".searchBox").autocomplete({
    source: function(request, response) {
      $.ajax({
        url: "http://en.wikipedia.org/w/api.php",
        dataType: "jsonp",
        data: {
          'action': "opensearch",
          'format': "json",
          'search': request.term
        },
        success: function(data) {
          //it returns the title of every article that fits into the user input
          response(data[1]);
        }
      });
    }
  });

  //Event: clicking on enter key:
  $(document).keypress(function(e) {
    //enter key: value =13;
    if (e.which == 13) {
      //first, it cleans the outcome div, to make a place for new results
      $("#outcome").html("");
      //if the value of our input = "", then the "welcome" elements are going to the center of website, it looks better
      if ($(".searchBox").val() == "") {
        $(".padding").css("padding-top", "9%");
        //if not: "welcome" elements are going to the top of website, to make a place for results
      } else if ($(".searchBox").val() != "") {
        $(".padding").css("padding-top", "3%");

        var searchbox = $(".searchBox").val();
        //it adds the user input to the url of wikipedia API:
        var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + searchbox + "&format=json&callback=?";
        //and now it starts to prepare a results :
        $.ajax({
          type: "GET",
          url: url,
          async: false,
          dataType: "json",
          success: function(data) {

            var title = "";
            var about = "";
            var link = "";

            //for every title that fits to user input - max 10:
            for (var j = 0; j < 11; j++) {

              //choose the color of website's elements:
              var color = colors[number];
              //then it changes colors of those 3 elements:
              
              $("#outcome p").css("background-color", color);
              $("#hope").css("color", color);
              $("#random_btn").css("border-color", color);
              $("#logo").css("border-color",color);
              

              //then it changes the value of number, to make it be like: 1,2,3...last color and then again 1,2,3... last
              if (number < colors.length - 1) {
                number++;
              } else if (number = colors.length - 1) {
                number = 0;
              } else {
                number--;
              }
              //then it takes a title, short text about and url of every API results element - of course, max 10:
              title = data[1][j];
              //"while" makes us sure, that if there ll be less than 10 results, the result like : undefined, undefined, undefined won't be shown on website
              while (title != undefined) {
                about = data[2][j];
                link = data[3][j];

                //now it makes html of a result, that ll be added to the "outcome" div
                $("#outcome").append('<p><a href="' + link + ' "target="blank"><strong>' + title + '</a></strong></br> <div style="font-size:15px;">"' + about + '"</div></a></p><p id="invisible"> </br></p>');
                //because of "while" we need to change title to undefined, because if we dont, "while" ll never stop. After that, we are going back to "for" and making a next result, as long as the title != undefined
                title = undefined;

              }

            }

          },
          //of course, we need an error part for some unplanned situations
          error: function(errorMessage) {
            alert("Error!");
          }

        });

      }
    }

  });

});
// Hope you enjoyed it :D