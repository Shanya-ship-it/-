import React, { useState, useEffect } from "react";
import { Client, clientFieldMetadata, clientPropertyList } from "./Types";
import { ContractJoin, contractJoinFieldMetadata, contractJoinPropertyList } from "./Types";
import { Request, requestFieldMetadata, requestPropertyList } from "./Types";

export const Search = () => {
  return (
    <div>
      <div className="app-tab" style={{ whiteSpace: "pre-wrap" }}>
        {`Поиск`}
      </div>
      <div className="form">
        <form className="=search_form">
          <input type="text" placeholder="search employee..." className="search_input" />
        </form>
        <div>
          <select>
            <option value="">По сотрудникам</option>
            <option value="value2">По клиентам</option>
          </select>
        </div>
      </div>
    </div>
  );
};
