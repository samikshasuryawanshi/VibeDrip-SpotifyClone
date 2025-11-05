import { useChatStore } from "@/stores/useChatStore"

const FriendsActivity = () => {
    const {users,isLoading,error,fetchUsers} = useChatStore();
  return (
    <div>FriendsActivity</div>
  )
}

export default FriendsActivity