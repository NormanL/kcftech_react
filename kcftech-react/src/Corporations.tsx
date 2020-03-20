import React, { useState, useEffect } from "react";
import {
    getCorporations,
    deleteCorporation,
    addCorporation
} from "./api/corporationsApi";

declare type CorporationRequest = {
    name: string;
    icon: string;
    [index: string]: string;
};

function Corporations() {
    // Must put this in state because we want React to redraw the screen when this data changes.
    const [corporations, setCorporations] = useState<Corporation[]>([]);
    const [corporation, setCorporation] = useState<CorporationRequest>({
        name: "",
        icon: ""
    });

    // This runs by default as every render.
    useEffect(() => {
        async function loadCorporations() {
            const corps = await getCorporations();
            setCorporations(corps);
        }
        loadCorporations();
        // 2nd arg is the dependency array. It specifies when this effect should re-run
    }, []);

    async function onDeleteClick(id: Number) {
        await deleteCorporation(id);
        const newCorporations = corporations.filter(corp => corp.id !== id);
        setCorporations(newCorporations);
    }

    function onAddCorporation(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault(); // Prevent the form from posting back to the server.
        // addCorporation(event);
    }

    function onChange(event: React.ChangeEvent<HTMLInputElement>) {
        const newCorp = { ...corporation };
        newCorp[event.target.id] = event.target.value;
        setCorporation(newCorp);
    }

    // In React, HTML is a projection of app state
    // NOT a source of truth.
    function renderCorporation(corp: Corporation) {
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
                <tbody>{corporations.map(renderCorporation)}</tbody>
            </table>

            <section>
                <h2>Add User</h2>
                <form onSubmit={onAddCorporation}>
                    <div>
                        <label htmlFor="name">
                            Name
                            <br />
                            <input
                                type="text"
                                name="name"
                                id="name"
                                onChange={onChange}
                            ></input>
                        </label>
                    </div>

                    <div>
                        <label htmlFor="icon">
                            Icon
                            <br />
                            <input type="text" name="icon" id="icon"></input>
                        </label>
                    </div>
                    <input type="submit" value="Add Corporation" />
                </form>
            </section>
        </>
    );
}

export default Corporations;
