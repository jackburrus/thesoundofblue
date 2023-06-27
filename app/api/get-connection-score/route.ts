import { Configuration, OpenAIApi } from 'openai-edge';
import { OpenAIStream, StreamingTextResponse } from 'ai';

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

// Set the runtime to edge for best performance
export const runtime = 'edge';

export async function POST(req: Request) {
	const { phraseOne, phraseTwo } = await req.json();

	// Ask OpenAI for a streaming completion given the prompt
	const response = await openai.createCompletion({
		model: 'text-davinci-003',
		stream: true,
		temperature: 0.6,
		prompt: `"Analyze the connection between the phrases ${phraseOne} and ${phraseTwo}. Describe their relation on a scale from 1 (no relation) to 100 (closely related). Do not provide any other text in your response, only the number."
        `,
	});
	// Convert the response into a friendly text-stream
	const stream = OpenAIStream(response);
	// Respond with the stream
	return new StreamingTextResponse(stream);
}
