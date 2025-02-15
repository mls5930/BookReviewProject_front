const emailModify = document.querySelector('#emailModify');

emailModify.addEventListener('submit', async(e) => {
    console.log(e.target.title.value);
    console.log(document.cookie);

    e.preventDefault();
    try {
        const response = await fetch('http://localhost:3000/user/update',{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        }, {
            body: JSON.stringify({
                email: e.target.title.value,
            })
        })
    
        const result = await response.json();
        console.log(result);
        
    } catch (error) {
        console.log(error);
    }
})