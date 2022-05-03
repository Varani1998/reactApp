import CreateTodo from "./pages/CreateTodo";
import TodoList from "./pages/TodoList"

function App() {
  return (
    <router>
      <div className="App">
        <CreateTodo />
        <TodoList />
       
        <route path="/add" exact component={CreateTodo}/>
        <route path="/" exact component={TodoList}/>
      </div>
    </router>
  );
}

export default App;
