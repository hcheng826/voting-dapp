import React from "react";

export function Propose({ submitProposal, isEnded }) {
  return (
    <div>
      <h4>Propose</h4>
      <form
        onSubmit={(event) => {
          // This function just calls the transferTokens callback with the
          // form's data.
          event.preventDefault();

          const formData = new FormData(event.target);
          const content = formData.get("content");

          if (content) {
            submitProposal(content);
          }
        }}
      >
        <div className="form-group">
          <label>Proposal Content</label>
          <input
            className="form-control"
            type="text"
            name="content"
            required
          />
        </div>
        <div className="form-group">
          {!isEnded && <input className="btn btn-primary" type="submit" value="Propose" />}
          {isEnded && <input className="btn btn-primary" type="submit" value="Propose" disabled/>}
        </div>
      </form>
    </div>
  );
}
