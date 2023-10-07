import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client";
import { FormEvent, useState } from "react";
import { client } from "../lib/apollo";

const GET_USER = gql`
  query {
    users {
      id
      name
    }
  }
`;

const CREATE_USER = gql`
  mutation ($name: String!) {
    createUser(name: $name) {
      id
      name
    }
  }
`;

export function NewUserForm() {
  const [name, setName] = useState("");
  const [createUser, { data }] = useMutation(CREATE_USER);

  async function handleCreateUser(event: FormEvent) {
    event.preventDefault();

    if (!name) {
      return;
    }

    await createUser({ 
      variables: { name }, 
      update: (cache, { data: { createUser } }) => {
        const { users  } = client.readQuery({ query: GET_USER  })

        cache.writeQuery({
          query: GET_USER,
          data: {
            users: [...users, createUser]
          }
        })
      }
     });

    console.log(data);
  }

  return (
    <form onSubmit={handleCreateUser}>
      <input type="text" id="name" onChange={(e) => setName(e.target.value)} />
      <button type="submit">Create</button>
    </form>
  );
}
