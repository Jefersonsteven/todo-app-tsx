import { Todos } from "../types";

export function useFilterData(
  filterOption: string, 
  data: Todos, 
  setData: (data: Todos) => void
  ) {

  const newData = data.filter(todo => {
    if(filterOption === 'complete') return todo.completed
    else if (filterOption === 'pending') return !todo.completed
    else return todo
  })
  setData(newData)
}