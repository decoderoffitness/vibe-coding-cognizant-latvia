const OPENAI_API_KEY = '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';

document.getElementById('explainBtn').addEventListener('click', async () => {
  const tool = document.getElementById('tool').value;
  const error = document.getElementById('errorInput').value.trim();
  const responseBox = document.getElementById('response');
  const resultText = document.getElementById('resultText');

  if (!error) {
    alert('Please paste an error message.');
    return;
  }

  responseBox.style.display = 'block';
  resultText.innerHTML = 'Thinking... 💭';

  const userPrompt = `
I am using ${tool} and got this error:

"${error}"

Explain what this error means, why it happens, and how I can fix it. Provide clear explanation for automation testers.
`;

  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: userPrompt }],
        temperature: 0.5
      })
    });

    const data = await res.json();
    if (data.choices && data.choices.length > 0) {
      resultText.innerHTML = data.choices[0].message.content.replace(/\n/g, "<br>");
    } else {
      resultText.innerHTML = "Sorry, I couldn't get a response. Try again.";
    }
  } catch (error) {
    console.error(error);
    resultText.innerHTML = "An error occurred while contacting OpenAI. Check your API key or internet connection.";
  }
});
