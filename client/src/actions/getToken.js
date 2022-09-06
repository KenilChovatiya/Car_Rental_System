export const getToken = () => {
    let token = "";
    if (localStorage.getItem('profile')) {
        token = JSON.parse(localStorage.getItem('profile')).token;
    }

    return token;
}