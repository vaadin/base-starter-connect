import client from './src/generated/connect-client.default';
import {greet} from './src/generated/GreeterService';

client.credentials = (options = {}) => {
  return {username: 'test_login', password: 'test_password'};
};

const greeting = document.getElementById("greeting");
const nameInput = document.getElementById("nameInput");
document.getElementById("greet").onclick = async () => {
  greeting.textContent = await greet(nameInput.value);
};
