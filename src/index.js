import './index.css';
import Game from '../modules/api';

const form = document.querySelector('#form');
const refreshBtn = document.querySelector('.refresh');

document.addEventListener('DOMContentLoaded', () => {
  Game.displayScores();
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  Game.createNewScore();
  Game.clearForm();
});
refreshBtn.addEventListener('click', () => {
  Game.displayScores();
});