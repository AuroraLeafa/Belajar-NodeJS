export class TodoListService {
  todoList = ["Todo 1", "Todo 2", "Todo 3"];
  getJsonTodoList(req, res) {
    return JSON.stringify({
      code: 200,
      status: "OK",
      data: this.todoList.map((value, index) => {
        return {
          id: index,
          todo: value,
        };
      }),
    });
  }

  getTodoList(req, res) {
    res.write(this.getJsonTodoList());
    res.end();
  }

  createTodo(req, res) {
    req.addListener("data", (data) => {
      const body = JSON.parse(data.toString());
      this.todoList.push(body.todo);

      res.write(this.getJsonTodoList());
      res.end();
    });
  }

  updateTodo(req, res) {
    req.addListener("data", (data) => {
      const body = JSON.parse(data.toString());
      if (this.todoList[body.id]) {
        this.todoList[body.id] = body.todo;
      }

      res.write(this.getJsonTodoList());
      res.end();
    });
  }

  deleteTodo(req, res) {
    req.addListener("data", (data) => {
      const body = JSON.parse(data.toString());
      this.todoList.splice(body.id, 1);
      // this.todoList = this.todoList.filter((_, index) => index !== body.id);
      res.write(this.getJsonTodoList());
      res.end();
    });
  }
}
