import React from "react";

export function ProposalBoard({ voteOn, proposals, isEnded }) {
    return (
        <div>
            <h4>Proposal Leaderboard</h4>
            <table class="table">
                <thead>
                  <tr>
                      <th>index</th>
                      <th>content</th>
                      <th>votes count</th>
                      <th>vote!</th>
                  </tr>
                </thead>
                <tbody>
                  { [...Array(proposals.length).keys()].map((idx) => {
                    return (
                      <tr idx={idx}>
                        <th>{idx}</th>
                        <th>{proposals[idx].content}</th>
                        <th>{proposals[idx].votesCount.toNumber()}</th>
                        <th>
                          { !isEnded && (<input className="btn btn-primary" type="submit" value="Vote!" onClick={() => { voteOn(idx) }}/>) }
                          { isEnded && (<input className="btn btn-primary" type="submit" value="Vote!" disabled/>) }
                        </th>
                      </tr>
                    )
                  })}
                </tbody>
            </table>

        </div>
    );
}
