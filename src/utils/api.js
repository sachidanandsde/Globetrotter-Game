import axios from "axios";

export const API_BASE_URL = "http://65.0.86.58:8000/api/game";

export const createUser = async (username) => {
  return axios.post(`${API_BASE_URL}/create-user`, { username });
};

export const getRandomDestination = async (username) => {
  return axios.get(`${API_BASE_URL}/random-destination?username=${username}`);
};

export const checkAnswer = async (username, destination_id, guessed_destination) => {
  return axios.post(`${API_BASE_URL}/check-answer`, {
    username,
    destination_id,
    guessed_destination
  });
};

export const getLeaderboard = async () => {
  return axios.get(`${API_BASE_URL}/leaderboard`);
};

export const getUserScore = async (username) => {
  return axios.get(`${API_BASE_URL}/user-score?username=${username}`);
};

export const challengeFriend = async (username, friend_username) => {
  return axios.post(`${API_BASE_URL}/challenge-friend`, { username, friend_username });
};
