import { useState } from "react";

const FilterTodo = ({ todos, setFilterTodos }) => {
  const [selectValue, setSelectValue] = useState("all");
  const situations = ["all", "uncompleted", "doing", "done"]; // ** button styles ** //
  const changeHandler = (e) => {
    setSelectValue(e.target.value);
    if (e.target.value === "all") {
      setFilterTodos(todos);
    } else {
      setFilterTodos(todos?.filter((todo) => todo.status === e.target.value));
    }
  };

  return (
    <div className="sm:flex sm:items-center sm:justify-center sm:space-x-10">
      <div className="mb-5 sm:mb-0 flex justify-center">
        <select
          className="shadow py-2 px-4 sm:py-3 sm:px-5 rounded-lg outline-none font-black text-gray-500 md:text-lg capitalize w-full sm:w-[300px]"
          onChange={changeHandler}
        >
          <option disabled value="">
            Filter todo status
          </option>

          {situations.map((item) => (
            <option key={item} value={item} className="outline-none">
              {item}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {situations.map((item, index) => (
          <div className="filter-todo-boxes" key={index}>
            <span className="text-[10px] sm:text-xs text-p_gray capitalize">
              {item === "all" ? "all tasks" : item}
            </span>
            <h1
              className={`ml-3 lg:ml-5 text-lg font-bold ${
                item === "all"
                  ? "text-p_gray"
                  : item === "uncompleted"
                  ? "text-p_blue"
                  : item === "doing"
                  ? "text-p_orange"
                  : item === "done"
                  ? "text-p_green"
                  : ""
              }`}
            >
              {item === "all"
                ? todos.length
                : todos?.filter((todo) => todo.status === item).length}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterTodo;
