import React, { useState, useEffect } from "react";
import { getCorporations } from "./api/corporations";

type Corporation = {
    id: number;
    name: string;
    icon: string;
};

function Corporations() {
    // const [corporations, setCorporations] = useState<Array<Corporation>>([]);
    const [corporations, setCorporations] = useState<Corporation[]>([]);

    // This runs by default after every render.
    useEffect(() => {
        async function loadCorporations() {
            const corps = await getCorporations();
            setCorporations(corps);
        }
        loadCorporations();
    }, []); // Second arg (empty array) is the dependency array - specifies when this effect should re-run

    function onDeleteClick(id: number) {
        const newCorps = corporations.filter(corp => corp.id !== id);
        setCorporations(newCorps);
    }

    function renderCorp(corp: Corporation) {
        return (
            <tr key={corp.id}>
                <td>
                    <button
                        aria-label={`Delete ${corp.name} with ID ${corp.id}`}
                        onClick={() => onDeleteClick(corp.id)}
                    >
                        Delete
                    </button>
                </td>
                <td>{corp.id}</td>
                <td>{corp.name}</td>
                <td>{corp.icon}</td>
            </tr>
        );
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
