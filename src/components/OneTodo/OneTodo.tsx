import { useContext, useState } from 'react';
import { ContextType, Todo } from '../../types';
import { Context } from '../../context/Context';
import styles1 from './one-todo.module.css';
import styles2 from '../List/list.module.css';

export default function OneTodo({ todo }: { todo: Todo }) {
  const { editedId, setEditedId, updateTodo, removeTodo } =
    useContext<ContextType>(Context);
  const [beforeEditCache, setBeforeEdit] = useState('');

  function keyHandler(event: React.KeyboardEvent<HTMLElement>) {
    if (event.key === 'Enter' || event.keyCode === 13) {
      doneEdit(todo);
    } else if (event.key === 'Escape' || event.keyCode === 27) {
      cancelEdit(todo);
    }
  }

  function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const newTodo =
      e.target.type === 'checkbox'
        ? {
            ...todo,
            completed: !todo.completed,
          }
        : e.target.type === 'text'
        ? { ...todo, title: e.target.value }
        : { ...todo };
    updateTodo(newTodo);
  }

  function editTodo(todo: Todo) {
    setBeforeEdit(todo.title);
    setEditedId(todo.id);
  }

  function cancelEdit(todo: Todo) {
    setEditedId(0);
    todo.title = beforeEditCache;
  }

  function doneEdit(todo: Todo) {
    if (editedId === todo.id) {
      setEditedId(0);
      todo.title = todo.title.trim();
      if (!todo.title) removeTodo(todo.id);
    }
  }

  return (
    <>
      <div className={styles2.view}>
        <input
          className={styles1.toggle}
          type="checkbox"
          checked={todo.completed}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            changeHandler(e)
          }
        />
        <label onDoubleClick={() => editTodo(todo)}>{todo.title}</label>
        <button
          className={styles1.destroy}
          onClick={() => removeTodo(todo.id)}
        ></button>
      </div>
      {beforeEditCache && (
        <input
          className={styles2.edit}
          type="text"
          autoFocus
          value={todo.title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            changeHandler(e)
          }
          onBlur={() => doneEdit(todo)}
          onKeyUp={(e: React.KeyboardEvent<HTMLElement>) => keyHandler(e)}
        />
      )}
    </>
  );
}
