var foodRepository = (function () {
  var repository = [];
  var apiUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

// Load the list through api provided
  function loadList() {
    return $.ajax(apiUrl, { dataType: 'json'}).done(function (responseJSON) {
      console.log('success');
      var data = Object.keys(responseJSON.meals);
      for (var i = 0; i < data.length; i++) {
        var obj = responseJSON.meals[i];
        var food = {
          name: obj.strMeal,
          imageUrl: obj.strMealThumb
        };
        add(food);
        console.log(food);
      }
    }).catch(function (e) {
      console.log(e);
    });
  }

  function add(food) {
    //check if the parameter is an Object
    if(typeof food === typeof {}) {
      repository.push(food);
    }
    else {
     return document.write('<p> "' + food + '" is a wrong input type! </p>');
   }
  }

  // function that returns the entire food repository
  function getAll() {
    return repository;
  }

  return {
    loadList: loadList,
    add: add,
    getAll: getAll
  };
})();

var $foodList = $('.list-group');
function addListItem(food) {

  // create food list element to button
  var $button = $('<button type="button" class="btn btn-primary list-group-item list-group-item-action" data-toggle="modal" data-target="#modalContainer"></button>');
  $button.text(food.name);
  $foodList.append($button);

  $button.click(function () {
    showDetails(food);
  });

}
  // showing details of food - name and image on Modal
  function showDetails(food) {
    $(document).on('click', '.list-group-item', function() {
      var name = food.name;
      var image = $('<img class="food-picture" width="200px">');
      image.attr('src', food.imageUrl);

      $('h5').html(name);
      $('.modal-body').html(image);
      $('.modal').modal('show');
    });
  }

// Search Food Name from the list group
$(document).ready(function() {
  $('#myInput').on('keyup', function() {
    var value = $(this).val().toLowerCase();
    $('#myList button').filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});

foodRepository.loadList().then(function() {
  var foodName = foodRepository.getAll();
  $.each(foodName, function(index, food) {
    addListItem(food);
  });
});
