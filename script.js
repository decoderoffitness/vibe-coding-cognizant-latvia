async function getSolution() {
    const tool = document.getElementById('tool').value;
    const error = document.getElementById('error').value;
    const solutionDiv = document.getElementById('solution');

    try {
        const response = await fetch('https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'text-davinci-003',
                prompt: `For ${tool}, resolve this error: ${error}. Provide a solution and a brief explanation.`,
                max_tokens: 500
            })
        });
        const data = await response.json();
        solutionDiv.innerText = data.choices[0].text;
        solutionDiv.style.display = 'block';
    } catch (error) {
        solutionDiv.innerText = 'Error fetching solution. Check your input or API key.';
        solutionDiv.style.display = 'block';
    }
}

document.getElementById('solution-form').addEventListener('submit', function(event) {
    event.preventDefault();
    getSolution();
});
