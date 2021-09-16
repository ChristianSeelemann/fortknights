import useLocalStorage from './useLocalStorage';

export default function useFriends(): {
  friendsData: string[];
  handleFriendClick: (id: string) => void;
} {
  const [friendsData, setFriendsData] = useLocalStorage<string[]>(
    'friends',
    []
  );

  function addFriend(id: string) {
    setFriendsData([...friendsData, id]);
  }

  function removeFriend(id: string) {
    setFriendsData(friendsData.filter((item) => item !== id));
  }

  function handleFriendClick(id: string) {
    if (friendsData.includes(id)) {
      removeFriend(id);
    } else {
      addFriend(id);
    }
  }

  return { friendsData, handleFriendClick };
}
