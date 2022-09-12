import axios from "axios";

export default axios.create({
    baseURL: 'https://cors-anywhere.herokuapp.com/https://api.spoonacular.com',
    headers: {
        'Content-Type': 'application/json',
        'x-api-key': `${process.env.REACT_APP_API_KEY}`,
        'diet': 'vegeratian',
      }
});
