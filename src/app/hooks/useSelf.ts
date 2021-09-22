import useLocalStorage from './useLocalStorage';

export default function useSelf(): {
  selfData: string;
  addSelf: (id: string) => void;
} {
  const [selfData, setSelfData] = useLocalStorage<string>('nickname', '0');

  function addSelf(id: string) {
    setSelfData(id);
  }

  return { selfData, addSelf };
}
