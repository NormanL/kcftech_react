import React, { useState } from "react";

type Corporation = {
    id: number;
    name: string;
    icon: string;
};

const defaultCorporations = [
    { id: 1, name: "Apple", icon: "apple.png" },
    { id: 2, name: "Amazon", icon: "amzn.png" },
    { id: 3, name: "Google", icon: "google.png" }
];

function Corporations() {
    const [corporations, setCorporations] = useState(defaultCorporations);

    function renderCorp(corp: Corporation) {
        return (
            <tr>
                <td>
                    <button onClick={() => onDeleteClick(corp.id)}>
                        Delete
                    </button>
                </td>
                <td>{corp.id}</td>
                <td>{corp.name}</td>
                <td>{corp.icon}</td>
            </tr>
        );
    }

    function onDeleteClick(id: number) {
        const newCorps = corporations.filter(corp => corp.id !== id);
        setCorporations(newCorps);
    }

    return (
        <>
            <h1>Corporations</h1>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Icon</th>
                    </tr>
                </thead>
                <tbody>{corporations.map(renderCorp)}</tbody>
            </table>
        </>
    );
}

export default Corporations;
