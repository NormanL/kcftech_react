export async function getCorporations() {
    const response = await fetch("http://localhost:3001/corporations");

    if (response.ok) {
        const json = await response.json();
        return json;
    }
    throw new Error("bad network response!");
}
