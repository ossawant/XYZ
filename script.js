let apiRequests = 0;
const apiLimit = 10; // Example API limit

async function fetchData() {
  const searchInput = document.getElementById('search').value;
  const generatedImage = document.getElementById('generatedImage');
  const generateBtn = document.querySelector('.generate-btn');
  const remainingRequests = document.getElementById('remainingRequests');

  if (apiRequests >= apiLimit) {
    alert('API limit exceeded. Please try again later.');
    return;
  }

  apiRequests++;
  remainingRequests.textContent = apiLimit - apiRequests;

  const url = 'https://open-ai21.p.rapidapi.com/texttoimage2';
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': 'bb89241bc0mshf822b6b10dc60ecp1fd4dbjsn64c392b7528a',
      'X-RapidAPI-Host': 'open-ai21.p.rapidapi.com'
    },
    body: JSON.stringify({
      text: searchInput
    })
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json(); // Assuming the response is JSON
    console.log(result);
    generatedImage.src = result.generated_image;
  } catch (error) {
    console.error(error);
  } finally {
    generateBtn.disabled = false; // Enable the button after the request is complete
  }
}

const generateBtn = document.querySelector('.generate-btn');
generateBtn.addEventListener('click', async () => {
  generateBtn.disabled = true; // Disable the button during the request
  await fetchData();
});
