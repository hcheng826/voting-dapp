import React from "react";

export function SuccessMessage({ message }) {
  return (
    <div className="alert alert-success" role="alert">
      {message.substring(0, 1000)}
    </div>
  );
}
