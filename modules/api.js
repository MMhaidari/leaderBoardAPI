const nameInput = document.querySelector('#name');
const scoreInput = document.querySelector('#score');

const baseUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/';
const baseEndPoint = 'games/';
const scoresEndPoint = '/scores/';
const id = 'AZwV69nnEThqVXPyn';

const player = {
  user: String,
  score: Number,
};

const title = {
  name: 'valleyball',
};

export default class Game {
    static createNewGame = async () => {
      try {
        const response = await fetch(baseUrl + baseEndPoint, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(title),
        });
        const data = await response.json();
        return data;
      } catch (error) {
        return error;
      }
    }

    static createNewScore = async () => {
      if (scoreInput.value.length !== 0 && nameInput.value.length !== 0) {
        player.user = nameInput.value;
        player.score = scoreInput.value;
      }
      try {
        const response = await fetch(baseUrl + baseEndPoint + id + scoresEndPoint, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(player),
        });
        const data = await response.json();
        return data;
      } catch (error) {
        return error;
      }
    }

    static getScores = async () => {
      try {
        const response = await fetch(baseUrl + baseEndPoint + id + scoresEndPoint, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },

        });
        const data = await response.json();
        return data;
      } catch (error) {
        return error;
      }
    }

      static displayScores = () => {
        const list = document.querySelector('#populate');
        Game.getScores().then((data) => {
          let result = '';
          const scores = data.result;
          scores.map((score) => {
            result += `
                        <li>${score.user}:${score.score}</li>
                      `;
            return result;
          });
          list.innerHTML = result;
          return result;
        });
      }

      static clearForm() {
        scoreInput.value = '';
        nameInput.value = '';
      }
}