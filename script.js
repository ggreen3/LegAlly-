// Handle form submission
document.getElementById('legalForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const query = document.getElementById('query').value;

    const requestData = {
        subject: "New Legal Help Request",
        body: `<p>Legal Query Details:</p><ul><li>Name: ${name}</li><li>Email: ${email}</li><li>Query: ${query}</li></ul>`,
        to: "cybergeks.com" //dgeorgeobu@gmail.com
    };

    fetch("https://backend.buildpicoapps.com/aero/run/self-email-api?pk=v1-Z0FBQUFBQm1XYWNNN1N1T09oRWdNTDNMTERVOUI4bEFSWWRkSURVdXdCSDhaMjJ3RjdSSkxvRjZoc2d4eXlNVkhnV05vQWxMelRBTjZiRi0wb2JkNHZ0WlM1V3pGdzhOUUE9PQ==", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            alert('Legal help request submitted successfully!');
        } else {
            alert('There was an error submitting your request. Please try again.');
            console.error(data);
        }
    })
    .catch(error => {
        alert('There was an error submitting your request. Please try again.');
        console.error(error);
    });
});

