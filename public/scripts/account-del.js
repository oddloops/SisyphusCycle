const delAccountBtn = document.getElementById("del-account-btn");

delAccountBtn.addEventListener('click', () => {
    const askAccountDel = confirm("Delete account?");
    if (askAccountDel) {
        fetch('/delAccount', {
            method: 'DELETE',
            header: {
                'Content-Type': 'application/JSON'
            },
            body: JSON.stringify({})
        })
        .then(response => {
            if (response.ok) {
                console.log("Deleted acount");
                window.location.href = '/';
            } else {
                console.error("Error deleting account");
                throw new Error("Error deleting account");
            }
        })
        .catch(error => {
            console.error(`Error deleting row: ${error}`);
        });
    }
});