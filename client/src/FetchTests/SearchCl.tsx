import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ClientProperties, clientPropertyList, clientFieldMetadata, Client } from "./Types";

const initialClientValues: Client = {
  id: "",
  name: "",
  surname: "",
  adress: "",
  email: "",
  phoneNumber: "",
  company: "",
};

export const SearchCl = () => {
  const [client, setClient] = useState<Client>(initialClientValues);

  const { id } = useParams();

  const searchClient = async () => {
    await fetch("http://localhost:8080/client", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(client),
    });
  };
};
