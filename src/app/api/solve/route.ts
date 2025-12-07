export async function POST(req: Request) {
    const body = await req.json();

    const response = await fetch("http://45.93.249.131:8000/solve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });

    const data = await response.json();

    return Response.json(data);
}
