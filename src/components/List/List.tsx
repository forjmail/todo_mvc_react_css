import { useContext, useEffect, useState } from 'react';
import { Context } from '../../context/Context';
import { ContextType, Todo } from '../../types';
import OneTodo from '../OneTodo/OneTodo';
import styles from './list.module.css';

export default function List() {
  const { todos, editedId, toggleAll, filter } =
    useContext<ContextType>(Context);
  const [filteredTodo, setFilteredTodo] = useState(todos);

  useEffect(() => {
    switch (filter) {
      case 'all':
        setFilteredTodo(todos);
        break;
      case 'active':
        setFilteredTodo(todos.filter((el: Todo) => el.completed === false));
        break;
      case 'completed':
        setFilteredTodo(todos.filter((el: Todo) => el.completed === true));
        break;
      default:
        setFilteredTodo(todos);
        break;
    }
  }, [todos, filter]);

  return todos.length ? (
    <section className={styles.main}>
      <input
        id="toggle-all"
        className={styles.toggle_all}
        type="checkbox"
        onChange={(e: React.FormEvent<HTMLInputElement>) => toggleAll(e)}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
      <ul className={styles.todo_list}>
        {filteredTodo.map((todo: Todo) => (
          <li
            className={`todo ${todo.completed ? styles.completed : ''} ${
              todo.id === editedId ? styles.editing : ''
            }`}
            key={todo.id}
          >
            <OneTodo todo={todo} />
          </li>
        ))}
      </ul>
    </section>
  ) : (
    <></>
  );
}
