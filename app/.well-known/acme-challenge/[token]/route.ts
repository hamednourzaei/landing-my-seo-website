import { NextResponse } from "next/server";

const tokens: Record<string, string> = {
  "ZS3WaHHPY1V0BqHGpxjlNdP2olZtkKRUI17b-iLwMcA":
    "ZS3WaHHPY1V0BqHGpxjlNdP2olZtkKRUI17b-iLwMcA.-mrCzP1dsH9-M9NYVsTJU2K6I4BUXnZX7owXy2OJdVU",
  "Q-ixUfdsoAJ0tns3HiIaKNd0AqhSVjp1yXjOtUjiHWA":
    "Q-ixUfdsoAJ0tns3HiIaKNd0AqhSVjp1yXjOtUjiHWA.-mrCzP1dsH9-M9NYVsTJU2K6I4BUXnZX7owXy2OJdVU",
};

export async function GET(
  request: Request,
  context: { params: Promise<{ token: string }> }
) {
  // منتظر params بمان
  const params = await context.params;
  const { token } = params;

  const responseText = tokens[token];

  if (!responseText) {
    return new NextResponse("Token not found", { status: 404 });
  }

  return new NextResponse(responseText, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
