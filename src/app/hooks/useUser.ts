import useLocalStorage from './useLocalStorage';

export default function useUser(): {
  selfData: string;
  addSelf: (id: string) => void;
  removeSelf: (name: string) => void;
} {
  const [selfData, setSelfData] = useLocalStorage<string>('nickname', '0');

  function addSelf(id: string) {
    setSelfData(id);
  }

  function removeSelf(name: string) {
    localStorage.removeItem(name);
  }

  return { selfData, addSelf, removeSelf };
}
