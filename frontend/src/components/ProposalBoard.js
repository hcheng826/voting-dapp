import React from "react";

export function ProposalBoard({ voteOn, proposals }) {
    return (
        <div>
            <h4>Proposal Leaderboard</h4>
            <table>
                <tr>
                    <th>index</th>
                    <th>content</th>
                    <th>votes count</th>
                    <th>vote!</th>
                </tr>
                { [...Array(proposals.length).keys()].map((idx) => {
                    return (
                        <tr idx={idx}>
                            <th>{idx}</th>
                            <th>{proposals[idx].content}</th>
                            <th>{proposals[idx].votesCount.toNumber()}</th>
                            <th>
                                <button onClick={() => { voteOn(idx) }}>Vote!</button>
                            </th>
                        </tr>
                    )
                })}

            </table>

        </div>
    );
}
