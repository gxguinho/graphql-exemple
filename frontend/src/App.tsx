import { gql, useQuery } from "@apollo/client";
import { NewUserForm } from "./components/NewUserForm";

type User = {
  id: string;
  name: string;
};

const GET_USER = gql`
  query {
    users {
      id
      name
    }
  }
`;

export function App() {
  const { data, loading } = useQuery<{ users: User[] }>(GET_USER);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <ul>
        {data?.users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>

      <NewUserForm />
    </div>
  );
}
