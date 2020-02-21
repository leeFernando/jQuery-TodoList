$(document).ready(function() {
  $.getJSON("/api/todos").then(addTodos);

  $("#todoInput").keypress(function(event) {
    if (event.which == 13) createTodo();
  });

  $(".list").on("click", "span", function(e) {
    e.stopPropagation(); //to stop the event bubbling (in this case delete+update)
    removeTodo($(this).parent());
  });

  $(".list").on("click", ".task", function() {
    updateTodo($(this));
  });
});

function addTodos(todos) {
  for (let todo of todos) addTodo(todo);
}

function addTodo(todo) {
  let newTodo = $('<li class="task">' + todo.name + "<span>X</span>" + "</li>");
  newTodo.data("id", todo._id);
  newTodo.data("completed", todo.completed);
  if (todo.completed) newTodo.addClass("done");
  $(".list").append(newTodo);
}

function createTodo(todo) {
  let usrInput = $("#todoInput").val();
  $.post("/api/todos", { name: usrInput })
    .then(function(newTodo) {
      addTodo(newTodo);
      $("#todoInput").val("");
    })
    .catch(function(err) {
      console.log(err);
    });
}

function removeTodo(todo) {
  let todoId = todo.data("id");
  let deleteUrl = "/api/todos/" + todoId;
  $.ajax({
    method: "DELETE",
    url: deleteUrl,
  })
    .then(function(data) {
      todo.remove();
    })
    .catch(function(err) {
      console.log(err);
    });
}

function updateTodo(todo) {
  let updateUrl = "/api/todos/" + todo.data("id");
  let isDone = !todo.data("completed");
  let updateData = { completed: isDone };
  $.ajax({
    method: "PUT",
    url: updateUrl,
    data: updateData,
  })
    .then(function(data) {
      console.log(data);
      todo.toggleClass("done");
      todo.data("completed", isDone);
    })
    .catch(function(err) {
      console.log(err);
    });
}
