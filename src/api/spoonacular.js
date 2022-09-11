import axios from "axios";

export default axios.create({
    baseURL: 'https://cors-anywhere.herokuapp.com/https://api.spoonacular.com',
    headers: {
        'Content-Type': 'application/json',
        'x-api-key': '199ac8ab756f481e9ecf88906ac28d2e',
        'diet': 'vegeratian',
      }
});
