import useLocalStorage from './useLocalStorage';

export default function useFriends(): {
  friendsData: number[];
  handleFriendClick: (id: number) => void;
} {
  const [friendsData, setFriendsData] = useLocalStorage<number[]>(
    'friends',
    []
  );

  function addFriend(id: number) {
    setFriendsData([...friendsData, id]);
  }

  function removeFriend(id: number) {
    setFriendsData(friendsData.filter((item) => item !== id));
  }

  function handleFriendClick(id: number) {
    if (friendsData.includes(id)) {
      removeFriend(id);
    } else {
      addFriend(id);
    }
  }

  return { friendsData, handleFriendClick };
}
