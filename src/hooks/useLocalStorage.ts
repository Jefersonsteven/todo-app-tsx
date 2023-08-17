type State<T> = [T, (state: T) => void];

export function useLocalStorage<T> (name: string, data: T): State<T> {
  try {
    const DATA = window.localStorage.getItem(name)

    if(!DATA){
      window.localStorage.setItem(name, JSON.stringify(data))
    }

    const setState = (data: T) => {
      window.localStorage.setItem(name, JSON.stringify(data))
    }

    const state: T = JSON.parse(DATA || "null")

    return [state, setState]
  } catch (error) {
    throw new Error();
  }
}