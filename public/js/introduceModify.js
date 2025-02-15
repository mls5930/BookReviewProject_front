const introduceModify = document.querySelector('#introduceModify');

introduceModify.addEventListener('submit', async(e) => {
    console.log(e.target.myIntroduce.value);
    
    e.preventDefault();
    try {
        const response = await fetch('http://localhost:3000/user/update',{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            }
        }, {
            body: JSON.stringify({
                introductions: e.target.myIntroduce.value,
            })
        })
    
        const result = await response.json();
        console.log(result);
        
    } catch (error) {
        console.log(error);
    }
})